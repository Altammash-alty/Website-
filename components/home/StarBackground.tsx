"use client"

import { useCallback, useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import useStars from "@/hooks/useStars"

export default function StarBackground() {
  const [starNumber, setStarNumber] = useState(50)
  useEffect(() => {
    setStarNumber(window.innerWidth > 600 ? 50 : 20)
  }, [])

  const stars = useStars(starNumber)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    controls.start((i) => {
      const star = stars[i]
      if (!star) return {}

      const dx = mousePosition.x - (star.x / 100) * window.innerWidth
      const dy = mousePosition.y - (star.y / 100) * window.innerHeight
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight)
      const force = (1 - distance / maxDistance) * 50

      return {
        x: star.x + (dx / distance) * force,
        y: star.y + (dy / distance) * force,
      }
    })
  }, [mousePosition, stars, controls])

  const renderStar = useCallback(
    (star: { id: number; x: number; y: number; size: number }, index: number) => {
      return (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          custom={index}
          animate={controls}
        >
          <svg
            width={star.size * 10}
            height={star.size * 10}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="white"
            />
          </svg>
        </motion.div>
      )
    },
    [controls],
  )

  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.3 }} className="max-md:hidden absolute inset-0 opacity-40 overflow-hidden">

    {stars.map((star, index) => renderStar(star, index))}
  </motion.div>
}

