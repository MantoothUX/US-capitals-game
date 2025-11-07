"use client"

import { StateData } from '@/data/states'
import { useState } from 'react'

interface WikimediaStateShapeProps {
  state: StateData
  className?: string
  width?: number
  height?: number
}

export function WikimediaStateShape({ 
  state, 
  className = '', 
  width = 600, 
  height = 450 
}: WikimediaStateShapeProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Generate Wikimedia Commons URLs for state outline images
  const getWikimediaStateUrl = (stateId: string, stateName: string): string[] => {
    // Multiple URL patterns to try from Wikimedia Commons
    const baseUrl = 'https://upload.wikimedia.org/wikipedia/commons'
    
    return [
      // Pattern 1: Direct state outline files
      `${baseUrl}/thumb/b/b0/Map_of_USA_${stateId}.svg/800px-Map_of_USA_${stateId}.svg.png`,
      `${baseUrl}/thumb/a/a0/USA_${stateId}_location_map.svg/800px-USA_${stateId}_location_map.svg.png`,
      `${baseUrl}/thumb/c/c0/${stateName}_in_United_States.svg/800px-${stateName}_in_United_States.svg.png`,
      
      // Pattern 2: State outline maps
      `${baseUrl}/thumb/d/d0/Map_of_${stateName}_NA.png/800px-Map_of_${stateName}_NA.png`,
      `${baseUrl}/thumb/5/50/Outline_map_of_${stateName}.svg/800px-Outline_map_of_${stateName}.svg.png`,
      
      // Pattern 3: Alternative formats
      `${baseUrl}/thumb/1/10/${stateName}_outline_map.svg/800px-${stateName}_outline_map.svg.png`,
      `${baseUrl}/thumb/0/00/Blank_map_of_${stateName}.svg/800px-Blank_map_of_${stateName}.svg.png`,
      
      // Fallback to our local images
      `/states/state-${stateId}.svg`,
    ]
  }

  const imageUrls = getWikimediaStateUrl(state.id, state.name.replace(' ', '_'))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageError = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      // Try next URL
      setCurrentImageIndex(prev => prev + 1)
      setImageError(false)
    } else {
      // All URLs failed
      setImageError(true)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  // Enhanced fallback that shows a recognizable state shape
  const getStateOutlineSVG = (stateId: string) => {
    const outlines: Record<string, string> = {
      TX: 'M 100,150 L 180,150 L 200,120 L 250,130 L 300,160 L 320,200 L 310,250 L 280,300 L 240,320 L 200,310 L 160,280 L 120,240 L 80,200 L 70,160 L 100,150 Z',
      CA: 'M 150,50 L 170,40 L 180,60 L 190,100 L 200,150 L 190,200 L 180,250 L 170,300 L 160,350 L 150,330 L 140,280 L 130,230 L 120,180 L 130,130 L 140,80 L 150,50 Z',
      FL: 'M 200,200 L 250,180 L 300,200 L 320,240 L 330,280 L 340,320 L 350,360 L 340,400 L 320,380 L 300,350 L 280,320 L 260,280 L 240,240 L 220,220 L 200,200 Z',
      NY: 'M 150,100 L 250,80 L 300,120 L 280,160 L 240,180 L 200,170 L 160,150 L 130,120 L 150,100 Z M 310,130 L 350,125 L 370,135 L 350,145 L 310,140 L 310,130 Z',
      MI: 'M 200,120 L 250,100 L 280,130 L 270,160 L 240,180 L 200,170 L 170,150 L 180,130 L 200,120 Z M 150,80 L 200,70 L 230,90 L 200,110 L 170,100 L 150,80 Z',
      AK: 'M 100,200 L 200,180 L 300,200 L 400,240 L 380,300 L 320,320 L 250,300 L 180,280 L 120,240 L 100,200 Z M 80,250 L 120,240 L 140,260 L 120,280 L 80,270 L 80,250 Z',
      HI: 'M 100,200 L 110,195 L 115,200 L 110,205 L 100,200 Z M 130,195 L 140,190 L 145,195 L 140,200 L 130,195 Z M 160,190 L 170,185 L 175,190 L 170,195 L 160,190 Z M 190,185 L 200,180 L 205,185 L 200,190 L 190,185 Z',
      CO: 'M 100,150 L 300,150 L 300,250 L 100,250 L 100,150 Z',
      WY: 'M 100,120 L 300,120 L 300,180 L 100,180 L 100,120 Z',
    }
    
    return outlines[stateId] || 'M 100,150 L 300,150 L 300,250 L 100,250 L 100,150 Z'
  }

  const fallbackSVG = (
    <svg 
      width={width} 
      height={height}
      viewBox="0 0 400 300"
      className="w-full h-full"
    >
      <rect width="100%" height="100%" fill="#f8fafc" />
      <path
        d={getStateOutlineSVG(state.id)}
        fill="#3b82f6"
        stroke="#1e40af"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text
        x="200"
        y="280"
        textAnchor="middle"
        className="fill-blue-600 text-sm font-bold"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}
      >
        {state.name}
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
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg min-h-[450px] min-w-[600px] flex items-center justify-center">
          
          {!imageError && currentImageIndex < imageUrls.length ? (
            <img
              src={imageUrls[currentImageIndex]}
              alt={`Outline of ${state.name}`}
              width={width}
              height={height}
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.15))',
                imageRendering: 'auto'
              }}
            />
          ) : (
            // Show our enhanced fallback SVG
            <div className="text-center w-full">
              {fallbackSVG}
              <div className="mt-4 text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                Using fallback outline
              </div>
            </div>
          )}
          
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && currentImageIndex < imageUrls.length && (
            <div className="absolute text-center text-gray-400" style={{ fontFamily: "'Press Start 2P', monospace" }}>
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

export default WikimediaStateShape


