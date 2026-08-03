import type { LeaderboardEntry } from "@/lib/leaderboard-types";

type LeaderboardListProps = {
  entries: LeaderboardEntry[];
  unavailable?: boolean;
};

export default function LeaderboardList({
  entries,
  unavailable,
}: LeaderboardListProps) {
  if (unavailable) {
    return (
      <p className="text-sm text-neutral-400">
        Leaderboard is unavailable right now — make sure the database is
        provisioned and connected.
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        No scores yet — be the first on the board!
      </p>
    );
  }

  return (
    <ol className="divide-y divide-white/10 rounded-lg border border-white/10">
      {entries.map((entry, index) => (
        <li
          key={`${entry.initials}-${entry.created_at}-${index}`}
          className="flex items-center justify-between px-4 py-2"
        >
          <span className="w-6 font-mono text-sm text-neutral-500">
            {index + 1}
          </span>
          <span className="flex-1 font-semibold tracking-widest">
            {entry.initials}
          </span>
          <span className="font-mono">{entry.score}</span>
        </li>
      ))}
    </ol>
  );
}
