'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { motion } from 'framer-motion'
import DarkModeToggle from './components/DarkModeToggle'
import CoffeeSimulator from './components/CoffeeSimulator'

export default function Home() {
  const gameCardsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const currentFocus = document.activeElement
        const currentIndex = gameCardsRef.current.findIndex(el => el === currentFocus)
        if (currentIndex !== -1) {
          let nextIndex
          if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % gameCardsRef.current.length
          } else {
            nextIndex = (currentIndex - 1 + gameCardsRef.current.length) % gameCardsRef.current.length
          }
          gameCardsRef.current[nextIndex]?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={styles.container}>
      <header>
        <DarkModeToggle />
        <nav className={styles.nav} aria-label="Main navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#fun-zone">Fun Zone</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section id="home" className={styles.section}>
          <motion.div 
            className={styles.contentWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className={styles.introtxt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className={styles.name}>Zahra Jabini</h1>
                <h2 className={styles.title}> 
                  Director of Design Engineering <a href="https://www.vercel.com/design" target="_blank" rel="noopener noreferrer">Vercel</a>
                </h2>
                <h2 className={styles.title}>
                  Organizer <a href="http://manhattanjs.com/" target="_blank" rel="noopener noreferrer">ManhattanJS</a> &  <a href="http://manhattanai.com/" target="_blank" rel="noopener noreferrer">ManhattanAI</a> 
                </h2>
                <h2 className={styles.smallText}>Part-time Architect Full-time Coffee Connoisseur</h2>
              <p className={styles.location}>New York, NY 🗽</p>
            </motion.div>
            <motion.div 
              className={styles.imageWrapper}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image 
                src="/images/zeejab.svg" 
                alt="Portrait of Lady Zahra"
                width={300}
                height={300}
                layout="responsive"
                priority
              />
            </motion.div>
          </motion.div>
        </section>

        <section id="fun-zone" className={styles.funZoneSection}>
          <h2 className={styles.funZoneTitle}>Welcome to the Fun Zone!</h2>
          <p className={styles.funZoneDescription}>Dive into interactive experiences that blend technology and creativity.</p>
          
          <div className={styles.gameGrid}>
            <article 
              className={styles.gameCard} 
              tabIndex={0}
              ref={el => { gameCardsRef.current[0] = el }}
            >
              <h3>Coffee Brewing Simulator</h3>
              <p>Perfect your virtual brew!</p>
              <CoffeeSimulator />
            </article>
            
            <article 
              className={styles.gameCard}
              tabIndex={0}
              ref={el => { gameCardsRef.current[1] = el }}
            >
              <h3>Coming Soon: Code Challenge</h3>
              <p>Test your coding skills in our upcoming interactive puzzles!</p>
              <div className={styles.comingSoon}>
                <span aria-label="Under Construction">🚧 Under Construction 🚧</span>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Lady Zahra. All rights reserved.</p>
      </footer>
    </div>
  )
}