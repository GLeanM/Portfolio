const INITIALS_PATTERN = /^[A-Z0-9]{1,3}$/;
const MAX_PLAUSIBLE_SCORE = 100_000;

export type ScoreSubmission = {
  initials: string;
  score: number;
};

export type ValidationResult =
  | { ok: true; data: ScoreSubmission }
  | { ok: false; error: string };

export function validateScoreSubmission(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be an object." };
  }

  const { initials, score } = body as Record<string, unknown>;

  if (typeof initials !== "string") {
    return { ok: false, error: "initials must be a string." };
  }
  const normalizedInitials = initials.trim().toUpperCase();
  if (!INITIALS_PATTERN.test(normalizedInitials)) {
    return {
      ok: false,
      error: "initials must be 1-3 letters or digits.",
    };
  }

  if (
    typeof score !== "number" ||
    !Number.isInteger(score) ||
    score < 1 ||
    score > MAX_PLAUSIBLE_SCORE
  ) {
    return {
      ok: false,
      error: `score must be an integer between 1 and ${MAX_PLAUSIBLE_SCORE}.`,
    };
  }

  return { ok: true, data: { initials: normalizedInitials, score } };
}
