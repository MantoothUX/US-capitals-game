/* eslint-disable @typescript-eslint/no-require-imports */
"use client"

import { useState, useEffect, useCallback } from 'react'
import { StateData, US_STATES, shuffleArray } from '@/data/states'

export type GameScreen = 
  | 'splash'
  | 'menu'
  | 'playing'
  | 'success'
  | 'state-incorrect'
  | 'incorrect-feedback'
  | 'quit-confirm'
  | 'leaderboard'
  | 'game-complete'

export type QuestionType = 'state-name' | 'state-capital'

export type GameMode = 'easy' | 'very-american'

export interface GameQuestion {
  type: QuestionType
  correctState: StateData
  userSelectedState?: StateData // Only for capital questions
  options: { option: string; isCorrect: boolean; id?: string }[]
}

export interface GameStats {
  level: number
  totalLevels: number
  timeElapsed: number
  points: number
  maxPoints: number
  isTimerRunning: boolean
  gameStartTime: number | null
}

export interface LeaderboardEntry {
  initials: string
  points: number
  time: number
  date: string
  completedStates: number
  gameMode?: GameMode // Optional for backwards compatibility with existing scores
}

export interface GameState {
  // Core game state
  screen: GameScreen
  currentQuestion: GameQuestion | null
  stats: GameStats
  
  // Game flow
  stateSequence: StateData[]
  currentStateIndex: number
  userAnswers: { stateAnswer?: string; capitalAnswer?: string }
  
  // Stored questions for current level
  stateNameQuestion: GameQuestion | null
  capitalQuestion: GameQuestion | null
  
  // Game mode
  gameMode: GameMode
  
  // Audio
  audioEnabled: boolean
  
  // Leaderboard
  leaderboard: LeaderboardEntry[]
  
  // Accessibility
  selectedOptionIndex: number
  keyboardMode: boolean
}

