"use client"

import ProjectGrid from '@/components/projects/project-grid'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import research2026Raw from '@/data/json/Research_2026.json'
import research2025Raw from '@/data/json/Research_2025.json'
import research2024Raw from '@/data/json/Research_2024.json'

const ResearchSection = () => {
  const [activeYear, setActiveYear] = useState("2026");
  const [filteredProjects, setFilteredProjects] = useState(research2026Raw);

  const filterHandler = (year: string) => {
    setActiveYear(year);
    if (year === "2026") setFilteredProjects(research2026Raw);
    else if (year === "2025") setFilteredProjects(research2025Raw);
    else if (year === "2024") setFilteredProjects(research2024Raw);
  }

  return (
    <>
      <div className="container mx-auto px-4 mt-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Research Papers</h1>
          <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full relative">
            {["2026", "2025", "2024"].map((year) => (
              <button
                key={year}
                onClick={() => filterHandler(year)}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-500 relative z-10 ${activeYear === year
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {activeYear === year && (
                  <motion.div
                    layoutId="activeTabResearch"
                    className="absolute inset-0 bg-cyan-600 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">2k{year.slice(2)}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 pb-24" >
        <ProjectGrid filteredProjects={filteredProjects} />
      </div >
    </>
  )
}

export default ResearchSection
