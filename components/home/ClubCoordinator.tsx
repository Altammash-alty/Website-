"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const coordinators = [
  {
    id: 1,
    name: "Ajay Niol",
    position: "Club Co-ordinator",
    image: '/images/Third Yr/Ajay.jpg.jpeg',
    bio: "Chemical Engineering student passionate about innovative solutions. Leading team projects and organizing technical events.",
    instagram: "https://www.instagram.com/niol_ajay_45?igsh=eHR3YjV5ZDdobXZr",
    linkedin: "https://www.linkedin.com/in/ajay-kumar-644b72303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    id: 2,
    name: "Aviral Koundal",
    position: "Club Co-ordinator",
    image: '/images/Third Yr/Aviral.jpg.jpeg',
    bio: "Specializing in mentoring juniors to reach their full potential. Passionate about driving innovation in chemical engineering.",
    instagram: "https://www.instagram.com/_avi_hny_0099?igsh=MWZtdjg0dzVtOGo4dw%3D%3D",
    linkedin: ""
  },
];

export default function ClubCoordinator() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Coordinators</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Meet the visionaries leading Team Hermetica towards excellence in chemical engineering and tech innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {coordinators.map((coordinator) => (
            <motion.div
              key={coordinator.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-[400px] md:h-[500px] w-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] magnetic"
            >
              {/* Full Background Image */}
              <div className="absolute inset-0 z-0 bg-black">
                <Image
                  src={coordinator.image}
                  alt={coordinator.name}
                  fill
                  className="object-cover object-top transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:blur-[2px] opacity-90 group-hover:opacity-75"
                />
              </div>

              {/* Bottom Gradient for Text Legibility (made slightly higher for text contrast) */}
              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-multiply" />

              {/* Content Panel at Bottom */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
                {/* Title Box */}
                <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight drop-shadow-lg">
                    {coordinator.name}
                  </h3>
                  <p className="text-indigo-400 font-semibold text-sm sm:text-base drop-shadow-md">
                    {coordinator.position}
                  </p>
                </div>

                {/* Bio content - Grid trick for smooth height animation */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-gray-200 text-sm sm:text-base pt-4 leading-relaxed font-light mb-4">
                      {coordinator.bio}
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                      {coordinator.instagram && (
                        <a href={coordinator.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 hover:scale-110 transition-all">
                          <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                      {coordinator.linkedin && (
                        <a href={coordinator.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 hover:scale-110 transition-all">
                          <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/members">
            <button className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all backdrop-blur-md">
              Meet Our Full Team
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
