import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import cn from 'classnames'

import styles from './info-panel.module.scss'

export interface InfoPanelHandle {
  setText: (text: string) => void
  dismiss: () => void
}

const DELAY_MS = 1500

const InfoPanel = forwardRef<InfoPanelHandle, { className?: string }>(
  ({ className }, ref) => {
    const [text, setText] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useImperativeHandle(ref, () => ({
      setText: (newText: string) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        setText(newText)
        setIsVisible(true)
        timerRef.current = setTimeout(() => {
          setIsVisible(false)
          timerRef.current = null
        }, DELAY_MS)
      },
      dismiss: () => {
        setIsVisible(false)
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      },
    }))

    return (
      <div
        className={cn(
          styles.infoPanel,
          isVisible && styles.isVisible,
          className,
        )}
      >
        {text}
      </div>
    )
  },
)

InfoPanel.displayName = 'InfoPanel'

export default InfoPanel
