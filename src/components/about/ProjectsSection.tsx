import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-light tracking-tight">
        Things I&apos;ve worked on
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
