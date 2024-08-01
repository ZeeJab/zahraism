'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styles from './CoffeeSimulator.module.css'

const CoffeeSimulator = () => {
  const [waterTemp, setWaterTemp] = useState(90)
  const [grindSize, setGrindSize] = useState(5)
  const [brewTime, setBrewTime] = useState(3)
  const [result, setResult] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isBrewing, setIsBrewing] = useState(false)
  const [coffeeLevel, setCoffeeLevel] = useState(0)

  const brewCoffee = useCallback(() => {
    setIsBrewing(true)
    setResult('')
    setExplanation('')
    setCoffeeLevel(0)
    
    let brewingInterval: NodeJS.Timeout | null = null;

    brewingInterval = setInterval(() => {
      setCoffeeLevel(prev => {
        if (prev >= 100) {
          if (brewingInterval) clearInterval(brewingInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    setTimeout(() => {
      if (brewingInterval) clearInterval(brewingInterval)
      let quality = 0
      let explanationParts = []
      
      if (waterTemp >= 90 && waterTemp <= 96) {
        quality++
        explanationParts.push("Water temperature is ideal for extraction.")
      } else if (waterTemp < 90) {
        explanationParts.push("Water is too cool, leading to under-extraction.")
      } else {
        explanationParts.push("Water is too hot, possibly leading to over-extraction and bitterness.")
      }

      if (grindSize >= 4 && grindSize <= 6) {
        quality++
        explanationParts.push("Grind size is perfect for balanced extraction.")
      } else if (grindSize < 4) {
        explanationParts.push("Grind is too fine, may lead to over-extraction and bitterness.")
      } else {
        explanationParts.push("Grind is too coarse, resulting in under-extraction and weak flavor.")
      }

      if (brewTime >= 3 && brewTime <= 4) {
        quality++
        explanationParts.push("Brew time is spot on for optimal flavor extraction.")
      } else if (brewTime < 3) {
        explanationParts.push("Brew time is too short, resulting in under-extraction.")
      } else {
        explanationParts.push("Brew time is too long, possibly leading to over-extraction and bitterness.")
      }

      switch(quality) {
        case 3:
          setResult("Perfect! A delicious cup of coffee.")
          break
        case 2:
          setResult("Pretty good, but could be better.")
          break
        case 1:
          setResult("Drinkable, but needs improvement.")
          break
        default:
          setResult("Oops! This isn't quite right. Try again!")
      }
      
      setExplanation(explanationParts.join(' '))
      setIsBrewing(false)
    }, 2000)
  }, [waterTemp, grindSize, brewTime])

  useEffect(() => {
    // Any initial setup can go here
    return () => {
      // Cleanup function
      setIsBrewing(false)
      setCoffeeLevel(0)
    }
  }, [])

  return (
    <div className={styles.simulator} role="region" aria-label="Coffee Brewing Simulator">
      <div className={styles.coffeemaker}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="waterTemp">Water Temperature (°C)</label>
            <input 
              id="waterTemp"
              type="range" 
              min="80" 
              max="100" 
              value={waterTemp} 
              onChange={(e) => setWaterTemp(Number(e.target.value))}
              aria-valuemin={80}
              aria-valuemax={100}
              aria-valuenow={waterTemp}
            />
            <output htmlFor="waterTemp">{waterTemp}°C</output>
          </div>
          <div className={styles.control}>
            <label htmlFor="grindSize">Grind Size</label>
            <input 
              id="grindSize"
              type="range" 
              min="1" 
              max="10" 
              value={grindSize} 
              onChange={(e) => setGrindSize(Number(e.target.value))}
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={grindSize}
            />
            <output htmlFor="grindSize">{grindSize}</output>
          </div>
          <div className={styles.control}>
            <label htmlFor="brewTime">Brew Time (minutes)</label>
            <input 
              id="brewTime"
              type="range" 
              min="1" 
              max="5" 
              value={brewTime} 
              onChange={(e) => setBrewTime(Number(e.target.value))}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={brewTime}
            />
            <output htmlFor="brewTime">{brewTime} min</output>
          </div>
        </div>
        <button 
          onClick={brewCoffee} 
          className={styles.brewButton} 
          disabled={isBrewing}
          aria-busy={isBrewing}
        >
          {isBrewing ? 'Brewing...' : 'Brew Coffee'}
        </button>
      </div>
      <div className={styles.coffeeResult} aria-live="polite">
        <div 
          className={styles.mug} 
          role="img" 
          aria-label={`Coffee mug, ${coffeeLevel}% full`}
        >
          <div 
            className={styles.coffee} 
            style={{ height: `${coffeeLevel}%`, opacity: coffeeLevel > 0 ? 1 : 0 }}
          ></div>
        </div>
        {result && (
          <div className={styles.feedback}>
            <p className={styles.result} role="status">{result}</p>
            <p className={styles.explanation}>{explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoffeeSimulator