import styles from './app.module.scss'
import React from 'react'

const App: React.FC = () => {
  return <Hello />
}

const Hello: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Animation Boilerplate</h1>
        <p>
          This is the boilerplate app for the fireworks challenge. Please find
          full instructions in the README.md located at the root of the project
          directory.
        </p>
      </div>
    </div>
  )
}

export { App }
