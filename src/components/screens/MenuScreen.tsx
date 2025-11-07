"use client"

import PixelButton from '../PixelButton'
import { GameMode } from '@/hooks/useGameState'

interface MenuScreenProps {
  onStartGame: (mode: GameMode) => void
  onShowLeaderboard: () => void
  audioEnabled: boolean
  onToggleAudio: () => void
}

export function MenuScreen({ 
  onStartGame, 
  onShowLeaderboard,
  audioEnabled,
  onToggleAudio 
}: MenuScreenProps) {
  
  return (
    <div className="crt-monitor">
      <div className="crt-screen flex flex-col items-center justify-center p-8 md:p-12 w-full relative min-h-screen">
        
        {/* Animated American Flag GIF Background */}
        <div className="usa-flag">
          <img 
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWpyeGlncXJwOTBsZzI3cDBibWVzZnJ0b2ZhMTg3ZnAzMnVoMXprZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sFMDqop2ku4M0/giphy.gif"
            alt="Retro Waving American Flag"
            className="flag-gif"
          />
        </div>
        
        <div className="w-full space-y-8 relative z-10">
          
          {/* Game Title - Captain America Comic Style */}
          <div className="text-center space-y-6">
            <div className="comic-title" style={{ fontSize: '80px' }}>
              UNITED STATES AND CAPITALS
            </div>
          </div>

          {/* Game Description - Reduced width to hug content */}
          <div className="usa-panel p-6 space-y-4 max-w-[408px] mx-auto">
            <h3 className="nes-text-button text-usa-gold text-center">
              HOW TO PLAY:
            </h3>
            
            <div className="nes-text-button text-usa-white space-y-4 leading-relaxed">
              <div className="flex items-start gap-4">
                <span className="text-usa-gold">1.</span>
                <span>Identify the STATE by its shape</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-usa-gold">2.</span>
                <span>Choose the STATE CAPITAL</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-usa-gold">3.</span>
                <span>Earn points: 1 per correct answer (100 max)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-usa-gold">🏆</span>
                <span>Top scores are added to the leaderboard!</span>
              </div>
            </div>
          </div>

          {/* Game Mode Selector - Click to Start */}
          <div className="usa-panel p-4 max-w-[408px] mx-auto">
            <h4 className="nes-text-button text-usa-gold text-center mb-4">
              SELECT DIFFICULTY:
            </h4>
            <div className="space-y-2">
              <PixelButton
                onClick={() => onStartGame('easy')}
                variant="secondary"
                size="lg"
                className="w-full"
                ariaLabel="Start game in Easy mode"
              >
                EASY
              </PixelButton>
              <PixelButton
                onClick={() => onStartGame('very-american')}
                variant="secondary"
                size="lg"
                className="w-full"
                ariaLabel="Start game in Very American mode"
              >
                VERY AMERICAN 🇺🇸
              </PixelButton>
            </div>
          </div>

          {/* Secondary Menu Buttons */}
          <div className="flex gap-4 justify-center">
            <PixelButton
              onClick={onShowLeaderboard}
              variant="secondary"
              size="md"
              ariaLabel="View leaderboard"
            >
              LEADERBOARD
            </PixelButton>
            
            <PixelButton
              onClick={onToggleAudio}
              variant={audioEnabled ? 'success' : 'secondary'}
              size="md"
              ariaLabel={`${audioEnabled ? 'Disable' : 'Enable'} audio`}
            >
              AUDIO: {audioEnabled ? 'ON' : 'OFF'}
            </PixelButton>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MenuScreen
