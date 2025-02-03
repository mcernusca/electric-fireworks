'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Stage = dynamic(() => import('@/components/stage'), { ssr: false })

import styles from './app.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Stage />
    </div>
  )
}

export { App }
