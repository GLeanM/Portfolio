import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Top 10</h1>
      <LeaderboardTable />
    </main>
  );
}
