"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

interface ParticleEffectProps {
  trigger: boolean
  x?: number
  y?: number
  particleCount?: number
  colors?: string[]
  spread?: number
  gravity?: number
  duration?: number
}

export default function ParticleEffect({
  trigger,
  x,
  y,
  particleCount = 30,
  colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA500'],
  spread = 200,
  gravity = 0.3,
  duration = 1500
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    const centerX = x ?? canvas.width / 2
    const centerY = y ?? canvas.height / 2
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * spread / 10,
      vy: (Math.random() - 0.7) * spread / 10,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4
    }))

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        if (particle.life <= 0) return

        // Update particle
        particle.vy += gravity
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.02

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.life
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        
        // Draw star shape
        const spikes = 5
        const outerRadius = particle.size
        const innerRadius = particle.size / 2
        
        ctx.beginPath()
        ctx.translate(particle.x, particle.y)
        ctx.moveTo(0, -outerRadius)
        
        for (let i = 0; i < spikes; i++) {
          ctx.rotate(Math.PI / spikes)
          ctx.lineTo(0, -innerRadius)
          ctx.rotate(Math.PI / spikes)
          ctx.lineTo(0, -outerRadius)
        }
        
        ctx.fill()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [trigger, x, y, particleCount, colors, spread, gravity, duration])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
