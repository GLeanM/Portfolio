"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-light tracking-tight">
        Things I&apos;ve worked on
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
