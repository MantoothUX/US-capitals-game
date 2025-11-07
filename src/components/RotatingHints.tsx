"use client"

import { useState, useEffect } from 'react'
import { getAllHints } from '@/data/state-trivia'
import { StateData } from '@/data/states'

interface RotatingHintsProps {
  state: StateData
  className?: string
}

export function RotatingHints({ state, className = '' }: RotatingHintsProps) {
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const hints = getAllHints(state.id)

  // Rotate hints every 3 seconds
  useEffect(() => {
    if (hints.length <= 1) return

    const interval = setInterval(() => {
      setCurrentHintIndex(prev => (prev + 1) % hints.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [hints.length])

  // Reset to first hint when state changes
  useEffect(() => {
    setCurrentHintIndex(0)
  }, [state.id])

  if (hints.length === 0) return null

  return (
    <div className={`${className} w-full max-w-[680px] mx-auto`}>
      <div className="usa-panel-inset px-6 py-4 shadow-sm">
        <div 
          className="nes-text-hint text-usa-white text-center transition-opacity duration-300 min-h-[28px] flex items-center justify-center"
        >
          {hints[currentHintIndex]}
        </div>
      </div>
    </div>
  )
}

export default RotatingHints
