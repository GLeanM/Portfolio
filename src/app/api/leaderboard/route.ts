import { NextResponse } from "next/server";
import { getTopScores, insertScore } from "@/lib/db/leaderboard";
import { validateScoreSubmission } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getTopScores(10);
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validateScoreSubmission(body);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const entry = await insertScore(
    validation.data.initials,
    validation.data.score
  );
  return NextResponse.json({ entry }, { status: 201 });
}
