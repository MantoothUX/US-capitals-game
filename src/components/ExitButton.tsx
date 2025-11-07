"use client"

import PixelButton from './PixelButton'

interface ExitButtonProps {
  onExit: () => void
  className?: string
}

export function ExitButton({ onExit, className = '' }: ExitButtonProps) {
  return (
    <PixelButton
      onClick={onExit}
      variant="danger"
      size="sm"
      className={`absolute top-4 right-4 ${className}`}
      ariaLabel="Exit game (ESC key)"
    >
      ✕
    </PixelButton>
  )
}

export default ExitButton

