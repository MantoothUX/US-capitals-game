"use client"

import { useEffect, useState } from 'react'
import PixelButton from '../PixelButton'
import FireworksCanvas from '../FireworksCanvas'

interface SplashScreenProps {
  onStartGame: () => void
}

export function SplashScreen({ onStartGame }: SplashScreenProps) {
  const [eagles, setEagles] = useState<Array<{id: number, delay: number, yPos: number, speed: number}>>([])

  // Handle keyboard press to start game
  useEffect(() => {
    const handleKeyPress = () => {
      onStartGame()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onStartGame])

  // Initialize 5 eagles with different timings
  useEffect(() => {
    const eagleData = [
      { id: 1, delay: 0, yPos: 15, speed: 5 },
      { id: 2, delay: 3, yPos: 30, speed: 4 },
      { id: 3, delay: 6, yPos: 45, speed: 6 },
      { id: 4, delay: 9, yPos: 60, speed: 4.5 },
      { id: 5, delay: 12, yPos: 25, speed: 5.5 }
    ]
    setEagles(eagleData)
  }, [])

  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        
        {/* Full Page Animated American Flag Background */}
        <div className="absolute inset-0 z-0">
          <div className="usa-flag-splash-full">
            <div className="flag-stripes-full">
              {[...Array(13)].map((_, i) => (
                <div 
                  key={i} 
                  className={`stripe-full ${i % 2 === 0 ? 'stripe-red' : 'stripe-white'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="flag-canton">
              <div className="stars-grid">
                {[...Array(50)].map((_, i) => (
                  <span 
                    key={i} 
                    className="star-splash"
                    style={{ 
                      animationDelay: `${Math.random() * 2}s`,
                      left: `${(i % 9) * 11}%`,
                      top: `${Math.floor(i / 9) * 16}%`
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Flying Bald Eagles */}
        {eagles.map(eagle => (
          <div 
            key={eagle.id}
            className="flying-eagle"
            style={{ 
              top: `${eagle.yPos}%`,
              animationDelay: `${eagle.delay}s`,
              animationDuration: `${eagle.speed}s`
            }}
          >
            🦅
          </div>
        ))}

        {/* Animated Canvas Fireworks */}
        <FireworksCanvas />

        {/* Main Content */}
        <div className="relative z-20 text-center space-y-8">
          
          {/* Game Title - Same style as menu screen */}
          <div className="text-center space-y-6">
            <div className="comic-title" style={{ fontSize: '80px' }}>
              UNITED STATES AND CAPITALS
            </div>
            
            {/* Subtitle */}
            <div className="title-subtitle">
              THE ULTIMATE AMERICAN GEOGRAPHY CHALLENGE
            </div>
          </div>

          {/* Patriotic Decorations */}
          <div className="patriotic-banner">
            <span className="banner-star">⭐</span>
            <span className="banner-text">EST. 1776</span>
            <span className="banner-star">⭐</span>
          </div>

          {/* Start Button */}
          <div className="start-button-container">
            <div className="button-glow" />
            <PixelButton
              onClick={onStartGame}
              size="lg"
              className="start-game-btn"
              ariaLabel="Start Game"
            >
              <span className="button-star">🦅</span>
              <span>START GAME</span>
              <span className="button-star">🦅</span>
            </PixelButton>
          </div>

          {/* Credits */}
          <div className="splash-credits">
            <div>🇺🇸 MADE IN THE USA 🇺🇸</div>
            <div className="text-xs mt-2 opacity-70">PRESS ANY KEY TO BEGIN</div>
          </div>
        </div>

        {/* Particle Stars */}
        <div className="particle-stars">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle-star"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
