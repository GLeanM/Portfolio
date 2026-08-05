"use client";

import { useEffect } from "react";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-white hover:border-white/30"
        >
          ✕
        </button>
        <h3 id="project-modal-title" className="pr-10 text-xl font-medium">
          {project.title}
        </h3>
        <p className="mt-4 text-sm text-neutral-400">
          {project.fullDescription ?? project.description}
        </p>
        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.url + link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm hover:border-white/30"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
