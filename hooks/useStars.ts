import { useState, useEffect } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
}

export default function useStars(count: number): Star[] {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
    }))
    setStars(newStars)
  }, [count])

  return stars
}

