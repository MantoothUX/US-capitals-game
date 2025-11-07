"use client"

import { forwardRef } from 'react'

interface PixelButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  selected?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(({
  children,
  onClick,
  disabled = false,
  selected = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
}, ref) => {
  const baseClasses = 'usa-btn usa-focus'
  
  const variantClasses = {
    primary: 'usa-btn-primary',
    secondary: '',  // Uses default American button style
    danger: 'usa-btn-error',
    success: 'usa-btn-success',
  }
  
  const sizeClasses = {
    sm: 'nes-text-8 px-3 py-2',
    md: 'nes-text-button px-5 py-3',
    lg: 'nes-text-button px-7 py-4',
  }
  
  const selectedClasses = selected ? 'usa-btn-selected' : ''

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    selectedClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={selected ? 0 : -1}
    >
      {children}
    </button>
  )
})

PixelButton.displayName = 'PixelButton'

export default PixelButton
