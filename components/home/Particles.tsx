"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Particle {
  id: number
  initialX: number
  initialY: number
  size: number
}

const Particles = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const ref = useRef<HTMLDivElement>(null)

  const springConfig = { damping: 15, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!ref.current) return

    const { width, height } = ref.current.getBoundingClientRect()
    const particlesCount = 100
    const newParticles = Array.from({ length: particlesCount }, (_, i) => ({
      id: i,
      initialX: Math.random() * width,
      initialY: Math.random() * height,
      size: Math.random() * 4 + 1,
    }))
    setParticles(newParticles)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <ParticleComponent key={particle.id} particle={particle} cursorX={cursorXSpring} cursorY={cursorYSpring} />
      ))}
    </div>
  )
}

interface ParticleComponentProps {
  particle: Particle
  cursorX: any
  cursorY: any
}

const ParticleComponent = ({ particle, cursorX, cursorY }: ParticleComponentProps) => {
  const x = useTransform(cursorX, (latest: any) => {
    const diff = latest - particle.initialX
    const distance = Math.abs(diff)
    const speed = distance * 0.05
    const direction = diff > 0 ? 1 : -1
    return particle.initialX + direction * Math.min(distance, speed)
  })

  const y = useTransform(cursorY, (latest: any) => {
    const diff = latest - particle.initialY
    const distance = Math.abs(diff)
    const speed = distance * 0.05
    const direction = diff > 0 ? 1 : -1
    return particle.initialY + direction * Math.min(distance, speed)
  })

  return (
    <motion.div
      className="absolute rounded-full bg-white opacity-50"
      style={{
        width: particle.size,
        height: particle.size,
        x,
        y,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 150,
      }}
    />
  )
}

export default Particles

