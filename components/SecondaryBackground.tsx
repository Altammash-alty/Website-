"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import Image from "next/image";

interface SecondaryBackgroundProps {
    imageSrc?: string;
    imagePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    particleColor?: string;
    gradientFrom?: string;
    opacity?: number;
    showImage?: boolean;
}

function Particles({ color = "#c4b5fd" }: { color?: string }) {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 3000;

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

    const mouse = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });
    const hasMoved = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!hasMoved.current) {
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

        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
        pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;

        mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.1;
        mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.1;

        if (hasMoved.current) {
            const mouseX = (mouse.current.x * viewport.width) / 2;
            const mouseY = (mouse.current.y * viewport.height) / 2;
            const mouseVector = new THREE.Vector3(mouseX, mouseY, 0);

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

                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                const maxDist = 2.0;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const repelFactor = force * 0.6;

                    const waveX = Math.sin(state.clock.getElapsedTime() * 1.5 + oY) * 0.08;
                    const waveY = Math.cos(state.clock.getElapsedTime() * 1.5 + oX) * 0.08;

                    positionsArray[i3] = oX + (dx / dist) * repelFactor + waveX;
                    positionsArray[i3 + 1] = oY + (dy / dist) * repelFactor + waveY;
                    positionsArray[i3 + 2] = oZ + (Math.sin(force * Math.PI)) * repelFactor;
                } else {
                    positionsArray[i3] += (oX - positionsArray[i3]) * 0.08;
                    positionsArray[i3 + 1] += (oY - positionsArray[i3 + 1]) * 0.08;
                    positionsArray[i3 + 2] += (oZ - positionsArray[i3 + 2]) * 0.08;
                }
            }
        } else {
            const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positionsArray[i3] += (originalPositions[i3] - positionsArray[i3]) * 0.08;
                positionsArray[i3 + 1] += (originalPositions[i3 + 1] - positionsArray[i3 + 1]) * 0.08;
                positionsArray[i3 + 2] += (originalPositions[i3 + 2] - positionsArray[i3 + 2]) * 0.08;
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
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={color}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.6}
                alphaMap={circleTexture}
                alphaTest={0.01}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function SecondaryBackground({
    imageSrc,
    imagePosition = "center",
    particleColor = "#c4b5fd",
    gradientFrom = "from-indigo-900/10",
    opacity = 0.7,
    showImage = true
}: SecondaryBackgroundProps) {
    const getPositionClasses = () => {
        switch (imagePosition) {
            case "top-left": return "top-[5%] left-[5%]";
            case "top-right": return "top-[5%] right-[5%]";
            case "bottom-left": return "bottom-[5%] left-[5%]";
            case "bottom-right": return "bottom-[5%] right-[5%]";
            case "center": return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            default: return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
        }
    };

    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${gradientFrom} via-black to-black opacity-90 z-0`} />

            {showImage && imageSrc && (
                <motion.div
                    className={`absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] mix-blend-screen z-0 ${getPositionClasses()}`}
                    style={{
                        opacity: opacity,
                        WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                        maskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                    }}
                    animate={{
                        rotate: imagePosition === "center" ? [0, 360] : 0,
                        scale: [1, 1.03, 1]
                    }}
                    transition={{
                        rotate: { duration: 300, repeat: Infinity, ease: "linear" },
                        scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Image src={imageSrc} alt="Cosmic Background" fill className="object-contain filter blur-[1px]" />
                </motion.div>
            )}

            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <Particles color={particleColor} />
                </Canvas>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-20 pointer-events-none" />
        </div>
    );
}
