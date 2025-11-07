"use client"

import { StateData } from '@/data/states'
import { getRealStatePath, getOptimalViewBox } from '@/data/real-state-shapes'

interface StateShapeProps {
  state: StateData
  className?: string
  width?: number
  height?: number
}

export function StateShape({ 
  state, 
  className = '', 
  width = 600, 
  height = 450 
}: StateShapeProps) {

  // Get real state path and optimal viewBox for perfect display
  const statePath = getRealStatePath(state.id)
  const viewBox = getOptimalViewBox(state.id, 50)

  return (
    <div className={`pixel-panel bg-white p-8 ${className}`}>
      <div className="text-center mb-4">
        <div className="text-sm text-retro-accent opacity-90 mb-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          IDENTIFY THIS STATE:
        </div>
      </div>
      
      {/* Large, prominent state display */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 shadow-lg">
          <svg 
            width={width} 
            height={height}
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          >
            {/* Clean white background - no grid, no distractions */}
            <rect width="100%" height="100%" fill="#ffffff" />
            
            {/* State shape - prominent, clean vector graphics */}
            <path
              d={statePath}
              fill="#3b82f6"
              stroke="#1e40af" 
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ 
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.2))'
              }}
            />
          </svg>
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

export default StateShape
