"use client";

import { useEffect, useRef, useState } from "react";
import { createInitialState, updateGame } from "@/lib/game/engine";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDLE_KEYBOARD_SPEED,
} from "@/lib/game/constants";
import type { GameState, GameStatus } from "@/lib/game/types";
import type { LeaderboardEntry } from "@/lib/leaderboard-types";
import InitialsForm from "./InitialsForm";
import GameOverPanel from "./GameOverPanel";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function render(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(
    state.paddle.x,
    state.paddle.y,
    state.paddle.width,
    state.paddle.height
  );

  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
}

type PongGameProps = {
  topEntries: LeaderboardEntry[];
  onScoreSubmitted: () => void;
};

export default function PongGame({
  topEntries,
  onScoreSubmitted,
}: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const paddleCenterRef = useRef(CANVAS_WIDTH / 2);
  const movingLeftRef = useRef(false);
  const movingRightRef = useRef(false);
  const hasHandledGameOverRef = useRef(false);
  const topEntriesRef = useRef<LeaderboardEntry[]>(topEntries);

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [showInitialsForm, setShowInitialsForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    topEntriesRef.current = topEntries;
  }, [topEntries]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeContext = canvas.getContext("2d");
    if (!maybeContext) return;
    const context: CanvasRenderingContext2D = maybeContext;

    let animationFrameId: number;
    let lastTime = performance.now();

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (stateRef.current.status === "playing") {
        if (movingLeftRef.current) {
          paddleCenterRef.current -= PADDLE_KEYBOARD_SPEED * dt;
        }
        if (movingRightRef.current) {
          paddleCenterRef.current += PADDLE_KEYBOARD_SPEED * dt;
        }
        paddleCenterRef.current = clamp(
          paddleCenterRef.current,
          0,
          CANVAS_WIDTH
        );

        const prevScore = stateRef.current.score;
        stateRef.current = updateGame(
          stateRef.current,
          dt,
          paddleCenterRef.current
        );

        if (stateRef.current.score !== prevScore) {
          setScore(stateRef.current.score);
        }

        if (
          stateRef.current.status === "gameover" &&
          !hasHandledGameOverRef.current
        ) {
          hasHandledGameOverRef.current = true;
          setStatus("gameover");

          const finalScore = stateRef.current.score;
          const entries = topEntriesRef.current;
          const qualifies =
            finalScore > 0 &&
            (entries.length < 10 ||
              finalScore > entries[entries.length - 1].score);
          setShowInitialsForm(qualifies);
        }
      }

      render(context, stateRef.current);
      animationFrameId = requestAnimationFrame(loop);
    }

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") movingLeftRef.current = true;
      if (event.key === "ArrowRight") movingRightRef.current = true;
    }
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") movingLeftRef.current = false;
      if (event.key === "ArrowRight") movingRightRef.current = false;
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    paddleCenterRef.current = (event.clientX - rect.left) * scaleX;
  }

  function handleRetry() {
    stateRef.current = createInitialState();
    paddleCenterRef.current = CANVAS_WIDTH / 2;
    hasHandledGameOverRef.current = false;
    setScore(0);
    setStatus("playing");
    setShowInitialsForm(false);
    setSubmitted(false);
  }

  function handleSubmitted() {
    setSubmitted(true);
    setShowInitialsForm(false);
    onScoreSubmitted();
  }

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-lg">Score: {score}</span>
        {status === "playing" && (
          <span className="text-sm">
            Mouse or arrow keys
          </span>
        )}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerMove={handlePointerMove}
          className="h-auto w-full touch-none rounded-lg border border-white/10"
        />
        {status === "gameover" && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70">
            {showInitialsForm && !submitted ? (
              <InitialsForm
                score={score}
                onSubmitted={handleSubmitted}
                onSkip={() => setShowInitialsForm(false)}
              />
            ) : (
              <GameOverPanel score={score} onRetry={handleRetry} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
