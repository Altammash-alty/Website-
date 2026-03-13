"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Globe, Palette, Video, FlaskConical, Brush } from "lucide-react";
import Link from "next/link";

const domains = [
  {
    title: "AI / ML",
    icon: BrainCircuit,
    description: "Pioneering the future with neural networks, intelligent systems, and cutting-edge machine learning.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGlow: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    link: "/projects"
  },
  {
    title: "Web Development",
    icon: Globe,
    description: "Crafting robust, scalable, and visually stunning web applications and digital experiences.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    borderGlow: "group-hover:border-indigo-400/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
    link: "/projects"
  },
  {
    title: "Graphic Designing",
    icon: Palette,
    description: "Creating impactful visual identities, branding materials, and aesthetic digital assets.",
    gradient: "from-pink-500/20 to-rose-500/20",
    borderGlow: "group-hover:border-pink-400/50 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
    link: "/gallery"
  },
  {
    title: "Video Editing",
    icon: Video,
    description: "Producing compelling video content, motion graphics, and multimedia storytelling.",
    gradient: "from-orange-500/20 to-red-500/20",
    borderGlow: "group-hover:border-orange-400/50 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    link: "/gallery"
  },
  {
    title: "CarX",
    icon: Brush,
    description: "Designing and engineering high-performance automotive models with a focus on aerodynamics and efficiency.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    borderGlow: "group-hover:border-yellow-400/50 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]",
    link: "/projects"
  },
  {
    title: "Research",
    icon: FlaskConical,
    description: "Driving innovation through rigorous academic investigation and applied chemical engineering research.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "group-hover:border-emerald-400/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    link: "/research"
  }
];

export default function DomainsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="domains" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Domains</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Discover the diverse fields of technology and research where Team Hermetica pushes the boundaries of innovation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-6"
          >
            {domains.map((domain) => (
              <Link
                href={domain.link}
                key={domain.title}
                className="w-full md:w-[calc(50%_-_12px)] lg:w-[calc(33.33%_-_16px)] flex"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative rounded-3xl p-6 sm:p-8 bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer ${domain.borderGlow} transition-all duration-500 w-full flex flex-col`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <domain.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                      {domain.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                      {domain.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
