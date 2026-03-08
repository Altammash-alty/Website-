import { AchievementCarousel as AchievementsSection } from "@/components/home/Achievements-carousel"
import DomainsSection from "../components/domains-section"
import AboutSection from "@/components/about-section"
import ClubCoordinator from "@/components/home/ClubCoordinator"
import HeroSection from "@/components/home/Hero"
import ParticleBackgroundClient from "@/components/home/ParticleBackgroundClient"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <>
      <ParticleBackgroundClient />
      <main className="min-h-screen relative z-10 w-full overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <DomainsSection />
        <AchievementsSection />
        <ClubCoordinator />
        <Footer />
      </main>
    </>
  )
}
