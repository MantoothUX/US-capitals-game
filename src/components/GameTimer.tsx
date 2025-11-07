"use client"

import { useEffect } from 'react'

interface GameTimerProps {
  timeElapsed: number
  isRunning: boolean
  onWarning?: () => void
  warningThreshold?: number // milliseconds
  className?: string
}

export function GameTimer({ 
  timeElapsed, 
  isRunning, 
  onWarning, 
  warningThreshold = 300000, // 5 minutes
  className = '' 
}: GameTimerProps) {
  
  // Format time display
  const formatTime = (timeMs: number): string => {
    const minutes = Math.floor(timeMs / 60000)
    const seconds = Math.floor((timeMs % 60000) / 1000)
    const centiseconds = Math.floor((timeMs % 1000) / 10)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  // Check for warning threshold - only trigger once
  useEffect(() => {
    if (timeElapsed >= warningThreshold && onWarning) {
      // Only trigger the warning once, not repeatedly
      const hasTriggered = timeElapsed >= warningThreshold + 1000 // 1 second buffer
      if (!hasTriggered) {
        onWarning()
      }
    }
  }, [timeElapsed, warningThreshold, onWarning])

  const isWarning = timeElapsed >= warningThreshold
  const warningClass = isWarning ? 'usa-blink' : ''

  return (
    <div className={`usa-panel-inset ${warningClass} ${className} px-4 py-2`}>
      <div className="flex items-center gap-2">
        <span className="nes-text-8 opacity-80 text-usa-gold">TIME</span>
        <span className="nes-text-16 font-bold text-usa-white">{formatTime(timeElapsed)}</span>
      </div>
    </div>
  )
}

export default GameTimer
