import Bio from "@/components/about/Bio";
import ProjectsSection from "@/components/about/ProjectsSection";
import GamePanel from "@/components/game/GamePanel";
import LinksSection from "@/components/links/LinksSection";
import { getTopScores } from "@/lib/db/leaderboard";
import type { LeaderboardEntry } from "@/lib/leaderboard-types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initialEntries: LeaderboardEntry[] = [];
  let initialUnavailable = false;
  try {
    initialEntries = await getTopScores(10);
  } catch {
    initialUnavailable = true;
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-[380px_1fr] md:gap-16 md:py-20">
          <div className="flex justify-center md:sticky md:top-12 md:h-fit md:justify-start md:self-start">
            <GamePanel
              initialEntries={initialEntries}
              initialUnavailable={initialUnavailable}
            />
          </div>
          <div>
            <Bio />
            <ProjectsSection />
          </div>
        </div>
      </div>
      <LinksSection />
    </main>
  );
}
