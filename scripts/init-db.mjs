// One-time (idempotent) schema setup. Run after provisioning the database:
//   node --env-file=.env.local scripts/init-db.mjs
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    "Missing DATABASE_URL / POSTGRES_URL. Start the local database with `npm run db:up` and set DATABASE_URL in .env.local, then re-run with --env-file=.env.local."
  );
  process.exit(1);
}

const sql = postgres(connectionString);

const statements = [
  `CREATE TABLE IF NOT EXISTS leaderboard_entries (
    id SERIAL PRIMARY KEY,
    initials VARCHAR(3) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,
  `CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries (score DESC);`,
];

for (const statement of statements) {
  await sql.unsafe(statement);
}

console.log("Database schema is up to date.");

await sql.end();
