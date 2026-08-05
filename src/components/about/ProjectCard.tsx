"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onSelect: () => void;
};

export default function ProjectCard({ project, isOpen, onSelect }: ProjectCardProps) {
  const { title, description } = project;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      layoutId={isOpen ? undefined : `project-card-${title}`}
      layout="position"
      className={`h-full rounded-lg border border-white/10 p-4 text-left transition-colors hover:border-white/30 ${
        isOpen ? "invisible" : ""
      }`}
    >
      <motion.h3
        layoutId={isOpen ? undefined : `project-title-${title}`}
        className="font-medium"
      >
        {title}
      </motion.h3>
      <p className="mt-2 text-sm">{description}</p>
    </motion.button>
  );
}
