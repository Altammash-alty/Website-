"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import Image from "next/image";

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 4000;

    const [positions, originalPositions, scales] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            originalPositions[i * 3] = positions[i * 3];
            originalPositions[i * 3 + 1] = positions[i * 3 + 1];
            originalPositions[i * 3 + 2] = positions[i * 3 + 2];

            scales[i] = Math.random();
        }
        return [positions, originalPositions, scales];
    }, [count]);

    const { viewport } = useThree();

    // Create a circular texture for round particles
    const circleTexture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.arc(32, 32, 28, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    // Track mouse globally since the canvas pointer-events are disabled
    const mouse = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });
    const hasMoved = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!hasMoved.current) {
                // Initialize current mouse exactly where first interaction is to prevent jump
                mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
                hasMoved.current = true;
            }
            targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Base slow rotation for the entire field
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;

        // Smooth cursor interpolation, back to fast tracking
        mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.1;
        mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.1;

        // Calculate mouse pos in world space relative to the camera
        if (hasMoved.current) {
            const mouseX = (mouse.current.x * viewport.width) / 2;
            const mouseY = (mouse.current.y * viewport.height) / 2;
            const mouseVector = new THREE.Vector3(mouseX, mouseY, 0);

            // Convert mouse world coordinate to the local coordinate system of the rotated points
            pointsRef.current.worldToLocal(mouseVector);

            const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const oX = originalPositions[i3];
                const oY = originalPositions[i3 + 1];
                const oZ = originalPositions[i3 + 2];

                const dx = oX - mouseVector.x || 0.001;
                const dy = oY - mouseVector.y || 0.001;
                const dz = oZ - mouseVector.z || 0.001;

                // 2D distance calculation (assuming depth z doesn't heavily affect mouse intersection)
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                const maxDist = 2.5; // Radius of influence

                if (dist < maxDist) {
                    // Wave effect: Particles are pushed away, creating a ring around the cursor
                    const force = (maxDist - dist) / maxDist; // 0 to 1
                    const repelFactor = force * 0.8; // Decreased from 1.8 to scatter softly

                    // Add some sinusoidal jitter to make it look like "entropy" / "waves"
                    const waveX = Math.sin(state.clock.getElapsedTime() * 2 + oY) * 0.1; // Slower wave formula
                    const waveY = Math.cos(state.clock.getElapsedTime() * 2 + oX) * 0.1;

                    positionsArray[i3] = oX + (dx / dist) * repelFactor + waveX;
                    positionsArray[i3 + 1] = oY + (dy / dist) * repelFactor + waveY;
                    positionsArray[i3 + 2] = oZ + (Math.sin(force * Math.PI)) * repelFactor;
                } else {
                    // Smoothly return to their original position when mouse leaves
                    positionsArray[i3] += (oX - positionsArray[i3]) * 0.1;
                    positionsArray[i3 + 1] += (oY - positionsArray[i3 + 1]) * 0.1;
                    positionsArray[i3 + 2] += (oZ - positionsArray[i3 + 2]) * 0.1;
                }
            }
        } else {
            const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
            // If hasn't moved yet, smoothly ease back any offset points to original (just floating slowly with the rotation)
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positionsArray[i3] += (originalPositions[i3] - positionsArray[i3]) * 0.1;
                positionsArray[i3 + 1] += (originalPositions[i3 + 1] - positionsArray[i3 + 1]) * 0.1;
                positionsArray[i3 + 2] += (originalPositions[i3 + 2] - positionsArray[i3 + 2]) * 0.1;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    args={[scales, 1]}
                    count={count}
                    array={scales}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#c4b5fd"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
                alphaMap={circleTexture}
                alphaTest={0.01}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
            {/* Dark realistic galaxy space background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black opacity-90 z-0" />

            {/* Andromeda Galaxy (Smaller, Top Left) */}
            <motion.div
                className="absolute top-[5%] left-[-10%] sm:top-[10%] sm:left-[5%] w-[50vw] h-[50vw] sm:w-[35vw] sm:h-[35vw] max-w-[500px] max-h-[500px] opacity-65 mix-blend-screen z-0"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                }}
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ duration: 400, repeat: Infinity, ease: "linear" }}
            >
                <Image src="/andromeda.png" alt="Andromeda" fill className="object-contain filter blur-[1px]" />
            </motion.div>

            {/* Gargantua Black Hole (Larger, Bottom Right) */}
            <motion.div
                className="absolute bottom-[-5%] right-[-5%] sm:bottom-[-10%] sm:right-[-10%] w-[85vw] h-[85vw] sm:w-[60vw] sm:h-[60vw] max-w-[900px] max-h-[900px] opacity-90 mix-blend-screen z-30"
                style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 75%)',
                    maskImage: 'radial-gradient(circle, black 45%, transparent 75%)'
                }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image src="/gargantua.png" alt="Gargantua" fill className="object-contain filter blur-[1px]" />
            </motion.div>

            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }} className="pointer-events-none">
                    <Particles />
                </Canvas>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-20 pointer-events-none" />
        </div>
    );
}
