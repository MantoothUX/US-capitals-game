"use client"

import { useEffect } from 'react'
import { useGameState, GameMode } from '@/hooks/useGameState'
import { useAudio } from '@/hooks/useAudio'
import SplashScreen from './screens/SplashScreen'
import MenuScreen from './screens/MenuScreen'
import GameScreen from './screens/GameScreen'
import SuccessScreen from './screens/SuccessScreen'
import FailScreen from './screens/FailScreen'
import StateIncorrectScreen from './screens/StateIncorrectScreen'
import IncorrectFeedbackScreen from './screens/IncorrectFeedbackScreen'
import GameCompleteScreen from './screens/GameCompleteScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import ConfirmModal from './ConfirmModal'

declare global {
  interface Window {
    quick?: {
      db: {
        collection: (name: string) => {
          find: () => Promise<LeaderboardEntry[]>
          create: (data: LeaderboardEntry) => Promise<LeaderboardEntry>
        }
      }
    }
  }
}

import { LeaderboardEntry } from '@/hooks/useGameState'

export function StatesAndCapitalsGame() {
  const {
    gameState,
    currentQuestion,
    startNewGame,
    submitAnswer,
    proceedToNextLevel,
    returnToMenu,
    goToMenu,
    showQuitConfirmation,
    cancelQuit,
    moveSelection,
    selectCurrentOption,
    getFormattedTime,
    setGameState,
  } = useGameState()

  const { playSound, handleUserInteraction } = useAudio(gameState.audioEnabled)

  // Initialize audio on any user interaction
  useEffect(() => {
    const initAudio = () => {
      handleUserInteraction()
      document.removeEventListener('click', initAudio)
      document.removeEventListener('keydown', initAudio)
    }

    document.addEventListener('click', initAudio)
    document.addEventListener('keydown', initAudio)
    
    return () => {
      document.removeEventListener('click', initAudio)
      document.removeEventListener('keydown', initAudio)
    }
  }, [handleUserInteraction])

  // Handle global ESC key for quit
  useEffect(() => {
    const handleGlobalEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameState.screen === 'playing') {
        e.preventDefault()
        showQuitConfirmation()
      }
    }

    window.addEventListener('keydown', handleGlobalEscape)
    return () => window.removeEventListener('keydown', handleGlobalEscape)
  }, [gameState.screen, showQuitConfirmation])

  // Enhanced answer submission with sound
  const handleAnswerSelect = (answer: string, isCorrect: boolean) => {
    playSound('button-click')
    submitAnswer(answer, isCorrect)
    
    // Play appropriate sound based on result (after both questions answered)
    if (currentQuestion?.type === 'state-capital') {
      // This is the final question - determine overall result
      const stateCorrect = gameState.userAnswers.stateAnswer === currentQuestion.correctState.name
      const capitalCorrect = isCorrect
      
      setTimeout(() => {
        if (stateCorrect && capitalCorrect) {
          playSound('correct-answer')
        } else {
          playSound('wrong-answer')
        }
      }, 100)
    }
  }

  // Save score to leaderboard
  const handleSaveScore = async (initials: string) => {
    const scoreEntry = {
      initials,
      points: gameState.stats.points,
      time: gameState.stats.timeElapsed,
      date: new Date().toISOString(),
      completedStates: gameState.stats.totalLevels,
      gameMode: gameState.gameMode // Include game mode in score entry
    }

    try {
      if (typeof window !== 'undefined' && window.quick?.db) {
        const collection = window.quick.db.collection('us-states-leaderboard')
        await collection.create(scoreEntry)
      } else {
        // Fallback to localStorage for development
        const existingScores = JSON.parse(localStorage.getItem('us-states-scores') || '[]')
        existingScores.push(scoreEntry)
        localStorage.setItem('us-states-scores', JSON.stringify(existingScores))
      }
      
      // Navigate to leaderboard
      setGameState(prev => ({ ...prev, screen: 'leaderboard' }))
    } catch (error) {
      console.error('Failed to save score:', error)
      // Still navigate to leaderboard
      setGameState(prev => ({ ...prev, screen: 'leaderboard' }))
    }
  }

  // Handle timer warning (disabled - no sound, just visual blinking)
  const handleTimerWarning = () => {
    // No sound - just let the timer blink visually
    // playSound('timer-warning') // Commented out - was too annoying
  }

  // Handle success screen continue
  const handleSuccessContinue = () => {
    proceedToNextLevel()
    playSound('menu-select')
  }

  // Handle state incorrect screen continue
  const handleStateIncorrectContinue = () => {
    // Move to capital question for the correct state
    setGameState(prev => ({
      ...prev,
      screen: 'playing',
      currentQuestion: prev.capitalQuestion,
      selectedOptionIndex: -1, // Reset to no selection
      keyboardMode: false, // Reset keyboard mode for new question
    }))
    playSound('menu-select')
  }

  // Handle menu actions with sound
  const handleStartGame = (mode?: GameMode) => {
    playSound('menu-select')
    startNewGame(mode)
  }

  const handleShowLeaderboard = () => {
    playSound('menu-select')
    setGameState(prev => ({ ...prev, screen: 'leaderboard' }))
  }

  const handleToggleAudio = () => {
    playSound('button-click')
    setGameState(prev => ({ 
      ...prev, 
      audioEnabled: !prev.audioEnabled 
    }))
  }

  const handleReturnToMenu = () => {
    playSound('menu-select')
    returnToMenu()
  }

  const handleQuitConfirm = () => {
    playSound('wrong-answer')
    returnToMenu()
  }

  const handleQuitCancel = () => {
    playSound('menu-select')
    cancelQuit()
  }

  // Render current screen
  const renderCurrentScreen = () => {
    switch (gameState.screen) {
      case 'splash':
        return (
          <SplashScreen
            onStartGame={() => {
              playSound('menu-select')
              goToMenu()
            }}
          />
        )

      case 'menu':
        return (
          <MenuScreen
            onStartGame={handleStartGame}
            onShowLeaderboard={handleShowLeaderboard}
            audioEnabled={gameState.audioEnabled}
            onToggleAudio={handleToggleAudio}
          />
        )

      case 'playing':
        if (!currentQuestion) return null
        
        return (
          <GameScreen
            question={currentQuestion}
            stats={gameState.stats}
            selectedOptionIndex={gameState.selectedOptionIndex}
            keyboardMode={gameState.keyboardMode}
            hasStateAnswer={!!gameState.userAnswers.stateAnswer}
            gameMode={gameState.gameMode}
            onAnswerSelect={handleAnswerSelect}
            onExit={showQuitConfirmation}
            onMoveSelection={moveSelection}
            onSelectCurrentOption={selectCurrentOption}
            onTimerWarning={handleTimerWarning}
          />
        )

      case 'success':
        return (
          <SuccessScreen
            stats={gameState.stats}
            onContinue={handleSuccessContinue}
            onPlaySound={playSound}
          />
        )

      case 'state-incorrect':
        return (
          <StateIncorrectScreen 
            stats={gameState.stats}
            correctStateName={currentQuestion?.correctState.name || ""}
            userAnswer={gameState.userAnswers.stateAnswer || ""}
            onContinue={handleStateIncorrectContinue}
            onPlaySound={playSound}
          />
        )

      case 'incorrect-feedback':
        // Use the capitalQuestion's correctState to ensure we show the right answer
        const currentState = gameState.capitalQuestion?.correctState || gameState.stateSequence[gameState.currentStateIndex]
        return (
          <IncorrectFeedbackScreen 
            stats={gameState.stats}
            correctStateName={currentState?.name || ""}
            correctCapital={currentState?.capital || ""}
            userStateAnswer={gameState.userAnswers.stateAnswer}
            userCapitalAnswer={gameState.userAnswers.capitalAnswer}
            pointsEarned={0} // Will be calculated in the screen based on correctness
            onContinue={handleSuccessContinue}
            onPlaySound={playSound}
          />
        )

      case 'game-complete':
        return (
          <GameCompleteScreen
            stats={gameState.stats}
            onSaveScore={handleSaveScore}
            onReturnToMenu={handleReturnToMenu}
            onPlaySound={playSound}
          />
        )

      case 'leaderboard':
        return (
          <LeaderboardScreen
            onReturnToMenu={handleReturnToMenu}
            onStartNewGame={handleStartGame}
            currentGameMode={gameState.gameMode}
          />
        )

      default:
        return (
          <MenuScreen
            onStartGame={handleStartGame}
            onShowLeaderboard={handleShowLeaderboard}
            audioEnabled={gameState.audioEnabled}
            onToggleAudio={handleToggleAudio}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-game-bg">
      {renderCurrentScreen()}
      
      {/* Quit Confirmation Modal */}
      <ConfirmModal
        isOpen={gameState.screen === 'quit-confirm'}
        title="QUIT GAME?"
        message="Are you sure you want to quit? Your progress will be lost!"
        onConfirm={handleQuitConfirm}
        onCancel={handleQuitCancel}
        confirmText="QUIT"
        cancelText="CONTINUE"
      />
    </div>
  )
}

export default StatesAndCapitalsGame
