"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onSelect: () => void;
};

export default function ProjectCard({ project, isOpen, onSelect }: ProjectCardProps) {
  const { title, description, tech } = project;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      layoutId={isOpen ? undefined : `project-card-${title}`}
      layout="position"
      className={`h-full rounded-lg border border-white/10 p-5 text-left transition-colors hover:border-white/30 ${
        isOpen ? "invisible" : ""
      }`}
    >
      <motion.h3
        layoutId={isOpen ? undefined : `project-title-${title}`}
        className="text-xl font-medium"
      >
        {title}
      </motion.h3>
      <p className="mt-2 text-base">{description}</p>
      {tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
}
