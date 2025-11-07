"use client"

import { useEffect } from 'react'
import { GameQuestion, GameStats, GameMode } from '@/hooks/useGameState'
import AccurateStateMap from '../AccurateStateMap'
import PixelButton from '../PixelButton'
import GameTimer from '../GameTimer'
import ExitButton from '../ExitButton'

interface GameScreenProps {
  question: GameQuestion
  stats: GameStats
  selectedOptionIndex: number
  keyboardMode: boolean
  hasStateAnswer: boolean
  gameMode: GameMode
  onAnswerSelect: (answer: string, isCorrect: boolean) => void
  onExit: () => void
  onMoveSelection: (direction: 'up' | 'down') => void
  onSelectCurrentOption: () => void
  onTimerWarning: () => void
}

export function GameScreen({
  question,
  stats,
  selectedOptionIndex,
  keyboardMode,
  hasStateAnswer,
  gameMode,
  onAnswerSelect,
  onExit,
  onMoveSelection,
  onSelectCurrentOption,
  onTimerWarning
}: GameScreenProps) {

  // Keyboard controls - A/B/C keys + Enter
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'a':
          e.preventDefault()
          if (question.options[0]) {
            onAnswerSelect(question.options[0].option, question.options[0].isCorrect)
          }
          break
        case 'b':
          e.preventDefault()
          if (question.options[1]) {
            onAnswerSelect(question.options[1].option, question.options[1].isCorrect)
          }
          break
        case 'c':
          e.preventDefault()
          if (question.options[2]) {
            onAnswerSelect(question.options[2].option, question.options[2].isCorrect)
          }
          break
        case 'arrowup':
          e.preventDefault()
          onMoveSelection('up')
          break
        case 'arrowdown':
          e.preventDefault()
          onMoveSelection('down')
          break
        case 'enter':
          e.preventDefault()
          onSelectCurrentOption()
          break
        case 'escape':
          e.preventDefault()
          onExit()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onMoveSelection, onSelectCurrentOption, onExit, onAnswerSelect, question.options])

  const questionTitle = question.type === 'state-name' 
    ? 'WHAT STATE IS THIS?' 
    : 'WHAT IS THE STATE CAPITAL OF:'

  const questionNumber = question.type === 'state-name' ? 1 : 2

  return (
    <div className="crt-monitor">
      <div className="crt-screen relative flex flex-col min-h-screen">
      
        {/* Question Counter - Top Left */}
        <div className="absolute top-4 left-4 z-50">
          <div className="nes-text-8 text-usa-gold">
            QUESTION {((stats.level - 1) * 2) + (hasStateAnswer ? 2 : 1)} / 100
          </div>
        </div>

        {/* Points Display - Top Right */}
        <div className="absolute top-4 right-16 z-50">
          <div className="usa-panel-inset px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="nes-text-8 opacity-80 text-usa-gold">POINTS</span>
              <span className="nes-text-16 font-bold text-usa-white">
                {stats.points}/{stats.maxPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Exit Button - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <PixelButton
            onClick={onExit}
            variant="danger"
            size="sm"
            ariaLabel="Exit game (ESC key)"
          >
            ✕
          </PixelButton>
        </div>

        {/* Main Game Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-4xl w-full space-y-4 md:space-y-6">
            
            {/* Question Header */}
            <div className="text-center space-y-2">
              <h2 className="nes-text-24 text-usa-white" style={{
                textShadow: '2px 2px 0 var(--usa-blue), 4px 4px 0 var(--usa-charcoal)'
              }}>
                {questionTitle}
              </h2>
            </div>

          {/* State Shape (only for state name questions) */}
          {question.type === 'state-name' && (
            <div className="flex justify-center">
              <AccurateStateMap 
                state={question.correctState}
                gameMode={gameMode}
                className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl"
                width={680}
                height={425}
              />
            </div>
          )}

            {/* Capital Question Context - Clean state name only */}
            {question.type === 'state-capital' && question.correctState && (
              <div className="text-center usa-panel p-6 max-w-[408px] mx-auto">
                <div className="nes-text-24 text-usa-white">
                  {question.correctState.name}
                </div>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-4 w-full max-w-[340px] mx-auto">
              <div className="text-center nes-text-8 text-usa-gold opacity-80 mb-4">
                Press A, B, or C to select • Click or use arrows
              </div>
              
              {question.options.map((option, index) => (
                <PixelButton
                  key={index}
                  onClick={() => onAnswerSelect(option.option, option.isCorrect)}
                  selected={keyboardMode && selectedOptionIndex === index}
                  size="lg"
                  className="w-full text-left justify-start py-4 px-6"
                  ariaLabel={`Press ${String.fromCharCode(65 + index)} for ${option.option}`}
                >
                  <span className="text-usa-gold mr-4 font-bold nes-text-button">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="nes-text-button">
                    {option.option}
                  </span>
                </PixelButton>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default GameScreen
