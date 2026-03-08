"use client"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import React from 'react'
import { Events } from '@/data/Events'
import ProjectCard from '@/components/projects/ProjectCard'
import SecondaryBackground from '@/components/SecondaryBackground'

const EventsPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/backgrounds/star_cluster.png"
        imagePosition="bottom-right"
        particleColor="#93c5fd"
        opacity={0.8}
      />

      {/* Search Section */}
      {/* Events Grid Section */}
      <div className="container mx-auto px-4 py-16 mt-12 relative z-20">
        <div className="flex flex-wrap justify-center gap-8">
          {Events.map((events) => (
            <div key={events.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[350px]">
              <ProjectCard project={events} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsPage
