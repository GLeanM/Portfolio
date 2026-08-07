"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section>
      <div className="relative mb-4 inline-block">
        <h1 className="text-4xl font-light tracking-tight">
          Things I&apos;ve worked on
        </h1>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            isOpen={selectedProject?.title === project.title}
            onSelect={() => setSelectedProject(project)}
            onClose={() => setSelectedProject(null)}
          />
        ))}
      </div>
    </section>
  );
}
