"use client"

import { useEffect, useState } from 'react'
import PixelButton from '../PixelButton'
import { LeaderboardEntry, GameMode } from '@/hooks/useGameState'

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

interface LeaderboardScreenProps {
  onReturnToMenu: () => void
  onStartNewGame: () => void
  currentGameMode: GameMode
}

export function LeaderboardScreen({ 
  onReturnToMenu, 
  onStartNewGame,
  currentGameMode 
}: LeaderboardScreenProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<GameMode>(currentGameMode)

  // Load leaderboard from Quick.db or localStorage
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        let allEntries: LeaderboardEntry[] = []
        
        if (typeof window !== 'undefined' && window.quick?.db) {
          const collection = window.quick.db.collection('us-states-leaderboard')
          allEntries = await collection.find()
        } else {
          // Fallback to localStorage
          allEntries = JSON.parse(localStorage.getItem('us-states-scores') || '[]')
        }
        
        // Filter by game mode (treat undefined/null as 'easy' for backwards compatibility)
        const filteredEntries = allEntries.filter(entry => 
          (entry.gameMode || 'easy') === viewMode
        )
        
        // Sort by points (highest first), then by time (fastest first) for ties
        const sorted = filteredEntries
          .sort((a, b) => {
            if (b.points !== a.points) {
              return b.points - a.points // Higher points first
            }
            return a.time - b.time // Faster time first for ties
          })
          .slice(0, 10) // Top 10
        
        setLeaderboard(sorted)
      } catch (err) {
        console.error('Failed to load leaderboard:', err)
        setError('Failed to load scores')
        // Still try localStorage on error
        const localScores = JSON.parse(localStorage.getItem('us-states-scores') || '[]')
        const filtered = localScores.filter((entry: LeaderboardEntry) => 
          (entry.gameMode || 'easy') === viewMode
        )
        setLeaderboard(filtered.slice(0, 10))
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [viewMode]) // Reload when view mode changes

  const formatTime = (timeMs: number): string => {
    const minutes = Math.floor(timeMs / 60000)
    const seconds = Math.floor((timeMs % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-game-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl text-retro-warning">
            HALL OF FAME
          </h1>
          <div className="text-sm text-retro-accent">
            Top Geography Masters
          </div>
          
          {/* Mode Selector - Toggle Style */}
          <div className="flex justify-center gap-0 pt-2">
            <PixelButton
              onClick={() => setViewMode('easy')}
              selected={viewMode === 'easy'}
              size="md"
              variant={viewMode === 'easy' ? 'primary' : 'secondary'}
              className={viewMode === 'easy' ? 'border-r-0' : ''}
              ariaLabel="View Easy mode leaderboard"
            >
              EASY
            </PixelButton>
            <PixelButton
              onClick={() => setViewMode('very-american')}
              selected={viewMode === 'very-american'}
              size="md"
              variant={viewMode === 'very-american' ? 'primary' : 'secondary'}
              className={viewMode === 'very-american' ? 'border-l-0' : ''}
              ariaLabel="View Very American mode leaderboard"
            >
              VERY AMERICAN
            </PixelButton>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="pixel-panel bg-game-panel p-6">
          {loading ? (
            <div className="text-center text-retro-text">
              <div className="pixel-blink">LOADING SCORES...</div>
            </div>
          ) : error ? (
            <div className="text-center text-retro-error">
              {error}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center text-retro-text space-y-4">
              <div>NO SCORES YET!</div>
              <div className="text-sm text-retro-accent opacity-80">
                Be the first to complete all 50 states!
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 text-xs text-retro-accent border-b border-retro-border pb-2">
                <div>RANK</div>
                <div>NAME</div>
                <div>TIME</div>
                <div>STATES</div>
                <div>DATE</div>
              </div>
              
              {/* Scores */}
              {leaderboard.map((entry, index) => (
                <div 
                  key={index}
                  className={`grid grid-cols-5 gap-4 text-sm py-2 px-2 rounded ${
                    index === 0 
                      ? 'bg-yellow-900/20 border border-yellow-600 text-retro-warning' 
                      : index === 1
                        ? 'bg-gray-600/20 border border-gray-400 text-gray-300'
                        : index === 2
                          ? 'bg-orange-900/20 border border-orange-600 text-orange-300'
                          : 'text-retro-text'
                  }`}
                >
                  <div className="font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </div>
                  <div className="font-bold">{entry.initials}</div>
                  <div>{formatTime(entry.time)}</div>
                  <div>{entry.completedStates}/50</div>
                  <div className="text-xs opacity-80">{formatDate(entry.date)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4">
          <PixelButton
            onClick={onStartNewGame}
            size="lg"
            className="w-48"
            ariaLabel="Start new game"
          >
            CHALLENGE THE LEADERBOARD
          </PixelButton>
          
          <PixelButton
            onClick={onReturnToMenu}
            variant="secondary"
            size="md"
            className="w-48"
            ariaLabel="Return to main menu"
          >
            MAIN MENU
          </PixelButton>
        </div>

        {/* Legend */}
        <div className="text-center text-xs text-retro-accent opacity-60">
          Complete all 50 states to earn your place in history!
        </div>

      </div>
    </div>
  )
}

export default LeaderboardScreen
