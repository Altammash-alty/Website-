"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const AnimatedCircle = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 600 ? true : false)
    setIsMounted(true)
  }, [])

  return (
    <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none duration-1000`}>

      <motion.div
        className={`md:hidden w-[220vw] aspect-square border-[3px] rounded-full absolute z-10 -left-[60vw] bottom-[calc(50%)] origin-bottom border-transparent`}
        initial={{ scaleY: isMobile ? 2 : 1, scaleX: isMobile ? 2 : 1, translateY: 400, opacity: 0 }}
        animate={{ scaleY: isMounted ? 0.4 : 1.2, scaleX: isMounted ? 0.4 : 1.2, translateY: 180, opacity: 80 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        style={{
          borderColor: "#5D3FD3",
          boxShadow: `
            0 0 10px #5D3FD3,
            0 0 90px #5D3FD3,
            inset 0 0 10px #5D3FD3,
            inset 0 0 200px #5D3FD3
          `,
          background: "linear-gradient(180deg, rgba(79, 70, 229, 0.6) 0%, rgba(79, 70, 229, 0) 100%)",
        }}
      />

      <motion.div
        className={`max-md:hidden w-[120vw] aspect-square border-[3px] rounded-full absolute z-10 -left-[10vw] bottom-[calc(50%)] origin-bottom border-transparent`}
        initial={{ scaleY: isMobile ? 2 : 1, scaleX: isMobile ? 2 : 1, translateY: 200, opacity: 0 }}
        animate={{ scaleY: isMounted ? 0.68 : 1.2, scaleX: isMounted ? 0.68 : 1.2, translateY: 180, opacity: 80 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        style={{
          borderColor: "#5D3FD3",
          boxShadow: `
            0 0 10px #5D3FD3,
            0 0 90px #5D3FD3,
            inset 0 0 10px #5D3FD3,
            inset 0 0 200px #5D3FD3
          `,
          background: "linear-gradient(180deg, rgba(79, 70, 229, 0.6) 0%, rgba(79, 70, 229, 0) 100%)",
        }}
      />

      {/* Circle hide animation black */}
      <motion.div
        className={`max-md:hidden w-[200vw] bg-black aspect-square border-[3px] rounded-full absolute z-30 -left-[50vw] bottom-[calc(50%)] origin-bottom border-transparent`}
        initial={{ scaleY: 1.1, scaleX: 1.2, translateY: 200, opacity: 1 }}
        animate={{ scaleY: isMounted ? 1 : 1.2, scaleX: isMounted ? 1 : 1.2, translateY: -500, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          boxShadow: `
            0 0 10px #111111,
            0 0 100px #111111,
            0 0 100px #111111,
            inset 0 0 10px #5D3FD3,
            inset 0 0 100px #5D3FD3,
          `,
        }}
      />
      <motion.div
        className={`max-md:hidden w-[100vw] aspect-square border-[3px] rounded-full absolute left-0 bottom-1/2 origin-bottom overflow-hidden`}
        initial={{ scaleY: isMobile ? 2 : 1.2, scaleX: isMobile ? 2 : 1.2, translateY: 200 }}
        animate={{ scaleY: isMounted ? 0.9 : 1.2, scaleX: isMounted ? 0.9 : 1.2, translateY: 180 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        style={{
          borderColor: "#5D3FD3",
          boxShadow: `
            0 0 10px #5D3FD3,
            0 0 20px #4F46E5,
            inset 0 0 10px #ffffff,
          `,
          background: "linear-gradient(180deg, rgba(79, 70, 229, 0.6) 0%, rgba(79, 70, 229, 0) 100%)",
        }}
      >
        <motion.div
          className="max-md:hidden w-[40vw] aspect-square border-[3px] rounded-full absolute max-md:mt-16 md:bottom-0 left-[calc(50%-20vw)] bg-gradient-to-b from-transparent via-transparent to-white origin-center"
          initial={{ scaleY: 3, scaleX: 3, translateY: 300 }}
          animate={{ scaleY: isMounted ? 0.9 : 3, scaleX: isMounted ? 0.9 : 3, translateY: 200 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
          style={{
            borderColor: "#5D3FD3",
            boxShadow: `
            0 0 10px #5D3FD3,
            0 0 20px #4F46E5,
            0 -50px 200px #4F46E5,
            inset 0 0 10px #5D3FD3,
            inset 0 0 120px #4F46E5,
            inset 0 0 100px #5D3FD3
          `,
          }}
        />
      </motion.div>

    </div >
  )
}

