import { DATA } from "@/data/data";
import { ProjectCard } from "./project-card";


export const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-8">
      <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-bold">
        My Projects
      </div>
      <h2 className="text-3xl font-semibold tracking-tighter sm:text-5xl">
        Check out my works
      </h2>
      <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center my-2">
      I have worked on a variety of projects, ranging from simple websites to moderately complex web applications. Here are a few of my favorites.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[800px] ">
        {DATA.Projects.map((project, key) => (
          <div key={key}>
            <ProjectCard
              href={project.href}
              key={project.title}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
