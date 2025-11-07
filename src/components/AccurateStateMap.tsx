"use client"

import { StateData, GameMode } from '@/data/states'
import { useState } from 'react'
import RotatingHints from './RotatingHints'

interface AccurateStateMapProps {
  state: StateData
  gameMode?: GameMode
  className?: string
  width?: number
  height?: number
}

export function AccurateStateMap({ 
  state, 
  gameMode = 'easy', // Default to easy mode for backwards compatibility
  className = '', 
  width = 680, // Reduced by 15% from 800
  height = 425  // Reduced by 15% from 500
}: AccurateStateMapProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Use the generated highlighted state map
  const imageUrl = `/states/state-${state.id}-highlighted.svg`

  const handleImageError = () => {
    console.log(`Failed to load: ${imageUrl}`)
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  // Simple fallback if the SVG fails to load
  const simpleFallback = (
    <div className="text-center p-8">
      <div className="text-4xl mb-4">🗺️</div>
      <div className="text-xl text-gray-700 font-bold">{state.name}</div>
      <div className="text-sm text-gray-500 mt-2">Map loading...</div>
    </div>
  )

  return (
    <div className={`bg-transparent ${className}`}>
      {/* Rotating hints above the map - only in Easy mode */}
      {gameMode === 'easy' && (
        <div className="text-center mb-6">
          <RotatingHints state={state} />
        </div>
      )}
      
      {/* US map with highlighted state - no borders, transparent background */}
      <div className="flex justify-center">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={`United States map with ${state.name} highlighted in red`}
            width={width}
            height={height}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-50'
            }`}
            style={{
              filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.1))',
              imageRendering: 'auto',
              backgroundColor: 'transparent'
            }}
          />
        ) : (
          // Simple fallback
          simpleFallback
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            <div className="text-center">
              <div className="text-sm mb-2">LOADING MAP...</div>
              <div className="pixel-blink">🗺️</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccurateStateMap
