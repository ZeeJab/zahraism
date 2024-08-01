'use client'

import { useState, useEffect } from 'react'
import styles from './DarkModeToggle.module.css'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <button 
      className={styles.toggleButton}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  )
}