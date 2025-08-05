import { DATA } from "@/data/data";
import { ProjectCard } from "./project-card";

export const Projects = () => {
  return (
    <section className="py-8 px-4 lg:px-0 flex flex-col items-center space-y-8">
      <h2 className="text-4xl font-extrabold text-center tracking-tight sm:text-5xl text-gray-900 dark:text-white">
        Things I’ve Built
      </h2>

      <p className="text-center text-muted-foreground max-w-xl tracking-wide text-base sm:text-lg leading-relaxed">
        From intuitive user interfaces to full-stack applications and dynamic
        sites built with platforms like Shopify and Webflow, here are some
        projects that showcase my skills and passion for modern web development.
      </p>

        <div className="inline-block rounded-full bg-gray-900 text-white px-4 py-1 text-sm font-semibold tracking-wide">
        Professional Projects
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
        {DATA.ProfessionalProjects.map((project, key) => (
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

      <div className="inline-block rounded-full bg-gray-900 text-white px-4 py-1 text-sm font-semibold tracking-wide">
        Personal Projects
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
        {DATA.Projects.map((project, key) => (
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
    </section>
  );
};
