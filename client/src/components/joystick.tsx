import React from 'react'
import cn from 'classnames'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated, to } from '@react-spring/web'

import { remap } from '@/lib/util'

import styles from './joystick.module.scss'

const MAX_DISTANCE = 100
const ICON_OPACITY_IDLE = 0.5
const DRAG_THRESHOLD = 8

const Joystick = (props: {
  className: string
  onRelease: (magnitude: number, angle: number) => void
  onClick: () => void
}) => {
  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    config: {
      tension: 400,
      friction: 20,
      mass: 1.5,
    },
  }))

  const [{ opacity }, iconApi] = useSpring(() => ({
    opacity: ICON_OPACITY_IDLE,
  }))

  const rotateTimeoutRef = React.useRef<number>()
  const wasDraggedRef = React.useRef(false)

  const bind = useDrag(
    ({ down, movement: [mx, my], last, first, active }) => {
      if (first) {
        window.clearTimeout(rotateTimeoutRef.current)
        iconApi.start({ opacity: 1.0 })
      }

      const distance = Math.sqrt(mx * mx + my * my)
      if (distance > DRAG_THRESHOLD) {
        wasDraggedRef.current = true

        let limitedX = mx
        let limitedY = my
        if (distance > MAX_DISTANCE) {
          const scale = MAX_DISTANCE / distance
          limitedX = mx * scale
          limitedY = my * scale
        }

        api.start({
          x: down ? limitedX : 0,
          y: down ? limitedY : 0,
          rotate: (Math.atan2(limitedY, limitedX) * 180) / Math.PI,
          immediate: first,
        })

        if (last) {
          rotateTimeoutRef.current = window.setTimeout(() => {
            api.start({ rotate: 0 })
            iconApi.start({ opacity: ICON_OPACITY_IDLE })
          }, 600)

          const angle = Math.atan2(limitedY, limitedX)
          let magnitude = Math.min(distance / MAX_DISTANCE, 1)

          let constrainedAngle
          if (limitedY < 0) {
            // If dragging upward, snap to 0° or 180° based on horizontal direction
            constrainedAngle = limitedX >= 0 ? 0 : Math.PI
            magnitude = 0
          } else {
            const positiveAngle = angle < 0 ? angle + 2 * Math.PI : angle
            // Remap angle from 0-π to π/4-3π/4 radians
            constrainedAngle = remap(
              positiveAngle,
              0,
              Math.PI,
              Math.PI / 4,
              (3 * Math.PI) / 4,
            )
          }

          const degrees = constrainedAngle * (180 / Math.PI)

          props.onRelease(magnitude, degrees)
        }
      } else {
        if (last) {
          iconApi.start({ opacity: ICON_OPACITY_IDLE })
        }
      }
    },
    {
      pointer: {
        keys: false,
        // https://github.com/pmndrs/use-gesture/issues/376
        capture: false,
      },
    },
  )

  return (
    <animated.div
      className={cn(styles.joystick, props.className)}
      {...bind()}
      style={{
        x,
        y,
        transform: to([rotate], (r: number) => `rotate(${r}deg)`),
      }}
      onClick={() => {
        // No way to stop the click from firing after the drag has ended, so we ignore it
        if (wasDraggedRef.current) {
          wasDraggedRef.current = false
          return
        }

        // Give a hint that it's draggable
        api.start({
          to: [{ y: 20, immediate: true }, { y: 0 }],
        })

        props.onClick()
      }}
    >
      <animated.svg
        width="57"
        height="21"
        viewBox="0 0 57 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <path
          d="M2 2H54"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M2.25 18.5H54.25"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </animated.svg>
    </animated.div>
  )
}

export default Joystick
