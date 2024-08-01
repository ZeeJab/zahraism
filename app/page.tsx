'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { motion } from 'framer-motion'
import DarkModeToggle from './components/DarkModeToggle'
import CoffeeSimulator from './components/CoffeeSimulator'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const gameCardsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'fun-zone']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) {
        setActiveTab(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const currentFocus = document.activeElement
        const currentIndex = gameCardsRef.current.indexOf(currentFocus as HTMLElement)
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <DarkModeToggle />
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#home" className={activeTab === 'home' ? styles.active : ''} aria-current={activeTab === 'home' ? 'page' : undefined}>Home</a>
          <a href="#fun-zone" className={activeTab === 'fun-zone' ? styles.active : ''} aria-current={activeTab === 'fun-zone' ? 'page' : undefined}>Fun Zone</a>
        </nav>
      </header>
      
      <main id="main-content">
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
                <p className={styles.title}> 
                  Director of Design Engineering <a href="https://www.vercel.com/design" target="_blank" rel="noopener noreferrer">@Vercel</a>
                </p>
                <p className={styles.title}>
                  Organizer <a href="http://manhattanjs.com/" target="_blank" rel="noopener noreferrer">ManhattanJS</a> &  <a href="http://manhattanai.com/" target="_blank" rel="noopener noreferrer">ManhattanAI</a> 
                </p>
                <p className={styles.smallText}>Part-time Architect Full-time Coffee Connoisseur</p>
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