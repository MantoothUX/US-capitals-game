"use client"

import { useEffect } from 'react'
import PixelButton from '../PixelButton'
import { GameStats } from '@/hooks/useGameState'

interface IncorrectFeedbackScreenProps {
  stats: GameStats
  correctStateName: string
  correctCapital: string
  userStateAnswer?: string
  userCapitalAnswer?: string
  pointsEarned: number
  onContinue: () => void
  onPlaySound: (sound: string) => void
}

export function IncorrectFeedbackScreen({ 
  stats,
  correctStateName,
  correctCapital,
  userStateAnswer,
  userCapitalAnswer,
  pointsEarned,
  onContinue,
  onPlaySound
}: IncorrectFeedbackScreenProps) {

  // Play sound when screen loads - always wrong for capital question
  useEffect(() => {
    onPlaySound('wrong-answer')
  }, [onPlaySound])

  // Removed auto-continue - user must manually continue

  const getPerformanceMessage = () => {
    if (pointsEarned === 2) return "PERFECT!"
    if (pointsEarned === 1) return "PARTIAL CREDIT"
    return "KEEP LEARNING!"
  }

  const getPerformanceColor = () => {
    if (pointsEarned === 2) return "text-usa-blue"
    if (pointsEarned === 1) return "text-usa-gold" 
    return "text-usa-red"
  }

  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center p-8 relative w-full">
      
        {/* Incorrect Message - Consistent with State Wrong */}
        <div className="text-center space-y-6 usa-panel p-8 w-full max-w-2xl usa-screen-error">
          
          {/* Thinking emoji */}
          <div className="text-6xl mb-4">
            🤔
          </div>
          
          {/* Incorrect Text */}
          <div className="space-y-4">
            <h1 className="nes-text-24 text-usa-white font-bold">
              SORRY, THAT&apos;S INCORRECT!
            </h1>
            
            <div className="nes-text-16 text-usa-white">
              +0 POINTS
            </div>
          </div>

          {/* Answer Comparison Display */}
          <div className="usa-panel-inset p-6 space-y-6 text-center">
            <div className="space-y-2">
              <div className="nes-text-8 text-usa-gold">
                Correct answer:
              </div>
              <div className="nes-text-24 text-usa-white font-bold">
                {correctCapital}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="nes-text-8 text-usa-red">
                Your answer:
              </div>
              <div className="nes-text-24 text-usa-red font-bold">
                {userCapitalAnswer || "No answer"}
              </div>
            </div>
          </div>

          {/* Progress Info */}
          <div className="space-y-2 nes-text-8 text-usa-white">
            <div>State {stats.level - 1} of {stats.totalLevels} Complete</div>
            <div>Current Score: {stats.points}/{stats.maxPoints} Points</div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <PixelButton
              onClick={onContinue}
              variant="primary"
              size="lg"
              className="w-full"
              ariaLabel="Continue to next state"
            >
              CONTINUE
            </PixelButton>
          </div>
          
        </div>
        
        {/* Red X marks background - same as state wrong */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-16 text-3xl text-usa-red opacity-60 usa-blink">
            ✕
          </div>
          <div className="absolute top-32 right-24 text-4xl text-usa-red opacity-60 usa-blink" style={{ animationDelay: '0.3s' }}>
            ✕
          </div>
          <div className="absolute bottom-40 left-32 text-3xl text-usa-red opacity-60 usa-blink" style={{ animationDelay: '0.6s' }}>
            ✕
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncorrectFeedbackScreen
