"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import logo from "../public/hermetica-logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const toggleNavbar = () => setIsOpen(!isOpen);

  const links = [
    { link: "/", name: "Home" },
    { link: "/projects", name: "Projects" },
    { link: "/events", name: "Events" },
    { link: "/members", name: "Team" },
    { link: "/gallery", name: "Gallery" },
    { link: "/guest-lectures", name: "Guest Lectures" },
    { link: "/about", name: "About Us" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2" : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 magnetic group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Image src={logo} alt="Hermetica Logo" width={40} height={40} className="w-10 h-10 rounded-full" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">Team Hermetica</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group magnetic"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleNavbar}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex flex-col justify-center items-center gap-1.5 magnetic"
            >
              <motion.div animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-[2px] bg-white transition-all transform origin-center" />
              <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[2px] bg-white transition-all" />
              <motion.div animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-[2px] bg-white transition-all transform origin-center" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/60 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {links.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={item.link} onClick={toggleNavbar} className="text-3xl font-medium text-white hover:text-indigo-400 magnetic">
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
