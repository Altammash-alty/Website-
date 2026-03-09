"use client"
import React from 'react'
import GuestLectures from '@/data/json/GuestLectures.json'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Star } from 'lucide-react'
import SecondaryBackground from '@/components/SecondaryBackground'

const GuestLecturesPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/gargantua.png"
        imagePosition="bottom-right"
        particleColor="#a855f7"
        opacity={0.6}
      />

      {/* Guest Lectures List */}
      <div className="container mx-auto px-4 mt-24 mb-24">
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {GuestLectures.map((lecture) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[350px]"
            >
              <Card className="relative overflow-hidden rounded-2xl border-white/5 bg-[#1a1c2e] transition-all duration-500 shadow-2xl flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden w-full">
                  <Image
                    src={lecture.image}
                    alt={lecture.name}
                    fill
                    className="object-cover transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c2e] via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-3 flex-grow bg-gradient-to-b from-[#1e1b4b]/20 to-[#1a1c2e]">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} />
                    <span className="text-gray-500 text-xs font-medium">(0)</span>
                  </div>
                  <h3 className="text-gray-200 text-base md:text-lg font-semibold leading-tight transition-colors duration-300 line-clamp-2">
                    {lecture.name}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default GuestLecturesPage

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
        />
      ))}
    </div>
  )
}

