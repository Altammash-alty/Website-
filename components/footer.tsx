"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/hermetica-logo.jpg";

const socialLinks = [
  { icon: Youtube, href: "https://youtube.com/@TeamHermetica", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/teamhermetica/", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/teamhermetica", label: "Instagram" },
];

const Team_Work = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "Events", link: "/events" },
  { name: "Team", link: "/members" },
  { name: "Gallery", link: "/gallery" },
  { name: "Guest Lectures", link: "/guest-lectures" },
  { name: "About Us", link: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <Link href="/" className="flex items-center gap-3 magnetic group inline-flex w-fit">
            <Image src={logo} alt="Hermetica Logo" width={40} height={40} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-300">Team Hermetica</span>
          </Link>
          <p className="text-gray-400 leading-relaxed font-light">
            Engineering Intelligence Beyond Gravity. Innovating and exploring the future of technology and research.
          </p>
        </div>

        {/* Team Work */}
        <div className="w-full md:w-auto flex flex-col gap-4">
          <h4 className="text-white font-semibold tracking-wider uppercase text-sm mb-2">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
            {Team_Work.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm font-medium magnetic inline-block py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Contact */}
        <div className="w-full md:w-auto flex flex-col gap-6 items-start md:items-end">
          <h4 className="text-white font-semibold tracking-wider uppercase text-sm">Connect With Us</h4>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300 magnetic group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-8">
            © {new Date().getFullYear()} Team Hermetica. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
