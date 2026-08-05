"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onExited: () => void;
};

const panelTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function ProjectModal({ project, onClose, onExited }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {project && (
        <motion.div
          key={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            layoutId={`project-card-${project.title}`}
            layout="position"
            transition={panelTransition}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-white hover:border-white/30"
            >
              ✕
            </button>
            <motion.h3
              layoutId={`project-title-${project.title}`}
              id="project-modal-title"
              className="pr-10 text-xl font-medium"
            >
              {project.title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15 } }}
              exit={{ opacity: 0 }}
            >
              <p className="mt-4 text-sm">
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
