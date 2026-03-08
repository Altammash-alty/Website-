"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/home/ParticleBackground"),
  { ssr: false }
);

export default function ParticleBackgroundClient() {
  return <ParticleBackground />;
}
