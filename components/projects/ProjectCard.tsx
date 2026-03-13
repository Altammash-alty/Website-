"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'

const ProjectCard = ({ project, noHover = false }: { project: any, noHover?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={noHover ? {} : { y: -5 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className={`group relative overflow-hidden rounded-2xl border-white/5 bg-[#1a1c2e] ${noHover ? "" : "hover:bg-[#232642]"} transition-all duration-500 shadow-2xl flex flex-col h-full`}>
        <Link 
          href={
            project.projectId 
              ? (project.projectId.startsWith('dummy') || project.projectId.startsWith('research')) 
                ? "#" 
                : `/projects/${project.projectId}`
              : "#"
          } 
          className="flex flex-col h-full"
        >
          {/* Project Image */}
          <div className="relative aspect-[16/10] overflow-hidden w-full">
            <Image
              src={project.image || "https://img.freepik.com/free-vector/coming-soon-banner-with-focus-lights_1017-33739.jpg"}
              alt={project.name}
              fill
              className={`object-cover transition-all duration-700 ${noHover ? "" : "group-hover:scale-110 group-hover:opacity-30"}`}
            />

            {/* Hover Text Overlay */}
            {!noHover && (
              <div
                className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-90 group-hover:scale-100"
              >
                <p className="text-gray-200 text-xs md:text-sm text-center leading-relaxed font-light">
                  {project.description || "Click to view more details about this project/event."}
                </p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c2e] via-transparent to-transparent opacity-60" />
          </div>

          {/* Project Info */}
          <div className="p-5 flex flex-col gap-3 flex-grow bg-gradient-to-b from-[#1e1b4b]/20 to-[#1a1c2e]">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-gray-500 text-xs font-medium">
                (0)
              </span>
            </div>
            <h3 className={`text-gray-200 text-base md:text-lg font-semibold leading-tight ${noHover ? "" : "group-hover:text-indigo-400"} transition-colors duration-300 line-clamp-2`}>
              {project?.name}
            </h3>
          </div>

          {/* Hover Glow Effect */}
          {!noHover && (
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}
        </Link>
      </Card>
    </motion.div>
  )
}

export default ProjectCard

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
            }`}
        />
      ))}
    </div>
  )
}

