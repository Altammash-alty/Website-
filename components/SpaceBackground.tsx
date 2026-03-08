'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const SpaceBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-600 to-black opacity-30" />
      <motion.div
        className="absolute inset-0 bg-repeat opacity-5"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
