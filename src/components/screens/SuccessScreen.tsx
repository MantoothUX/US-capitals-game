"use client"

import { useEffect } from 'react'
import PixelButton from '../PixelButton'
import { GameStats } from '@/hooks/useGameState'

interface SuccessScreenProps {
  stats: GameStats
  onContinue: () => void
  onPlaySound: (sound: string) => void
}

export function SuccessScreen({ 
  stats, 
  onContinue,
  onPlaySound 
}: SuccessScreenProps) {

  // Play success sound when screen loads
  useEffect(() => {
    onPlaySound('level-complete')
  }, [onPlaySound])

  // Auto-continue after delay (optional - remove if you want manual progression)
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue()
    }, 2500) // 2.5 seconds

    return () => clearTimeout(timer)
  }, [onContinue])

  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center p-8 relative w-full">
      
        {/* Celebrating American Flag GIF */}
        <div className="usa-flag usa-flag-success">
          <img 
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWpyeGlncXJwOTBsZzI3cDBibWVzZnJ0b2ZhMTg3ZnAzMnVoMXprZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sFMDqop2ku4M0/giphy.gif"
            alt="Retro Celebrating American Flag"
            className="flag-gif"
          />
        </div>
      
        {/* Animated Success Message */}
        <div className="text-center space-y-6 usa-panel p-8 w-full max-w-2xl relative z-10" style={{ background: 'rgba(0, 55, 86, 0.9)' }}>
          
          {/* Success Icon - American style */}
          <div className="text-6xl mb-4 usa-blink">
            ⭐
          </div>
          
          {/* Success Text */}
          <div className="space-y-4">
            <h1 className="nes-text-24 text-usa-white font-bold usa-blink">
              CORRECT!
            </h1>
            
            <div className="nes-text-16 text-usa-white">
              Level {stats.level - 1} Complete!
            </div>
            
            <div className="nes-text-8 text-usa-white">
              Great job! Moving to next state...
            </div>
          </div>

        {/* Progress Info */}
        <div className="space-y-2 nes-text-8 text-usa-white">
          <div>States Completed: {stats.level - 1} / {stats.totalLevels}</div>
        </div>

        {/* Continue Button - Gold Color */}
        <div className="pt-4">
          <PixelButton
            onClick={onContinue}
            variant="success"
            size="lg"
            className="w-full usa-btn-gold"
            ariaLabel="Continue to next level"
          >
            CONTINUE
          </PixelButton>
        </div>
      </div>
      
        
      </div>
    </div>
  )
}

export default SuccessScreen
