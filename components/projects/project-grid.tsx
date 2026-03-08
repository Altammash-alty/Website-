import ProjectCard from "./ProjectCard"

export default function ProjectGrid({ filteredProjects }: { filteredProjects: any }) {

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {filteredProjects?.map((project: any) => (
        <div key={project.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[350px]">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}

