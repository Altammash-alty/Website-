import React from 'react'
import ResearchSection from './ResearchSection'
import SecondaryBackground from '@/components/SecondaryBackground'

const ResearchPage = async () => {
  return (
    <div className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/backgrounds/pulsar.png"
        imagePosition="center"
        particleColor="#22d3ee"
        opacity={0.6}
      />

      <ResearchSection />
    </div >
  )
}

export default ResearchPage
