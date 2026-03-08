
import Image from 'next/image'
import { Star } from 'lucide-react'
import { db } from '@/lib/db/db'
import { projectsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import Review from './Review'
import ReviewList from './ReviewList'
import { Suspense } from 'react'
import Abstract from '@/components/projects/Abstract'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

type Props = {
  params: Promise<{
    id: string,
  }>
}

export async function generateStaticParams() {
  try {
    const projects = await db
      .select()
      .from(projectsTable)

    if (!projects) return []
    return projects.map((data: any) => ({
      id: data.projectId
    }))
  } catch (e) {
    console.error("Skipping static params generation: No Database Connection.")
    return []
  }
}

export const generateMetadata = async ({
  params,
}: Props) => {
  const { id } = await params
  const data = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.projectId, id))

  if (!data) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: data[0].name,
    description: data[0].description,
  };
};

export default async function ProjectDetail({ params }: Props) {

  const { id } = await params

  const data = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.projectId, id))

  const project = data[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-600/20 to-black">
      <main className="container mx-auto px-3 md:px-6 py-20">
        <div className='min-h-screen flex justify-center items-center'>
          <div>
            {/* Project Title */}
            <h1 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-b from-indigo-200 to-indigo-500 bg-clip-text text-transparent">
              {project.name}
            </h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
              {/* Project Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-600/60">
                <Image
                  src={project.image as string || "https://img.freepik.com/free-vector/coming-soon-banner-with-focus-lights_1017-33739.jpg"}
                  alt="Cementitious Material Project"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Proposer Info */}
                <div className="bg-gradient-to-tr from-blue-900/30 via-indigo-900/60 to-purple-900/40 bg-opacity-50 hover:bg-indigo-600/10 duration-300 rounded-3xl p-6">
                  <div className="flex max-md:flex-col-reverse md:items-center justify-between mb-4 max-md:gap-2">
                    <h2 className="text-xl text-white">
                      Proposed By: {" "}
                      <span className="text-[#b794f4]">
                        {project.constructed_by}
                      </span>
                    </h2>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#ffd700] text-[#ffd700]" />
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {project.description?.slice(0, 500)}...
                  </p>
                  <Drawer>
                    <DrawerTrigger>
                      <p className="text-[#b794f4] hover:text-[#9f7aea] transition-colors">
                        Read more
                      </p>
                    </DrawerTrigger>
                    <Abstract abstract={project.description as string} />
                  </Drawer>
                </div>

                {/* Team Members */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-tr from-blue-900/30 via-indigo-900/60 to-purple-900/40 bg-opacity-50 hover:bg-indigo-600/10 duration-300 rounded-3xl p-6">
                    <h3 className="text-white text-lg mb-2">
                      Constructed By
                    </h3>
                    <p className="text-gray-400">
                      {project.constructed_by}
                    </p>
                  </div>
                  <div className="bg-gradient-to-tr from-blue-900/30 via-indigo-900/60 to-purple-900/40 bg-opacity-50 hover:bg-indigo-600/10 duration-300 rounded-3xl p-6">
                    <h3 className="text-white text-lg mb-2">
                      Volunteer
                    </h3>
                    <p className="text-gray-400">
                      {project.volunteers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-4xl mx-auto" >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-200 to-indigo-500 bg-clip-text text-transparent">
            Project Reviews
          </h2>

          {/* Review Form */}
          <Review projectId={project.projectId} />

          <Suspense fallback={<div className='text-3xl'>Loading...</div>}>
            <ReviewList projectId={project.projectId} />
          </Suspense>
        </div>

      </main>
    </div>
  )
}

