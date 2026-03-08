"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden py-24">
      {/* Floating background elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-8"
            >
              <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hermetica</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                Established in 2014, Team Hermetica represents the Department of Chemical Engineering in NIMBUS, the annual technical fest of National Institute of Technology, Hamirpur.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg text-gray-400 leading-relaxed">
                We conceive new knowledge via innovative research and collaborative initiatives. Our mission is to inculcate the best knowledge in society, creating environment-friendly technologies and serving as a beacon of intellectual resources.
              </motion.p>
              <motion.div variants={itemVariants} className="pt-4">
                <Link href="/about">
                  <button className="magnetic px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all backdrop-blur-md">
                    Discover Our Vision
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="hidden lg:flex relative h-[300px] sm:h-[400px] md:h-[600px] items-center justify-center pointer-events-none mt-12 lg:mt-0"
            >
              {/* Abstract floating shapes imitating antigravity */}
              <motion.div
                animate={{ y: [-20, 20, -20], rotateZ: [0, 45, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.1)]"
              />
              <motion.div
                animate={{ y: [20, -20, 20], rotateZ: [45, 90, 45], scale: [1, 1.05, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-bl from-pink-500/30 to-indigo-500/30 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.1)]"
              />
              <motion.div
                animate={{ y: [-15, 25, -15], x: [-15, 15, -15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-r from-purple-500/30 to-indigo-400/30 backdrop-blur-xl border border-white/20 -right-2 top-0 sm:-right-4 sm:top-10 md:-right-10 md:top-20"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
