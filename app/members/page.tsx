"use client"

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import MemberCard from '@/components/MemberCard'
import SecondaryBackground from '@/components/SecondaryBackground'
import membersFinal from '@/data/json/Members_FinalYear.json'
import members3rd from '@/data/json/Members_3rdYear.json'
import members2nd from '@/data/json/Members_2ndYear.json'
import members1st from '@/data/json/Members_1stYear.json'

const MembersPage = () => {
  const [activeTab, setActiveTab] = useState("Final Year Member")

  // Function to padding/slice if needed
  const processMembers = (data: any[], position: string, needed: number) => {
    let list = [...data];
    if (list.length < needed) {
      const dummies = Array.from({ length: needed - list.length }).map((_, i) => ({
        id: 9000 + (position.length) + i,
        name: `${position.split(' ')[0]} ${list.length + i + 1}`,
        position: position,
        image: "https://img.freepik.com/free-vector/coming-soon-banner-with-focus-lights_1017-33739.jpg",
        social: { instagram: "", linkedin: "" }
      }));
      list = [...list, ...dummies];
    } else {
      list = list.slice(0, needed);
    }
    return list;
  };

  const finalYearProcessed = processMembers(membersFinal, "Final Year Member", 17);
  const thirdYearProcessed = processMembers(members3rd, "Coordinator", 12);
  const secondYearProcessed = processMembers(members2nd, "Executive Member", 17);
  const firstYearProcessed = processMembers(members1st, "Volunteer Member", 24);

  const [filteredMembers, setFilteredMembers] = useState(finalYearProcessed)

  const filterHandler = (position: string) => {
    if (position === "Final Year Member") setFilteredMembers(finalYearProcessed);
    else if (position === "Coordinator") setFilteredMembers(thirdYearProcessed);
    else if (position === "Executive Member") setFilteredMembers(secondYearProcessed);
    else if (position === "Volunteer Member") setFilteredMembers(firstYearProcessed);

    setActiveTab(position)
  }

  return (
    <section className="min-h-screen relative overflow-hidden animate-appear">
      <SecondaryBackground
        imageSrc="/backgrounds/solar_system.png"
        imagePosition="bottom-left"
        particleColor="#fbbf24"
        opacity={0.7}
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
            {[
              { id: "Final Year Member", label: "Final Year" },
              { id: "Coordinator", label: "3rd Year" },
              { id: "Executive Member", label: "2nd Year" },
              { id: "Volunteer Member", label: "1st Year" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => filterHandler(tab.id)}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-colors duration-500 relative z-10 ${activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabMembers"
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

      {/* Members List */}
      <div className="container mx-auto px-4 mb-24">
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {filteredMembers.map((member) => (
            <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]">
              <MemberCard member={member as any} />
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default MembersPage
