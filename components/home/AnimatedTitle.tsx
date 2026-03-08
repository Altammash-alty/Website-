"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import localFont from "next/font/local";

const myFont = localFont({ src: "../../app/font/EthnocentricRg.otf" })
// const myFont = localFont({ src: "../../app/font/good_timing/good timing bd.otf" })

export const AnimatedTitle = () => {
  const letters = "HERMETICA".split("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2500)
  }, [])

  return (
    <div className="z-30 flex justify-center max-md:py-6 max-md:-translate-y-6 overflow-hidden">
      {letters?.map((letter, index) => (
        <>
          {loading ? (
            <motion.span
              key={index}
              className={`inline-block font-bold text-[1.7rem] tracking-[0.5em] md:text-[6rem] text-white text-center ${myFont.className}`}
              initial={{ y: 0, textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}
              animate={{ y: [0, -10, 0], textShadow: ['0 0 15px rgba(255, 255, 255, 0.5)', '0 0 5px rgba(255, 255, 255, 0.3)'] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeatType: 'reverse',
                repeat: 500,
                delay: index / 5,
                textShadow: { duration: 1, ease: "easeInOut", repeat: 500, repeatType: 'reverse' },
              }}
            >
              {letter}
            </motion.span>
          ) : (
            <motion.span
              key={`${index}/${letter}`}
              className={`inline-block font-rubikIso font-bold text-[1.7rem] text-center md:text-[6rem] text-white ${myFont.className}`}
              initial={{ letterSpacing: "2.5em", opacity: 0, textShadow: '0 0 15px rgba(255, 255, 255, 0.7)' }}
              animate={{ letterSpacing: "0.5em", opacity: 1, textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
                y: { duration: 1, ease: "easeOut" },
                opacity: { duration: 1.5, ease: "easeOut", delay: 1 },
              }}
            >
              {letter}
            </motion.span>
          )}
        </>
      ))}
    </div>
  )
}

