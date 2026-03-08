"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center z-20">

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto pointer-events-none">
        {/* Typewriter Tagline - appears after HERMETICA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-6 min-h-[4rem] md:min-h-0 md:h-12 flex items-end justify-center text-lg sm:text-2xl md:text-3xl lg:text-4xl text-indigo-400 font-mono tracking-widest uppercase font-semibold text-shadow-glow font-sanford"
        >
          <TypeAnimation
            sequence={[
              2000,
              "We react to what matters!",
            ]}
            wrapper="span"
            speed={45}
            cursor={true}
            repeat={0}
            className="magnetic"
          />
        </motion.div>

        {/* Main Hero Title - HERMETICA eases in first */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)", y: 30 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 1.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 pb-4 pr-1 sm:pr-2 md:pr-4 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] magnetic leading-none"
        >
          HERMETICA
        </motion.h1>

        {/* Tagline / About line - synced after typewriter kicks in */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-sm md:text-base text-gray-400 font-light tracking-wide mt-6 max-w-3xl leading-relaxed"
        >
          Team Hermetica, established in 2014, represents the Department of Chemical Engineering in the annual tech-fest NIMBUS at National Institute of Technology, Hamirpur.
        </motion.p>


      </div>
    </section>
  );
};

export default HeroSection;
