"use client";

import { useState } from "react";

type InitialsFormProps = {
  score: number;
  onSubmitted: () => void;
  onSkip: () => void;
};

export default function InitialsForm({
  score,
  onSubmitted,
  onSkip,
}: InitialsFormProps) {
  const [initials, setInitials] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!initials.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initials, score }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      onSubmitted();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 text-white"
    >
      <p className="text-lg font-semibold">New high score: {score}!</p>
      <p className="text-sm text-gray-300">
        Enter your initials for the leaderboard
      </p>
      <input
        autoFocus
        value={initials}
        onChange={(event) =>
          setInitials(event.target.value.toUpperCase().slice(0, 3))
        }
        maxLength={3}
        className="w-24 rounded border border-white/30 bg-transparent px-2 py-1 text-center font-mono text-2xl uppercase tracking-widest text-white focus:outline-none focus:border-white"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting || !initials.trim()}
          className="rounded bg-white px-4 py-1.5 text-sm font-medium text-black disabled:opacity-50 hover:bg-gray-200"
        >
          {submitting ? "Saving..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded border border-white/30 px-4 py-1.5 text-sm text-white hover:bg-white/10"
        >
          Skip
        </button>
      </div>
    </form>
  );
}
