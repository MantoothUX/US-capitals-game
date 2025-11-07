"use client"

import { StateData } from '@/data/states'
import { useState } from 'react'

interface StateImageShapeProps {
  state: StateData
  className?: string
  width?: number
  height?: number
}

export function StateImageShape({ 
  state, 
  className = '', 
  width = 500, 
  height = 400 
}: StateImageShapeProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Try multiple image sources as fallbacks
  const imageSources = [
    `/states/state-${state.id}.svg`,
    `/states/state-${state.id}.png`,
    `/states/${state.name.toLowerCase().replace(' ', '-')}.svg`,
    `/states/${state.name.toLowerCase().replace(' ', '-')}.png`,
  ]

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  // Fallback SVG for when image fails to load
  const fallbackSVG = (
    <svg 
      width={width} 
      height={height}
      viewBox="0 0 400 300"
      className="w-full h-full"
    >
      <rect width="100%" height="100%" fill="#f8fafc" />
      <rect 
        x="50" 
        y="75" 
        width="300" 
        height="150" 
        fill="#3b82f6"
        stroke="#1e40af"
        strokeWidth="3"
        rx="8"
      />
      <text
        x="200"
        y="150"
        textAnchor="middle"
        className="fill-white text-lg font-bold"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '14px' }}
      >
        {state.id}
      </text>
    </svg>
  )

  return (
    <div className={`pixel-panel bg-white p-8 ${className}`}>
      <div className="text-center mb-4">
        <div className="text-sm text-retro-accent opacity-90 mb-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          IDENTIFY THIS STATE:
        </div>
      </div>
      
      {/* Large, prominent state display */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 shadow-lg min-h-[400px] min-w-[500px] flex items-center justify-center">
          
          {!imageError ? (
            <img
              src={imageSources[0]} // Try first source
              alt={`Outline of ${state.name}`}
              width={width}
              height={height}
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.15))',
                imageRendering: 'auto' // Ensure crisp vector rendering
              }}
            />
          ) : (
            // Show fallback SVG with state abbreviation if image fails
            <div className="text-center">
              {fallbackSVG}
              <div className="mt-4 text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                State outline image not available
              </div>
            </div>
          )}
          
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="text-center text-gray-400" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              <div className="text-sm mb-2">LOADING STATE...</div>
              <div className="pixel-blink">⏳</div>
            </div>
          )}
        </div>
      </div>
      
      {/* State info below the shape */}
      <div className="text-center">
        <div className="text-xs text-gray-600 opacity-80" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Est. {state.statehood} • {state.region}
        </div>
        {state.nickname && (
          <div className="text-xs text-gray-500 opacity-70 mt-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            &ldquo;{state.nickname}&rdquo;
          </div>
        )}
      </div>
    </div>
  )
}

export default StateImageShape


