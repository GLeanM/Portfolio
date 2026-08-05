"use client";

import { useCallback, useState } from "react";
import type { LeaderboardEntry } from "@/lib/leaderboard-types";
import PongGame from "./PongGame";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";

type Mode = "choice" | "game" | "leaderboard";

type GamePanelProps = {
  initialEntries: LeaderboardEntry[];
  initialUnavailable?: boolean;
};

export default function GamePanel({
  initialEntries,
  initialUnavailable = false,
}: GamePanelProps) {
  const [mode, setMode] = useState<Mode>("choice");
  const [entries, setEntries] = useState(initialEntries);
  const [unavailable, setUnavailable] = useState(initialUnavailable);

  const refreshLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) {
        setUnavailable(true);
        return;
      }
      const data = await res.json();
      setEntries(data.entries);
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  }, []);

  if (mode === "choice") {
    return (
      <div className="flex min-h-[300px] w-full max-w-[380px] flex-col items-center justify-center gap-4 rounded-lg border border-white/10 px-6 py-12 text-center">
        <p className="text-sm">What would you like to do?</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => setMode("game")}
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-neutral-200"
          >
            Play Pong
          </button>
          <button
            onClick={() => setMode("leaderboard")}
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[380px]">
      <div className="mb-4 inline-flex gap-1 rounded-full border border-white/10 p-1 text-sm">
        <button
          onClick={() => setMode("game")}
          className={
            mode === "game"
              ? "rounded-full bg-white/10 px-3 py-1 text-white"
              : "rounded-full px-3 py-1"
          }
        >
          Play
        </button>
        <button
          onClick={() => setMode("leaderboard")}
          className={
            mode === "leaderboard"
              ? "rounded-full bg-white/10 px-3 py-1 text-white"
              : "rounded-full px-3 py-1"
          }
        >
          Leaderboard
        </button>
      </div>

      {mode === "game" ? (
        <PongGame topEntries={entries} onScoreSubmitted={refreshLeaderboard} />
      ) : (
        <LeaderboardList entries={entries} unavailable={unavailable} />
      )}
    </div>
  );
}
