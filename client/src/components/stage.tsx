import React, { useState, useRef } from 'react'
import { Stage as PixiStage } from '@pixi/react'

import InfoPanel, { InfoPanelHandle } from '@/components/info-panel'
import Joystick from '@/components/joystick'
import Fireworks from '@/components/fireworks'
import Firework from '@/lib/firework'
import useNormalizedUnits from '@/lib/use-normalized-units'
import Vec2 from '@/lib/vec2'

import styles from './stage.module.scss'

const GRAVITY = -1.4

const TAUNTS = ['Almost there!', 'Give it more oomph!', 'Just a bit further!']
const INSTRUCTIONS = 'Drag down to launch fireworks!'

const AppStage = () => {
  const units = useNormalizedUnits()
  const [gravity] = useState(new Vec2(0, GRAVITY))
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const infoPanelRef = useRef<InfoPanelHandle>(null)

  return (
    <>
      <PixiStage
        width={units.screen.width}
        height={units.screen.height}
        options={{
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        }}
      >
        <Fireworks units={units} gravity={gravity} fireworks={fireworks} />
      </PixiStage>
      <div className={styles.joystickContainer}>
        <Joystick
          className={styles.joystick}
          onClick={() => {
            infoPanelRef.current?.setText(INSTRUCTIONS)
          }}
          onRelease={(magnitude, angle) => {
            if (magnitude > 0.6) {
              setFireworks((prev) => [
                ...prev.filter((f) => !f.isDone),
                new Firework(magnitude, angle),
              ])
            } else {
              infoPanelRef.current?.setText(
                TAUNTS[Math.floor(Math.random() * TAUNTS.length)],
              )
            }
          }}
        />
      </div>
      <InfoPanel ref={infoPanelRef} />
    </>
  )
}

export default AppStage
