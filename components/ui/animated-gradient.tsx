
"use client"

import { ReactNode } from "react"

export default function AnimatedGradientText({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-1 rounded-lg animate-border-gradient">
      <div className="p-8 rounded-lg">
        <h1 className="text-3xl md:text-5xl text-center inline-block font-bold animate-text-gradient bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
          {children}
        </h1>
      </div>
    </div>
  )
}

