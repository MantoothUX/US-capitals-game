"use client"

import { useEffect, useCallback, useRef } from 'react'

export type SoundEffect = 
  | 'button-click'
  | 'correct-answer' 
  | 'wrong-answer'
  | 'level-complete'
  | 'game-over'
  | 'game-complete'
  | 'menu-select'
  | 'timer-warning'

interface AudioContextType {
  context: AudioContext | null
  initialized: boolean
}

export function useAudio(enabled: boolean = true) {
  const audioContext = useRef<AudioContextType>({ context: null, initialized: false })
  const soundCache = useRef<Map<SoundEffect, AudioBuffer>>(new Map())

  // Initialize audio context (must be done after user interaction)
  const initAudio = useCallback(async () => {
    if (audioContext.current.initialized) return true

    try {
      const context = new AudioContext()
      audioContext.current = { context, initialized: true }
      return true
    } catch (error) {
      console.warn('Audio not supported:', error)
      return false
    }
  }, [])

  // Generate 8-bit style tones programmatically
  const generateTone = useCallback(async (
    frequency: number,
    duration: number,
    type: OscillatorType = 'square',
    volume: number = 0.3
  ): Promise<AudioBuffer | null> => {
    if (!audioContext.current.context) return null

    const context = audioContext.current.context
    const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const time = i / context.sampleRate
      let sample = 0

      switch (type) {
        case 'square':
          sample = Math.sin(2 * Math.PI * frequency * time) > 0 ? 1 : -1
          break
        case 'sawtooth':
          sample = 2 * ((frequency * time) % 1) - 1
          break
        case 'triangle':
          const t = (frequency * time) % 1
          sample = t < 0.5 ? 4 * t - 1 : 3 - 4 * t
          break
        default:
          sample = Math.sin(2 * Math.PI * frequency * time)
      }

      data[i] = sample * volume * (1 - time / duration) // Add fade out
    }

    return buffer
  }, [])

  // Generate specific sound effects
  const generateSoundEffect = useCallback(async (effect: SoundEffect): Promise<AudioBuffer | null> => {
    switch (effect) {
      case 'button-click':
        return generateTone(800, 0.1, 'square', 0.2)
      
      case 'correct-answer':
        // Happy ascending notes
        const context = audioContext.current.context
        if (!context) return null
        
        const buffer = context.createBuffer(1, context.sampleRate * 0.8, context.sampleRate)
        const data = buffer.getChannelData(0)
        
        const notes = [523, 659, 784, 1047] // C, E, G, C (major chord progression)
        const noteDuration = 0.2
        
        for (let i = 0; i < data.length; i++) {
          const time = i / context.sampleRate
          const noteIndex = Math.floor(time / noteDuration)
          const noteTime = time % noteDuration
          
          if (noteIndex < notes.length) {
            const frequency = notes[noteIndex]
            const sample = Math.sin(2 * Math.PI * frequency * noteTime) > 0 ? 1 : -1
            data[i] = sample * 0.3 * (1 - noteTime / noteDuration)
          }
        }
        
        return buffer
      
      case 'wrong-answer':
        // Descending "wah wah" sound
        return generateTone(200, 0.5, 'sawtooth', 0.4)
      
      case 'level-complete':
        return generateTone(659, 0.3, 'square', 0.3)
      
      case 'game-over':
        // Dramatic descending tones
        const gameOverBuffer = audioContext.current.context?.createBuffer(1, audioContext.current.context.sampleRate * 1.5, audioContext.current.context.sampleRate)
        if (!gameOverBuffer || !audioContext.current.context) return null
        
        const gameOverData = gameOverBuffer.getChannelData(0)
        const frequencies = [440, 370, 330, 277, 220] // Descending dramatic notes
        
        for (let i = 0; i < gameOverData.length; i++) {
          const time = i / audioContext.current.context.sampleRate
          const noteIndex = Math.floor(time / 0.3)
          const noteTime = time % 0.3
          
          if (noteIndex < frequencies.length) {
            const frequency = frequencies[noteIndex]
            const sample = Math.sin(2 * Math.PI * frequency * noteTime) > 0 ? 1 : -1
            gameOverData[i] = sample * 0.4 * (1 - noteTime / 0.3)
          }
        }
        
        return gameOverBuffer
      
      case 'game-complete':
        // Victory fanfare
        return generateTone(1047, 1.0, 'square', 0.5)
      
      case 'menu-select':
        return generateTone(600, 0.1, 'square', 0.2)
      
      case 'timer-warning':
        return generateTone(1000, 0.1, 'triangle', 0.3)
      
      default:
        return generateTone(440, 0.1, 'square', 0.2)
    }
  }, [generateTone])

  // Cache sound effects
  useEffect(() => {
    const cacheAllSounds = async () => {
      if (!audioContext.current.initialized) return

      const effects: SoundEffect[] = [
        'button-click', 'correct-answer', 'wrong-answer', 'level-complete',
        'game-over', 'game-complete', 'menu-select', 'timer-warning'
      ]

      for (const effect of effects) {
        if (!soundCache.current.has(effect)) {
          const buffer = await generateSoundEffect(effect)
          if (buffer) {
            soundCache.current.set(effect, buffer)
          }
        }
      }
    }

    cacheAllSounds()
  }, [audioContext.current.initialized, generateSoundEffect])

  // Play sound effect (only if audio is enabled)
  const playSound = useCallback(async (effect: SoundEffect) => {
    // Check if audio is enabled before playing
    if (!enabled) return
    
    if (!audioContext.current.context) {
      // Try to initialize on first use
      await initAudio()
      if (!audioContext.current.context) return
    }

    let buffer = soundCache.current.get(effect)
    
    if (!buffer) {
      // Generate on demand if not cached
      buffer = await generateSoundEffect(effect)
      if (!buffer) return
      soundCache.current.set(effect, buffer)
    }

    const source = audioContext.current.context.createBufferSource()
    const gainNode = audioContext.current.context.createGain()
    
    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(audioContext.current.context.destination)
    
    // Set volume
    gainNode.gain.value = 0.5
    
    source.start()
  }, [enabled, generateSoundEffect, initAudio])

  // Initialize audio on first user interaction
  const handleUserInteraction = useCallback(async () => {
    await initAudio()
  }, [initAudio])

  return {
    playSound,
    initAudio,
    handleUserInteraction,
    isAudioSupported: () => audioContext.current.initialized,
  }
}

