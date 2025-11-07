"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
  size: number
}

interface Firework {
  x: number
  y: number
  targetY: number
  vx: number
  vy: number
  trail: Array<{x: number, y: number, alpha: number}>
  exploded: boolean
  particles: Particle[]
}

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const fireworksRef = useRef<Firework[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Firework colors - patriotic theme
    const colors = [
      '#FF0000', // Red
      '#FFFFFF', // White  
      '#0000FF', // Blue
      '#FFD700', // Gold
      '#FF69B4', // Pink (for variety)
      '#00FFFF', // Cyan (for variety)
    ]
    
    // Gravity and friction constants
    const GRAVITY = 0.15
    const FRICTION = 0.98
    const PARTICLE_COUNT = 50
    
    // Create a new firework
    const createFirework = () => {
      const x = Math.random() * canvas.width
      const targetY = canvas.height * 0.2 + Math.random() * canvas.height * 0.3 // Explode in upper portion
      
      return {
        x,
        y: canvas.height,
        targetY,
        vx: (Math.random() - 0.5) * 2, // Slight horizontal movement
        vy: -Math.sqrt(2 * GRAVITY * (canvas.height - targetY)) * 1.1, // Physics calculation for launch velocity
        trail: [],
        exploded: false,
        particles: []
      }
    }
    
    // Create explosion particles
    const explodeFirework = (firework: Firework) => {
      const baseColor = colors[Math.floor(Math.random() * colors.length)]
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5
        const velocity = 2 + Math.random() * 4
        
        // Some particles use the base color, others use random colors for variety
        const particleColor = Math.random() > 0.3 ? baseColor : colors[Math.floor(Math.random() * colors.length)]
        
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: particleColor,
          size: Math.random() * 3 + 1
        })
      }
      
      // Add extra sparkle particles
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = Math.random() * 6
        
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: '#FFFFFF',
          size: Math.random() * 2
        })
      }
      
      firework.exploded = true
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw fireworks
      fireworksRef.current = fireworksRef.current.filter(firework => {
        if (!firework.exploded) {
          // Update launch phase
          firework.vy += GRAVITY
          firework.x += firework.vx
          firework.y += firework.vy
          
          // Add to trail
          firework.trail.push({
            x: firework.x,
            y: firework.y,
            alpha: 1
          })
          
          // Limit trail length
          if (firework.trail.length > 20) {
            firework.trail.shift()
          }
          
          // Update trail alpha
          firework.trail.forEach((point, index) => {
            point.alpha = index / firework.trail.length
          })
          
          // Draw trail
          ctx.save()
          firework.trail.forEach((point, index) => {
            ctx.globalAlpha = point.alpha * 0.5
            ctx.fillStyle = '#FFD700'
            ctx.shadowBlur = 10
            ctx.shadowColor = '#FFD700'
            ctx.beginPath()
            ctx.arc(point.x, point.y, 2 - index * 0.05, 0, Math.PI * 2)
            ctx.fill()
          })
          ctx.restore()
          
          // Draw main firework
          ctx.save()
          ctx.fillStyle = '#FFF'
          ctx.shadowBlur = 20
          ctx.shadowColor = '#FFD700'
          ctx.beginPath()
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
          
          // Check if reached target height or started falling
          if (firework.y <= firework.targetY || firework.vy >= 0) {
            explodeFirework(firework)
          }
          
          return true
        } else {
          // Update explosion particles
          let hasVisibleParticles = false
          
          firework.particles.forEach(particle => {
            // Apply physics
            particle.vy += GRAVITY * 0.5
            particle.vx *= FRICTION
            particle.vy *= FRICTION
            particle.x += particle.vx
            particle.y += particle.vy
            particle.alpha -= 0.01
            
            if (particle.alpha > 0) {
              hasVisibleParticles = true
              
              // Draw particle with glow effect
              ctx.save()
              ctx.globalAlpha = particle.alpha
              ctx.fillStyle = particle.color
              ctx.shadowBlur = 10
              ctx.shadowColor = particle.color
              
              // Draw the particle
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
              ctx.fill()
              
              // Add extra sparkle for white particles
              if (particle.color === '#FFFFFF') {
                ctx.shadowBlur = 20
                ctx.globalAlpha = particle.alpha * 0.5
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
                ctx.fill()
              }
              
              ctx.restore()
            }
          })
          
          return hasVisibleParticles
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Launch fireworks at intervals
    const launchInterval = setInterval(() => {
      if (fireworksRef.current.length < 5) { // Max 5 fireworks at once
        fireworksRef.current.push(createFirework())
      }
    }, 1000)
    
    // Launch initial firework immediately
    fireworksRef.current.push(createFirework())
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      clearInterval(launchInterval)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default FireworksCanvas
