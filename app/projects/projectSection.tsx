"use client"

import ProjectGrid from '@/components/projects/project-grid'
import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import projects2026Raw from '@/data/json/Projects_2026.json'
import projects2025Raw from '@/data/json/Projects_2025.json'
import projects2024Raw from '@/data/json/Projects_2024.json'

const ProjectSection = () => {
  // Function to pad projects with dummies
  const processProjects = (data: any[], year: string, count: number) => {
    const list = [...data];
    const dummyCount = Math.max(0, count - list.length);
    const dummies = Array.from({ length: dummyCount }).map((_, i) => ({
      projectId: `dummy-${year}-${list.length + i}`,
      name: (i === 0 && list.length === 0 && year === "2024") // unlikely if we have json, but for safety
        ? "Cementitious Material from Agro-waste and Fly Ash"
        : `Innovative ${year} Project ${list.length + i + 1}`,
      year: year,
      image: "https://img.freepik.com/free-vector/coming-soon-banner-with-focus-lights_1017-33739.jpg"
    }));
    return [...list, ...dummies];
  };

  const projects2026 = processProjects(projects2026Raw, "2026", 5);
  const projects2025 = processProjects(projects2025Raw, "2025", 5);
  const projects2024 = processProjects(projects2024Raw, "2024", 8);

  const [activeYear, setActiveYear] = useState("2026");
  const [filteredProjects, setFilteredProjects] = useState(projects2026);

  const filterHandler = (year: string) => {
    setActiveYear(year);
    if (year === "2026") setFilteredProjects(projects2026);
    else if (year === "2025") setFilteredProjects(projects2025);
    else if (year === "2024") setFilteredProjects(projects2024);
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
                    layoutId="activeTabProjects"
                    className="absolute inset-0 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">2k{year.slice(2)}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Search Section */}
      < div className="container mx-auto px-4" >
        <ProjectGrid filteredProjects={filteredProjects} />
      </div >
    </>
  )
}

export default ProjectSection
