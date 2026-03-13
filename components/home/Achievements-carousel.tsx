"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Code, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const achievements = [
  {
    image: "/images/Nimbus 2k25.jpeg",
    title: "Nimbus 2k25",
    description: "Runner-Up : Best Departmental Team in Nimbus",
  },
  {
    image: "/achievement-1.jpeg",
    title: "Nimbus 2k24",
    description: "Best Sustainable Team in Nimbus",
  },
  {
    image: "/achievement-2.jpeg",
    title: "Nimbus 2k23",
    description: "Best Event Execution Team",
  },
  {
    image: "/achievement-3.jpeg",
    title: "Nimbus 2k21",
    description: "Best Management Team",
  },
  {
    image: "/achievement-4.jpeg",
    title: "Nimbus 2k18",
    description: "Best Innovative Team",
  },
  {
    image: "/achievement-5.jpg",
    title: "Nimbus 2k17",
    description: "Best Event in Nimbus",
  },
  {
    image: "/acheivement-6.jpg",
    title: "Nimbus 2k16",
    description: "Best Innovative Team",
  },
];

const workItems = [
  {
    icon: Code,
    title: "Innovations",
    description: "Explore our innovative projects and case studies",
    gradient: "from-purple-600 to-indigo-700",
    color: "bg-purple-600",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    route: "/projects",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Join our upcoming workshops and conferences",
    gradient: "from-fuchsia-500 to-pink-600",
    color: "bg-fuchsia-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
    route: "/events",
  },
  {
    icon: BookOpen,
    title: "Guest Lectures",
    description: "Learn from industry experts and thought leaders",
    gradient: "from-emerald-500 to-teal-600",
    color: "bg-emerald-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    route: "/guest-lectures",
  },
];

function getIdx(i: number) {
  return ((i % achievements.length) + achievements.length) % achievements.length;
}

export function AchievementCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive constants
  const SLIDE_W = isMobile ? 85 : 62;
  const GAP = isMobile ? 1 : 2;
  const PEEK_W = (100 - SLIDE_W) / 2;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => getIdx(c - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => getIdx(c + 1));
  }, []);

  const prevIdx = getIdx(current - 1);
  const nextIdx = getIdx(current + 1);

  return (
    <section id="achievements" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full">

        {/* ── ACHIEVEMENTS HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Achievements
            </span>
          </h2>
        </motion.div>

        {/* ── PEEK CAROUSEL ── */}
        {/* Outer clips the overflow so prev/next peek in from the sides */}
        <div className="relative w-full overflow-hidden">
          {/* Track: fixed-height row containing all 3 slide images */}
          <div
            className="relative w-full flex items-stretch"
            style={{ aspectRatio: `${100 / SLIDE_W * 16} / 9` }}
          >
            {/* PREV image — starts off the left edge, same width */}
            <div
              className="absolute inset-y-0 cursor-pointer opacity-45 hover:opacity-55 transition-opacity"
              style={{ width: `${SLIDE_W}%`, left: `${PEEK_W - GAP - SLIDE_W}%` }}
              onClick={prev}
            >
              <div className="relative w-full h-full rounded-r-3xl overflow-hidden">
                <Image src={achievements[prevIdx].image} alt={achievements[prevIdx].title} fill className="object-cover" />
              </div>
            </div>

            {/* ACTIVE image — centered */}
            <div
              className="absolute inset-y-0"
              style={{ left: `${PEEK_W}%`, width: `${SLIDE_W}%` }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
                <AnimatePresence custom={direction} mode="popLayout">
                  <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? "6%" : "-6%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: direction > 0 ? "-6%" : "6%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={achievements[current].image} alt={achievements[current].title} fill className="object-cover" priority />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* NEXT image — starts after gap to the right of active */}
            <div
              className="absolute inset-y-0 cursor-pointer opacity-45 hover:opacity-55 transition-opacity"
              style={{ left: `${PEEK_W + SLIDE_W + GAP}%`, width: `${SLIDE_W}%` }}
              onClick={next}
            >
              <div className="relative w-full h-full rounded-l-3xl overflow-hidden">
                <Image src={achievements[nextIdx].image} alt={achievements[nextIdx].title} fill className="object-cover" />
              </div>
            </div>

            {/* AMBER NAV BUTTONS — centered in the visible peek side areas */}
            <button
              onClick={prev}
              className="absolute z-20 w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center text-black shadow-xl transition-all duration-200 hover:scale-110"
              style={{ left: `${(PEEK_W - GAP) / 2}%`, top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute z-20 w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center text-black shadow-xl transition-all duration-200 hover:scale-110"
              style={{ left: `${PEEK_W + SLIDE_W + GAP + (PEEK_W - GAP) / 2}%`, top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── INFO CARDS — use identical coordinate system as the images ── */}
        <div className={`relative mt-4 overflow-hidden ${isMobile ? 'h-28' : 'h-20'}`}>
          {/* Current card — left and width identical to the active image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cur-${current}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bg-indigo-950/70 backdrop-blur-md border border-indigo-500/20 rounded-2xl px-5 py-4"
              style={{ left: `${PEEK_W}%`, width: `${SLIDE_W}%` }}
            >
              <p className="text-pink-400 font-bold text-base mb-1">{achievements[current].title}</p>
              <p className="text-gray-300 text-sm">{achievements[current].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Next card — peeking from the right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`nxt-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bg-indigo-950/40 backdrop-blur-md border border-white/5 rounded-2xl px-5 py-4"
              style={{ left: `${PEEK_W + SLIDE_W + GAP}%`, width: `${SLIDE_W}%` }}
            >
              <p className="text-pink-300/80 font-bold text-base mb-1">&nbsp;</p>
              <p className="text-gray-400 text-sm">&nbsp;</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link href="/gallery">
            <button className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 mx-auto group">
              View Our Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        {/* ── OUR WORK ── */}
        <div className="mt-20 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Work
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workItems.map((item, i) => (
              <Link key={i} href={item.route} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative bg-[rgba(30,27,75,0.5)] border-2 border-indigo-900/40 rounded-2xl p-8 overflow-hidden cursor-pointer hover:border-indigo-700/60 hover:-translate-y-2 transition-all duration-300 ${item.glow}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                  <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left">
                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:gap-3 transition-all">
                      {item.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-400" />
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
