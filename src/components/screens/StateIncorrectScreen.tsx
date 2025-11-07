"use client"

import { useEffect } from 'react'
import PixelButton from '../PixelButton'
import { GameStats } from '@/hooks/useGameState'

interface StateIncorrectScreenProps {
  stats: GameStats
  correctStateName: string
  userAnswer: string
  onContinue: () => void
  onPlaySound: (sound: string) => void
}

export function StateIncorrectScreen({ 
  stats,
  correctStateName,
  userAnswer,
  onContinue,
  onPlaySound
}: StateIncorrectScreenProps) {

  // Play wrong answer sound when screen loads
  useEffect(() => {
    onPlaySound('wrong-answer')
  }, [onPlaySound])

  // Removed auto-continue - user must manually continue

  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center p-8 relative w-full">
      
        {/* Incorrect Message */}
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
                {correctStateName}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="nes-text-8 text-usa-red">
                Your answer:
              </div>
              <div className="nes-text-24 text-usa-red font-bold">
                {userAnswer}
              </div>
            </div>
          </div>

          {/* Progress Info */}
          <div className="space-y-2 nes-text-8 text-usa-white">
            <div>Question {((stats.level - 1) * 2) + 1} of 100</div>
            <div>Current Score: {stats.points}/100 Points</div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <PixelButton
              onClick={onContinue}
              variant="primary"
              size="lg"
              className="w-full"
              ariaLabel="Continue to capital question"
            >
              CONTINUE
            </PixelButton>
          </div>
          
        </div>
        
        {/* Red X marks background */}
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

export default StateIncorrectScreen


