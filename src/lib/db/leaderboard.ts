import { getSql } from "./client";
import type { LeaderboardEntry } from "@/lib/leaderboard-types";

export type { LeaderboardEntry } from "@/lib/leaderboard-types";

export async function getTopScores(limit = 10): Promise<LeaderboardEntry[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT initials, score, created_at
    FROM leaderboard_entries
    ORDER BY score DESC, created_at ASC
    LIMIT ${limit};
  `;
  return rows as LeaderboardEntry[];
}

export async function insertScore(
  initials: string,
  score: number
): Promise<LeaderboardEntry> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO leaderboard_entries (initials, score)
    VALUES (${initials}, ${score})
    RETURNING initials, score, created_at;
  `;
  return rows[0] as LeaderboardEntry;
}