const INITIAL_GAME_STATE: GameState = {
  screen: 'splash',
  currentQuestion: null,
  stats: {
    level: 0,
    totalLevels: 50,
    timeElapsed: 0,
    isTimerRunning: false,
    gameStartTime: null,
  },
  stateSequence: [],
  currentStateIndex: 0,
  userAnswers: {},
  stateNameQuestion: null,
  capitalQuestion: null,
  gameMode: 'easy', // Default to easy mode
  audioEnabled: true,
  leaderboard: [],
  selectedOptionIndex: -1, // No initial selection
  keyboardMode: false,
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)

  // Timer effect
  useEffect(() => {
    if (!gameState.stats.isTimerRunning || !gameState.stats.gameStartTime) return

    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          timeElapsed: Date.now() - prev.stats.gameStartTime!
        }
      }))
    }, 10) // Update every 10ms for precision

    return () => clearInterval(interval)
  }, [gameState.stats.isTimerRunning, gameState.stats.gameStartTime])

  // Game initialization
  const startNewGame = useCallback((mode?: GameMode) => {
    const shuffledStates = shuffleArray([...US_STATES])
    const firstState = shuffledStates[0]
    
    // Generate first state name question
    const { generateStateNameOptions } = require('@/data/states')
    const stateOptions = generateStateNameOptions(firstState)
    const stateNameQuestion: GameQuestion = {
      type: 'state-name',
      correctState: firstState,
      options: stateOptions.map(state => ({
        option: state.name,
        isCorrect: state.id === firstState.id,
        id: state.id
      }))
    }
    
    setGameState(prev => ({
      ...prev,
      screen: 'playing',
      stateSequence: shuffledStates,
      currentStateIndex: 0,
      userAnswers: {},
      stateNameQuestion,
      capitalQuestion: null,
      currentQuestion: stateNameQuestion,
      gameMode: mode || prev.gameMode, // Use provided mode or keep existing
      stats: {
        level: 1,
        totalLevels: 50,
        timeElapsed: 0,
        points: 0,
        maxPoints: 100,
        isTimerRunning: true,
        gameStartTime: Date.now(),
      },
      selectedOptionIndex: -1, // Start with no selection
      keyboardMode: false, // Ensure keyboard mode is reset at game start
    }))
  }, [])

  // Get current question from stored state
  const getCurrentQuestion = useCallback((): GameQuestion | null => {
    if (gameState.currentStateIndex >= gameState.stateSequence.length) return null
    
    // Return the stored question based on current state
    if (!gameState.userAnswers.stateAnswer) {
      return gameState.stateNameQuestion
    }
    
    if (!gameState.userAnswers.capitalAnswer) {
      return gameState.capitalQuestion
    }
    
    return null
  }, [gameState.currentStateIndex, gameState.stateSequence.length, gameState.userAnswers, gameState.stateNameQuestion, gameState.capitalQuestion])

  // Answer submission
  const submitAnswer = useCallback((answer: string, isCorrect: boolean) => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    if (currentQuestion.type === 'state-name') {
      // Award point immediately for state question
      const pointsEarned = isCorrect ? 1 : 0
      
      // Always generate capital question for the CORRECT state (not user's wrong answer)
      const currentState = gameState.stateSequence[gameState.currentStateIndex]
      const { generateCapitalOptions } = require('@/data/states')
      // Always use correct state for capital options, pass game mode
      const capitalOptions = generateCapitalOptions(currentState, currentState, gameState.gameMode)
      
      const capitalQuestion: GameQuestion = {
        type: 'state-capital',
        correctState: currentState,
        userSelectedState: currentState, // Always the correct state now
        options: capitalOptions.map(item => ({
          option: item.option,
          isCorrect: item.isCorrect
        }))
      }
      
      if (isCorrect) {
        // State correct - go directly to capital question
        setGameState(prev => ({
          ...prev,
          userAnswers: { ...prev.userAnswers, stateAnswer: answer },
          capitalQuestion,
          currentQuestion: capitalQuestion,
          selectedOptionIndex: -1, // Reset to no selection
          keyboardMode: false, // Reset keyboard mode for new question
          stats: {
            ...prev.stats,
            points: prev.stats.points + pointsEarned
          }
        }))
      } else {
        // State wrong - show feedback first, then continue to capital
        setGameState(prev => ({
          ...prev,
          screen: 'state-incorrect',
          userAnswers: { ...prev.userAnswers, stateAnswer: answer },
          capitalQuestion,
          selectedOptionIndex: -1, // Reset to no selection
          keyboardMode: false, // Reset keyboard mode for new question
          stats: {
            ...prev.stats,
            points: prev.stats.points + pointsEarned
          }
        }))
      }
    } else {
      // Capital question - award point immediately for capital question
      const capitalAnswerCorrect = isCorrect
      const capitalPointsEarned = capitalAnswerCorrect ? 1 : 0
      
      // Calculate total points earned for this state (state + capital)
      const stateAnswerCorrect = gameState.userAnswers.stateAnswer === currentQuestion.correctState.name
      const totalStatePoints = (stateAnswerCorrect ? 1 : 0) + (capitalAnswerCorrect ? 1 : 0)
      
      if (gameState.currentStateIndex >= gameState.stateSequence.length - 1) {
        // Game complete! Show final score
        setGameState(prev => ({
          ...prev,
          screen: 'game-complete',
          userAnswers: { ...prev.userAnswers, capitalAnswer: answer }, // Store capital answer
          stats: { 
            ...prev.stats, 
            points: prev.stats.points + capitalPointsEarned,
            isTimerRunning: false 
          }
        }))
      } else {
        // Continue to next state regardless of correctness
        setGameState(prev => ({
          ...prev,
          screen: capitalAnswerCorrect ? 'success' : 'incorrect-feedback',
          userAnswers: { ...prev.userAnswers, capitalAnswer: answer }, // Store capital answer
          stats: { 
            ...prev.stats, 
            level: prev.stats.level + 1,
            points: prev.stats.points + capitalPointsEarned
          }
        }))
      }
    }
  }, [gameState, getCurrentQuestion])

  // Navigate to next level after success screen
  const proceedToNextLevel = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentStateIndex + 1
      if (nextIndex >= prev.stateSequence.length) return prev
      
      const nextState = prev.stateSequence[nextIndex]
      
      // Generate new state name question for next level
      const { generateStateNameOptions } = require('@/data/states')
      const stateOptions = generateStateNameOptions(nextState)
      const stateNameQuestion: GameQuestion = {
        type: 'state-name',
        correctState: nextState,
        options: stateOptions.map(state => ({
          option: state.name,
          isCorrect: state.id === nextState.id,
          id: state.id
        }))
      }
      
      return {
        ...prev,
        screen: 'playing',
        currentStateIndex: nextIndex,
        userAnswers: {},
        stateNameQuestion,
        capitalQuestion: null,
        currentQuestion: stateNameQuestion,
        selectedOptionIndex: -1, // Reset to no selection
        keyboardMode: false, // Reset keyboard mode for new level
      }
    })
  }, [])

  // Return to menu
  const returnToMenu = useCallback(() => {
    setGameState(INITIAL_GAME_STATE)
  }, [])

  // Navigate from splash to menu
  const goToMenu = useCallback(() => {
    setGameState(prev => ({ ...prev, screen: 'menu' }))
  }, [])

  // Show quit confirmation
  const showQuitConfirmation = useCallback(() => {
    setGameState(prev => ({ ...prev, screen: 'quit-confirm' }))
  }, [])

  // Cancel quit
  const cancelQuit = useCallback(() => {
    setGameState(prev => ({ ...prev, screen: 'playing' }))
  }, [])

  // Keyboard navigation
  const moveSelection = useCallback((direction: 'up' | 'down') => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    setGameState(prev => {
      const maxIndex = currentQuestion.options.length - 1
      let newIndex = prev.selectedOptionIndex
      
      // If no selection yet, start at 0 for down or maxIndex for up
      if (prev.selectedOptionIndex === -1) {
        newIndex = direction === 'up' ? maxIndex : 0
      } else {
        if (direction === 'up') {
          newIndex = prev.selectedOptionIndex > 0 ? prev.selectedOptionIndex - 1 : maxIndex
        } else {
          newIndex = prev.selectedOptionIndex < maxIndex ? prev.selectedOptionIndex + 1 : 0
        }
      }
      
      return {
        ...prev,
        selectedOptionIndex: newIndex,
        keyboardMode: true
      }
    })
  }, [getCurrentQuestion])

  // Select current option
  const selectCurrentOption = useCallback(() => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return
    
    // Only select if there's a valid selection
    if (gameState.selectedOptionIndex >= 0 && gameState.selectedOptionIndex < currentQuestion.options.length) {
      const selectedOption = currentQuestion.options[gameState.selectedOptionIndex]
      submitAnswer(selectedOption.option, selectedOption.isCorrect)
    }
  }, [gameState.selectedOptionIndex, getCurrentQuestion, submitAnswer])

  // Format timer display
  const getFormattedTime = useCallback((timeMs: number): string => {
    const minutes = Math.floor(timeMs / 60000)
    const seconds = Math.floor((timeMs % 60000) / 1000)
    const centiseconds = Math.floor((timeMs % 1000) / 10)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }, [])

  return {
    gameState,
    currentQuestion: getCurrentQuestion(),
    
    // Actions
    startNewGame,
    submitAnswer,
    proceedToNextLevel,
    returnToMenu,
    goToMenu,
    showQuitConfirmation,
    cancelQuit,
    
    // Keyboard navigation
    moveSelection,
    selectCurrentOption,
    
    // Utilities
    getFormattedTime,
    
    // Direct state setters for special cases
    setGameState,
  }
}
