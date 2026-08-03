import Bio from "@/components/about/Bio";
import ProjectsSection from "@/components/about/ProjectsSection";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Bio />
      <ProjectsSection />
    </main>
  );
}
