import { DATA } from "@/data/data";
import { ProjectCard } from "./project-card";
import { ClientProjectsSection } from "./client-projects";

export const Projects = () => {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Work</h2>

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Professional</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DATA.ProfessionalProjects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          ))}
        </div>
      </div>

      <ClientProjectsSection />

      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">Personal</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DATA.Projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
