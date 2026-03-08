import { BeakerIcon, Rocket, BookOpen, Users } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Image from 'next/image'
import aboutImage from "../../public/about.jpg"
import ytImage from "../../public/yt.png"
import SecondaryBackground from '@/components/SecondaryBackground'
import Footer from '@/components/footer'

export default function AboutUs() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SecondaryBackground
        imageSrc="/backgrounds/nebula.png"
        imagePosition="center"
        particleColor="#c4b5fd"
        opacity={0.6}
      />
      <main className="container mx-auto px-6 py-20 relative z-10">
        {/* Header Section */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center my-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Us</span>
        </h2>

        {/* About Cards Grid */}
        <div className="grid gap-8 max-w-5xl mx-auto my-16">
          {/* Establishment Card */}
          <Card className="bg-[#f3e5ff]/25 border-none px-4 py-6 md:p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <BeakerIcon className="w-8 h-8 text-[#b794f4] flex-shrink-0" />
              <p className="text-gray-300 leading-relaxed">
                Team Hermetica, was established as the departmental team of Chemical Engineering, at the National Institute of Technology, Hamirpur in the year 2014.
              </p>
            </div>
          </Card>

          {/* Mission Card */}
          <Card className="bg-[#fff4b0]/25 border-none px-4 py-6 md:p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Rocket className="w-8 h-8 text-[#ffd700] flex-shrink-0" />
              <p className="text-gray-300 leading-relaxed">
                "We React To What Matters" to nurture adroit intellect in the field of Chemical Engineering. We play an important role in emergent and planned development by conducting advanced research in splendid way.
              </p>
            </div>
          </Card>

          {/* Projects Card */}
          <Card className="bg-white/20 border-none px-4 py-6 md:p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-white flex-shrink-0" />
              <p className="text-gray-300 leading-relaxed">
                We provide a venue for directing technical and non-technical ideas. Team Hermetica collaborates on initiatives such as BioLume AquaScape, Noise Proofing by Upcycling Agro-waste, Ink from Carbon Soot, Industrial Pipe Cleaning Automated Machine and many more projects with the use of modern technologies.
              </p>
            </div>
          </Card>

          {/* Activities Card */}
          <Card className="bg-[#4e54ff]/25 border-none px-4 py-6 md:p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-[#4e54ff] flex-shrink-0" />
              <p className="text-gray-300 leading-relaxed">
                Along with projects, we have enthralling and wonderful activities like Aqua Rocket, Cascading Chest, Vaccuum Gun, Octopus Tickles which gives platform to young minds to showcase their innovative ideas. We also conduct seminars and exhibitions that give students with a variety of possibilities to enlighten their intriguing minds.
              </p>
            </div>
          </Card>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <a href="https://www.youtube.com/@teamhermetica4195" target='_blank' className="relative aspect-video group rounded-3xl overflow-hidden flex justify-center items-center">
            <Image
              src={aboutImage}
              alt='About Us'
              width={1000}
              height={1000}
              className='absolute w-full h-full object-cover group-hover:opacity-60 duration-300'
            />
            <Image src={ytImage} alt='yt logo' className='group-hover:scale-125 w-[20%] z-10 duration-300' />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}

