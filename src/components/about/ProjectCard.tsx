import type { Project } from "@/data/projects";

export default function ProjectCard({ title, description, link }: Project) {
  const content = (
    <div className="h-full rounded-lg border border-black/10 dark:border-white/10 p-4 hover:border-black/30 dark:hover:border-white/30 transition-colors">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
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
