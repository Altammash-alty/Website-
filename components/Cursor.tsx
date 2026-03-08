"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Only show custom cursor on devices that have a precise pointer (mouse)
        const hasMouse = window.matchMedia("(pointer: fine)").matches;
        if (!hasMouse) {
            setIsHidden(true);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("button") ||
                target.closest("a") ||
                target.closest(".magnetic")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            <motion.div
                className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500/50 pointer-events-none z-[9999] mix-blend-screen overflow-hidden`}
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? "rgba(99, 102, 241, 0.1)" : "transparent",
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_10px_2px_rgba(99,102,241,0.8)]"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isHovered ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.1,
                }}
            />
        </>
    );
}
