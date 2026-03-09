"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SecondaryBackground from '@/components/SecondaryBackground'
import hermeticaGallery from '@/data/json/Gallery.json'

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("previous_nimbus")
  const [filteredGallery, setFilteredGallery] = useState(hermeticaGallery.previous_nimbus)

  const tabs = [
    { id: "previous_nimbus", label: "Nimbus 2k25" },
    { id: "pre_nimbus", label: "Pre-Nimbus" },
    { id: "hermetica_day", label: "Hermetica Day" },
    { id: "dwsim", label: "COMSOL" },
    { id: "awareness", label: "Awareness" },
  ]

  return (
    <section className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/andromeda.png"
        imagePosition="top-left"
        particleColor="#ddd6fe"
        opacity={0.5}
      />

      {/* Filter Section */}
      <div className="container mx-auto px-4 mt-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilteredGallery((hermeticaGallery as any)[tab.id])
                  setActiveTab(tab.id)
                }}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-500 relative z-10 ${activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabGallery"
                    className="absolute inset-0 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {
        filteredGallery.length >= 1 ? (
          <div className="container mx-auto px-4 mb-24">
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
              {filteredGallery?.map((image: any) => (
                <motion.div
                  key={image}
                  className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] max-w-[400px] aspect-[5/3] bg-gray-600/20 rounded-2xl overflow-hidden'
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={image}
                    alt='gallery image'
                    width={500}
                    height={500}
                    priority
                    className='w-full h-full object-cover hover:scale-105 duration-500 transition-transform'
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center'>
            <h2 className='md:text-7xl text-4xl text-center mt-[30vh] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 inline-block via-purple-300 to-indigo-300'>
              Coming soon...
            </h2>
          </div>
        )
      }
    </section >
  )
}

export default GalleryPage
