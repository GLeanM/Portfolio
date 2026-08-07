"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onSelect: () => void;
  onClose: () => void;
};

const cardTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

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
    <motion.div
      layout
      transition={cardTransition}
      role={isOpen ? "dialog" : "button"}
      aria-modal={isOpen || undefined}
      aria-labelledby={titleId}
      tabIndex={isOpen ? -1 : 0}
      onClick={isOpen ? undefined : onSelect}
      onKeyDown={
        isOpen
          ? undefined
          : (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect();
              }
            }
      }
      className={
        isOpen
          ? "fixed inset-0 z-50 m-auto h-fit max-h-[80vh] w-full max-w-2xl cursor-default overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 p-8"
          : "h-full cursor-pointer rounded-lg border border-white/10 p-5 text-left transition-colors hover:border-white/30"
      }
    >
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-white hover:border-white/30"
        >
          ✕
        </button>
      )}
      <motion.h3
        layout="position"
        id={titleId}
        className={isOpen ? "pr-10 text-2xl font-medium" : "text-xl font-medium"}
      >
        {title}
      </motion.h3>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
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
        ) : (
          <motion.div
            key="short"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
