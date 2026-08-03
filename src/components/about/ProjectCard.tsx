import type { Project } from "@/data/projects";

export default function ProjectCard({ title, description, link }: Project) {
  const content = (
    <div className="h-full rounded-lg border border-white/10 p-4 transition-colors hover:border-white/30">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{description}</p>
    </div>
  );

  if (!link || link === "#") {
    return content;
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  );
}
