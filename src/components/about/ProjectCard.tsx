"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onSelect: (project: Project) => void;
  onClose: () => void;
};

const modalTransition = { duration: 0.15 };

export default function ProjectCard({ project, isOpen, onSelect, onClose }: ProjectCardProps) {
  const { title, description, tech, fullDescription, links } = project;
  const titleId = `project-title-${title}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        aria-hidden={isOpen || undefined}
        role={isOpen ? undefined : "button"}
        tabIndex={isOpen ? -1 : 0}
        onClick={isOpen ? undefined : () => onSelect(project)}
        onKeyDown={
          isOpen
            ? undefined
            : (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(project);
                }
              }
        }
        className={
          isOpen
            ? "invisible h-full rounded-lg border border-white/10 p-5 text-left"
            : "h-full cursor-pointer rounded-lg border border-white/10 p-5 text-left transition-colors hover:border-white/30"
        }
      >
        <h3 className="text-xl font-medium">{title}</h3>
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
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={modalTransition}
            className="fixed inset-0 z-50 m-auto h-fit max-h-[80vh] w-full max-w-2xl cursor-default overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-white hover:border-white/30"
            >
              ✕
            </button>
            <h3 id={titleId} className="pr-10 text-2xl font-medium">
              {title}
            </h3>
            <p className="mt-4 text-base">{fullDescription ?? description}</p>
            {links && links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {links.map((link) => (
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
        )}
      </AnimatePresence>
    </>
  );
}
