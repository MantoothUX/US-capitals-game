"use client"

import { StateData } from '@/data/states'
import { useState } from 'react'

interface StateInUSMapProps {
  state: StateData
  className?: string
  width?: number
  height?: number
}

export function StateInUSMap({ 
  state, 
  className = '', 
  width = 700, 
  height = 450 
}: StateInUSMapProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Try to load Wikipedia-style "state in US" image
  const imageUrl = `/states/state-${state.id}-in-us.png`

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  // Create a simple US map with the state highlighted
  const createHighlightedUSMap = () => {
    // Simplified US map with state positions
    const statePositions: Record<string, { x: number, y: number, width: number, height: number }> = {
      // West Coast
      WA: { x: 50, y: 80, width: 80, height: 60 },
      OR: { x: 50, y: 140, width: 80, height: 50 },
      CA: { x: 30, y: 190, width: 60, height: 160 },
      
      // Southwest
      NV: { x: 90, y: 170, width: 70, height: 90 },
      AZ: { x: 120, y: 260, width: 70, height: 80 },
      NM: { x: 190, y: 260, width: 60, height: 80 },
      UT: { x: 160, y: 190, width: 50, height: 70 },
      CO: { x: 220, y: 210, width: 70, height: 50 },
      
      // Mountain West
      ID: { x: 110, y: 110, width: 50, height: 80 },
      MT: { x: 160, y: 90, width: 120, height: 60 },
      WY: { x: 220, y: 150, width: 70, height: 60 },
      
      // Plains
      ND: { x: 280, y: 90, width: 70, height: 40 },
      SD: { x: 280, y: 130, width: 70, height: 40 },
      NE: { x: 280, y: 170, width: 70, height: 40 },
      KS: { x: 280, y: 210, width: 70, height: 40 },
      OK: { x: 280, y: 250, width: 80, height: 40 },
      
      // Texas
      TX: { x: 220, y: 290, width: 120, height: 120 },
      
      // Midwest
      MN: { x: 350, y: 100, width: 60, height: 80 },
      WI: { x: 410, y: 120, width: 50, height: 70 },
      IA: { x: 350, y: 180, width: 60, height: 50 },
      MO: { x: 350, y: 230, width: 70, height: 60 },
      AR: { x: 350, y: 290, width: 50, height: 50 },
      LA: { x: 350, y: 340, width: 60, height: 60 },
      
      // Great Lakes
      MI: { x: 460, y: 140, width: 70, height: 80 },
      IL: { x: 420, y: 190, width: 40, height: 80 },
      IN: { x: 460, y: 190, width: 40, height: 70 },
      OH: { x: 500, y: 180, width: 60, height: 60 },
      KY: { x: 480, y: 240, width: 80, height: 40 },
      TN: { x: 480, y: 280, width: 90, height: 30 },
      
      // Southeast
      MS: { x: 420, y: 310, width: 40, height: 70 },
      AL: { x: 460, y: 310, width: 40, height: 70 },
      GA: { x: 500, y: 310, width: 50, height: 80 },
      FL: { x: 550, y: 350, width: 80, height: 100 },
      SC: { x: 550, y: 310, width: 50, height: 40 },
      NC: { x: 550, y: 270, width: 90, height: 40 },
      VA: { x: 570, y: 230, width: 80, height: 40 },
      WV: { x: 530, y: 200, width: 40, height: 50 },
      
      // Northeast
      PA: { x: 570, y: 180, width: 70, height: 50 },
      NY: { x: 600, y: 130, width: 80, height: 50 },
      NJ: { x: 640, y: 200, width: 30, height: 50 },
      CT: { x: 670, y: 180, width: 30, height: 20 },
      RI: { x: 700, y: 180, width: 15, height: 15 },
      MA: { x: 680, y: 160, width: 50, height: 20 },
      VT: { x: 650, y: 140, width: 20, height: 40 },
      NH: { x: 670, y: 140, width: 20, height: 40 },
      ME: { x: 690, y: 120, width: 30, height: 60 },
      MD: { x: 620, y: 210, width: 40, height: 20 },
      DE: { x: 660, y: 210, width: 15, height: 30 },
      
      // Non-contiguous
      AK: { x: 80, y: 350, width: 120, height: 80 },
      HI: { x: 250, y: 400, width: 80, height: 30 },
    }

    const statePos = statePositions[state.id] || { x: 350, y: 200, width: 50, height: 50 }

    return (
      <svg width={width} height={height} viewBox="0 0 800 500" className="w-full h-full">
        {/* US Map Background */}
        <rect width="100%" height="100%" fill="#f8fafc" />
        
        {/* Draw all states in light gray */}
        {Object.entries(statePositions).map(([stateId, pos]) => (
          <rect
            key={stateId}
            x={pos.x}
            y={pos.y}
            width={pos.width}
            height={pos.height}
            fill={stateId === state.id ? "#dc2626" : "#e5e7eb"}
            stroke="#9ca3af"
            strokeWidth="1"
            rx="2"
          />
        ))}
        
        {/* State borders */}
        <rect x="20" y="60" width="750" height="400" fill="none" stroke="#6b7280" strokeWidth="2" rx="8" />
        
        {/* Title */}
        <text
          x="400"
          y="40"
          textAnchor="middle"
          className="fill-gray-700 text-lg font-bold"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
        >
          {state.name} (highlighted in red)
        </text>
        
        {/* Legend */}
        <text
          x="50"
          y="480"
          className="fill-gray-600 text-sm"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "12px" }}
        >
          Identify the highlighted state
        </text>
      </svg>
    )
  }

  return (
    <div className={`pixel-panel bg-white p-8 ${className}`}>
      <div className="text-center mb-4">
        <div className="text-sm text-retro-accent opacity-90 mb-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          IDENTIFY THIS STATE:
        </div>
      </div>
      
      {/* Large, prominent state display */}
      <div className="flex justify-center mb-4">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
          
          {!imageError ? (
            <img
              src={imageUrl}
              alt={`${state.name} highlighted in United States map`}
              width={width}
              height={height}
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.1))',
                imageRendering: 'auto'
              }}
            />
          ) : (
            // Show simplified US map with highlighted state
            <div className="text-center w-full">
              {createHighlightedUSMap()}
              <div className="mt-4 text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                Using simplified US map
              </div>
            </div>
          )}
          
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute text-center text-gray-400" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              <div className="text-sm mb-2">LOADING MAP...</div>
              <div className="pixel-blink">🗺️</div>
            </div>
          )}
        </div>
      </div>
      
      {/* State info below the map */}
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

export default StateInUSMap





