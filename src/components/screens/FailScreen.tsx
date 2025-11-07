"use client"

import { useEffect } from 'react'
import PixelButton from '../PixelButton'
import { GameStats, GameQuestion } from '@/hooks/useGameState'

interface FailScreenProps {
  stats: GameStats
  question: GameQuestion | null
  userAnswers: { stateAnswer?: string; capitalAnswer?: string }
  onRestartGame: () => void
  onReturnToMenu: () => void
  onPlaySound: (sound: string) => void
}

export function FailScreen({ 
  stats, 
  question,
  userAnswers,
  onRestartGame, 
  onReturnToMenu,
  onPlaySound 
}: FailScreenProps) {

  // Play fail sound when screen loads
  useEffect(() => {
    onPlaySound('game-over')
  }, [onPlaySound])

  // Generate explanation of what went wrong
  const getFailureExplanation = () => {
    if (!question) return "Game Over!"
    
    const correctStateName = question.correctState.name
    const correctCapital = question.correctState.capital
    const userStateName = userAnswers.stateAnswer
    const userCapital = userAnswers.capitalAnswer

    if (question.type === 'state-name') {
      return `The correct state was ${correctStateName}, but you selected ${userStateName}.`
    } else {
      const stateWrong = userStateName !== correctStateName
      const capitalWrong = question.type === 'state-capital' && userCapital !== correctCapital
      
      if (stateWrong && capitalWrong) {
        return `You got both wrong! The state was ${correctStateName} and its capital is ${correctCapital}.`
      } else if (stateWrong) {
        return `Wrong state! The correct state was ${correctStateName}, not ${userStateName}.`
      } else if (capitalWrong) {
        return `Wrong capital! The capital of ${correctStateName} is ${correctCapital}, not ${userCapital}.`
      }
    }
    
    return "Better luck next time!"
  }

  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center p-8 relative w-full">
      
        {/* Animated Fail Message */}
        <div className="text-center space-y-6 usa-panel p-8 w-full max-w-2xl usa-screen-error">
          
          {/* Fail Icon - American style */}
          <div className="text-6xl mb-4 usa-blink">
            ✕
          </div>
          
          {/* Fail Text */}
          <div className="space-y-4">
            <h1 className="nes-text-24 text-usa-white font-bold usa-blink">
              GAME OVER!
            </h1>
            
            <div className="nes-text-16 text-usa-white">
              Level {stats.level} Failed
            </div>
          </div>

          {/* Failure Explanation */}
          <div className="usa-panel-inset p-4">
            <div className="nes-text-8 text-usa-white leading-relaxed">
              {getFailureExplanation()}
            </div>
          </div>

          {/* Final Stats */}
          <div className="space-y-2 nes-text-8 text-usa-white">
            <div>States Completed: {stats.level - 1} / {stats.totalLevels}</div>
            <div>
              Time Survived: {Math.floor(stats.timeElapsed / 60000)}:
              {Math.floor((stats.timeElapsed % 60000) / 1000).toString().padStart(2, '0')}
            </div>
          </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <PixelButton
            onClick={onRestartGame}
            variant="danger"
            size="lg"
            className="w-full"
            ariaLabel="Try again from the beginning"
          >
            TRY AGAIN
          </PixelButton>
          
          <PixelButton
            onClick={onReturnToMenu}
            variant="secondary"
            size="md"
            className="w-full"
            ariaLabel="Return to main menu"
          >
            MAIN MENU
          </PixelButton>
        </div>
        
          {/* Encouragement */}
          <div className="nes-text-8 text-usa-white opacity-80">
            Don&apos;t give up! Geography mastery takes practice.
          </div>
        </div>
        
        {/* American-themed Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Falling X marks in patriotic colors */}
          <div className="absolute top-24 left-16 text-3xl text-usa-red opacity-60 usa-blink">
            ✕
          </div>
          <div className="absolute top-32 right-24 text-4xl text-usa-red opacity-60 usa-blink" style={{ animationDelay: '0.3s' }}>
            ✕
          </div>
          <div className="absolute bottom-40 left-32 text-3xl text-usa-red opacity-60 usa-blink" style={{ animationDelay: '0.6s' }}>
            ✕
          </div>
          <div className="absolute bottom-20 right-20 text-2xl text-usa-red opacity-60 usa-blink" style={{ animationDelay: '0.9s' }}>
            ✕
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FailScreen
