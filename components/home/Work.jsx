"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, Code } from "lucide-react"
import { useState } from "react"

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Projects",
      description: "Explore our innovative projects and case studies",
      bgColor: "bg-purple-600",
      gradientFrom: "from-purple-600",
      gradientTo: "to-indigo-700",
      route: "/projects",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Events",
      description: "Join our upcoming workshops and conferences",
      bgColor: "bg-fuchsia-500",
      gradientFrom: "from-fuchsia-500",
      gradientTo: "to-pink-600",
      route: "/events",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Guest Lectures",
      description: "Learn from industry experts and thought leaders",
      bgColor: "bg-green-500",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      route: "/guest-lectures",
    },
  ]

  return (
    <section id="achievements" className="max-w-6xl mx-auto relative overflow-hidden my-0 py-0">

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white text-center">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Work
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              href={feature.route}
              key={index}
              className="block group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`rounded-2xl border-2 border-indigo-900/40 p-8 backdrop-blur-sm 
                  transition-all duration-300 ease-in-out 
                  hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-900/30 
                  hover:translate-y-[-6px] cursor-pointer h-full relative overflow-hidden`}
                style={{
                  background:
                    hoveredIndex === index
                      ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                      : `rgba(30, 27, 75, 0.5)`,
                }}
              >
                {/* Background gradient that appears on hover */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} 
                    ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                  style={{ opacity: hoveredIndex === index ? 0.4 : 0 }}
                />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div
                      className={`rounded-2xl ${feature.bgColor} p-4 inline-flex items-center justify-center w-16 h-16 text-white
                      transition-transform duration-500 group-hover:scale-110`}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:gap-3 transition-all">
                    {feature.title}
                    <ArrowRight
                      className="h-4 w-4 opacity-0 -translate-x-4 transition-all duration-500 
                      group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

