import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  onSelect: () => void;
};

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { title, description } = project;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="h-full rounded-lg border border-white/10 p-4 text-left transition-colors hover:border-white/30"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{description}</p>
    </button>
  );
}
