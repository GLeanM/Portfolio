import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sqlClient: NeonQueryFunction<false, false> | null = null;

// Lazily created so `next build` doesn't fail when no database is
// provisioned yet — the connection string is only required once a
// request actually needs it.
export function getSql() {
  if (!sqlClient) {
    const connectionString =
      process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";

    if (!connectionString) {
      throw new Error(
        "Missing database connection string. Set DATABASE_URL (or POSTGRES_URL) in your environment."
      );
    }

    sqlClient = neon(connectionString);
  }

  return sqlClient;
}
