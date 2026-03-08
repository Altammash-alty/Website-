import React from 'react'
import ProjectSection from './projectSection'
import SecondaryBackground from '@/components/SecondaryBackground'

const ProjectPage = async () => {
  return (
    <div className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/backgrounds/pulsar.png"
        imagePosition="center"
        particleColor="#f87171"
        opacity={0.6}
      />

      {/* Filter Section */}
      <ProjectSection />
    </div >
  )
}

export default ProjectPage
