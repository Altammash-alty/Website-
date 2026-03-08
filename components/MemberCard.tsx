"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/card'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'
import { MemberType } from '@/data/Members'

const MemberCard = ({ member }: { member: MemberType }) => {

  return (
    <motion.div
      key={member?.id}
      className="group relative"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden rounded-3xl bg-[#f3e5ff]/10 border-none aspect-[3/4] max-sm:w-full max-h-[500px]">
        {/* Member Image */}
        <div className="absolute inset-0">
          <Image
            src={member?.image || ""}
            alt={member?.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Overlay with Member Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-b text-transparent bg-clip-text from-indigo-400 to-purple-400 mb-1">
              {member.name}
            </h3>
            <p className="text-white font-semibold mb-4">
              {member.position}
            </p>
            {member?.bio && (
              <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                {member?.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex gap-4">
              {member?.social?.instagram && (
                <a
                  href={member?.social?.instagram}
                  target="_blank"
                  className="text-white hover:text-[#E1306C] transition-colors"
                  aria-label={`instagram ${member.name}`}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {member?.social?.linkedin && (
                <a
                  href={member?.social?.linkedin}
                  target="_blank"
                  className="text-white hover:text-[#0077B5] transition-colors"
                  aria-label={`linkedin ${member?.name}`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Name Label (visible by default) */}
        <div className="absolute bottom-4 left-4 right-4 p-2 bg-gradient-to-b from-purple-700 to-indigo-700 backdrop-blur-sm rounded-full text-center group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-medium">
            {member?.name}
          </h3>
        </div>
      </Card>
    </motion.div>
  )
}

export default MemberCard
