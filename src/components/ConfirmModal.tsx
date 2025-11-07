"use client"

import { useEffect } from 'react'
import PixelButton from './PixelButton'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'YES',
  cancelText = 'NO'
}: ConfirmModalProps) {
  
  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case 'y':
        case 'Y':
          onConfirm()
          break
        case 'Escape':
        case 'n':
        case 'N':
          onCancel()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, onConfirm, onCancel])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="pixel-panel bg-game-panel max-w-md w-full p-6 space-y-6">
        {/* Title */}
        <h2 className="text-retro-warning text-lg text-center font-bold">
          {title}
        </h2>
        
        {/* Message */}
        <p className="text-retro-text text-center leading-relaxed">
          {message}
        </p>
        
        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <PixelButton
            onClick={onCancel}
            variant="secondary"
            size="lg"
            ariaLabel={`${cancelText} (N key or Escape)`}
          >
            {cancelText}
          </PixelButton>
          
          <PixelButton
            onClick={onConfirm}
            variant="danger"
            size="lg"
            ariaLabel={`${confirmText} (Y key or Enter)`}
          >
            {confirmText}
          </PixelButton>
        </div>
        
        {/* Keyboard hints */}
        <div className="text-xs text-retro-accent text-center opacity-80">
          Press Y/Enter for {confirmText} • N/ESC for {cancelText}
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

