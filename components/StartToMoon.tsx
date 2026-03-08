"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const StarToMoonAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const [showMoon, setShowMoon] = useState(false)

  useEffect(() => {
    const moonTimer = setTimeout(() => {
      setShowMoon(true)
    }, 1500)

    const completionTimer = setTimeout(() => {
      onAnimationComplete()
    }, 2500)

    return () => {
      clearTimeout(moonTimer)
      clearTimeout(completionTimer)
    }
  }, [onAnimationComplete])

  const generateRandomPosition = () => {
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * 200 + 100 // Random distance between 100 and 300
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  const stars = Array.from({ length: 5 }, () => generateRandomPosition())

  return (
    <motion.div
      className="w-full h-screen bg-black flex items-center justify-center overflow-hidden absolute top-0 left-0 z-50"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!showMoon && (
        <>
          {stars.map((position, index) => (
            <Star key={index} initialX={position.x} initialY={position.y} />
          ))}
        </>
      )}
      {showMoon && <Moon />}
    </motion.div>
  )
}

const Star = ({ initialX, initialY }: { initialX: number; initialY: number }) => (
  <motion.svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    initial={{ x: initialX, y: initialY }}
    animate={{ x: 0, y: 0 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  >
    <motion.path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="yellow"
    />
  </motion.svg>
)

const Moon = () => (
  <motion.svg
    width="200"
    height="200"
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1, type: "spring" }}
  >
    <motion.path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
      fill="white"
    />
    <motion.circle cx="9" cy="9" r="2" fill="white" />
    <motion.circle cx="15" cy="9" r="2" fill="white" />
    <motion.path
      d="M12 14C13.1046 14 14 14.8954 14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14Z"
      fill="white"
    />
  </motion.svg>
)

export default StarToMoonAnimation

