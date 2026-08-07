"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [claimedTitle, setClaimedTitle] = useState<string | null>(null);

  return (
    <section>
      <h1 className="mb-4 text-4xl font-light tracking-tight">
        Things I&apos;ve worked on
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            isOpen={claimedTitle === project.title}
            onSelect={() => {
              setSelectedProject(project);
              setClaimedTitle(project.title);
            }}
          />
        ))}
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onExited={() => setClaimedTitle(null)}
      />
    </section>
  );
}
