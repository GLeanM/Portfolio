import { getTopScores } from "@/lib/db/leaderboard";

export default async function LeaderboardTable() {
  let entries;
  try {
    entries = await getTopScores(10);
  } catch {
    return (
      <p className="text-sm text-gray-500">
        Leaderboard is unavailable right now — make sure the database is
        provisioned and connected.
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No scores yet — be the first on the board!
      </p>
    );
  }

  return (
    <ol className="divide-y divide-black/10 dark:divide-white/10 rounded-lg border border-black/10 dark:border-white/10">
      {entries.map((entry, index) => (
        <li
          key={`${entry.initials}-${entry.created_at}-${index}`}
          className="flex items-center justify-between px-4 py-2"
        >
          <span className="font-mono text-sm text-gray-500 w-6">
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
