"use client"

import { useState, useEffect } from 'react'
import PixelButton from '../PixelButton'
import { GameStats, LeaderboardEntry } from '@/hooks/useGameState'

interface GameCompleteScreenProps {
  stats: GameStats
  onSaveScore: (initials: string) => void
  onReturnToMenu: () => void
  onPlaySound: (sound: string) => void
}

export function GameCompleteScreen({ 
  stats, 
  onSaveScore, 
  onReturnToMenu,
  onPlaySound 
}: GameCompleteScreenProps) {
  const [initials, setInitials] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Play victory sound when screen loads
  useEffect(() => {
    onPlaySound('game-complete')
  }, [onPlaySound])

  const handleSubmitScore = () => {
    if (initials.trim().length >= 2) {
      onSaveScore(initials.trim().toUpperCase())
      setIsSubmitted(true)
      onPlaySound('correct-answer')
    }
  }

  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 3) // Max 3 characters
    setInitials(value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && initials.trim().length >= 2) {
      handleSubmitScore()
    }
  }

  const finalTime = Math.floor(stats.timeElapsed / 1000) // Convert to seconds
  const minutes = Math.floor(finalTime / 60)
  const seconds = finalTime % 60

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col items-center justify-center p-4 relative">
      
      {/* Victory Animation */}
      <div className="text-center space-y-8 pixel-panel bg-white/95 p-8 max-w-lg">
        
        {/* Trophy */}
        <div className="text-8xl mb-6 pixel-blink">
          🏆
        </div>
        
        {/* Victory Text */}
        <div className="space-y-4">
          <h1 className="text-4xl text-yellow-800 font-bold">
            CHAMPION!
          </h1>
          
          <div className="nes-text-16 text-usa-gold">
            ALL 50 STATES COMPLETED!
          </div>
          
          <div className="nes-text-8 text-usa-white">
            Geography Challenge Complete!
          </div>
        </div>

        {/* Final Stats */}
        <div className="usa-panel-inset p-4 space-y-3">
          <div className="text-usa-gold font-bold nes-text-16">
            FINAL SCORE
          </div>
          <div className="nes-text-24 text-usa-white font-bold">
            {stats.points}/100
          </div>
          <div className="nes-text-8 text-usa-white">
            States Completed: {stats.totalLevels} / {stats.totalLevels}
          </div>
          <div className="nes-text-8 text-usa-gold">
            Accuracy: {Math.round((stats.points / 100) * 100)}%
          </div>
        </div>

        {/* Score Entry */}
        {!isSubmitted ? (
          <div className="space-y-4">
            <div className="text-yellow-800 font-bold">
              ENTER YOUR INITIALS:
            </div>
            
            <div className="flex justify-center">
              <input
                type="text"
                value={initials}
                onChange={handleInitialsChange}
                onKeyPress={handleKeyPress}
                className="bg-yellow-50 border-2 border-yellow-600 text-yellow-900 text-2xl text-center font-bold w-24 h-12 pixel-focus"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
                placeholder="ABC"
                maxLength={3}
                autoFocus
                aria-label="Enter your initials for the leaderboard"
              />
            </div>
            
            <PixelButton
              onClick={handleSubmitScore}
              disabled={initials.trim().length < 2}
              variant="success"
              size="lg"
              className="w-full"
              ariaLabel="Submit score to leaderboard"
            >
              SAVE SCORE
            </PixelButton>
            
            <div className="text-xs text-yellow-700 opacity-80">
              Enter 2-3 letters • Press Enter to submit
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl text-green-800">
              ✅ SCORE SAVED!
            </div>
            
            <div className="nes-text-8 text-usa-white">
              {initials} • {stats.points}/100 Points
            </div>
            
            <PixelButton
              onClick={onReturnToMenu}
              variant="success"
              size="lg"
              className="w-full"
              ariaLabel="Return to main menu"
            >
              VIEW LEADERBOARD
            </PixelButton>
          </div>
        )}

      </div>
      
      {/* Background Celebration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Confetti-style decorations */}
        <div className="absolute top-16 left-16 text-4xl text-yellow-300 pixel-blink">
          🎉
        </div>
        <div className="absolute top-20 right-20 text-5xl text-yellow-300 pixel-blink" style={{ animationDelay: '0.2s' }}>
          🎊
        </div>
        <div className="absolute bottom-40 left-24 text-4xl text-yellow-300 pixel-blink" style={{ animationDelay: '0.4s' }}>
          🏅
        </div>
        <div className="absolute bottom-32 right-32 text-3xl text-yellow-300 pixel-blink" style={{ animationDelay: '0.6s' }}>
          ⭐
        </div>
        <div className="absolute top-1/2 left-12 text-4xl text-yellow-300 pixel-blink" style={{ animationDelay: '0.8s' }}>
          🎯
        </div>
        <div className="absolute top-1/3 right-16 text-3xl text-yellow-300 pixel-blink" style={{ animationDelay: '1s' }}>
          👑
        </div>
      </div>
      
    </div>
  )
}

export default GameCompleteScreen

