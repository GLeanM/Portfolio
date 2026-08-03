CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id SERIAL PRIMARY KEY,
  initials VARCHAR(3) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries (score DESC);
