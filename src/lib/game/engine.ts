import {
  BALL_RADIUS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_BALL_SPEED,
  MAX_BALL_SPEED,
  MAX_BOUNCE_ANGLE,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_Y,
  SPEED_INCREMENT,
} from "./constants";
import type { GameState, GameStatus } from "./types";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function createInitialState(): GameState {
  return {
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 3,
      vx: INITIAL_BALL_SPEED * 0.4,
      vy: INITIAL_BALL_SPEED * 0.9,
      radius: BALL_RADIUS,
    },
    paddle: {
      x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      y: PADDLE_Y,
    },
    score: 0,
    status: "playing",
  };
}

/**
 * Advances the game by `dt` seconds. `desiredPaddleCenterX` is the paddle's
 * target center position for this frame (from pointer or keyboard input).
 */
export function updateGame(
  state: GameState,
  dt: number,
  desiredPaddleCenterX: number
): GameState {
  if (state.status !== "playing") {
    return state;
  }

  const paddleX = clamp(
    desiredPaddleCenterX - state.paddle.width / 2,
    0,
    CANVAS_WIDTH - state.paddle.width
  );
  const paddle = { ...state.paddle, x: paddleX };

  const { radius } = state.ball;
  let { x, y, vx, vy } = state.ball;
  x += vx * dt;
  y += vy * dt;

  // Side walls
  if (x - radius <= 0) {
    x = radius;
    vx = Math.abs(vx);
  } else if (x + radius >= CANVAS_WIDTH) {
    x = CANVAS_WIDTH - radius;
    vx = -Math.abs(vx);
  }

  // Top wall
  if (y - radius <= 0) {
    y = radius;
    vy = Math.abs(vy);
  }

  let score = state.score;
  let status: GameStatus = state.status;

  // Paddle collision: ball must be moving downward and overlapping the
  // paddle's horizontal and vertical span.
  const hitsPaddle =
    vy > 0 &&
    y + radius >= paddle.y &&
    y - radius <= paddle.y + paddle.height &&
    x + radius >= paddle.x &&
    x - radius <= paddle.x + paddle.width;

  if (hitsPaddle) {
    y = paddle.y - radius;
    score += 1;

    const currentSpeed = Math.hypot(vx, vy);
    const newSpeed = Math.min(currentSpeed * SPEED_INCREMENT, MAX_BALL_SPEED);

    const paddleCenter = paddle.x + paddle.width / 2;
    const hitOffset = clamp((x - paddleCenter) / (paddle.width / 2), -1, 1);
    const angle = hitOffset * MAX_BOUNCE_ANGLE;

    vx = newSpeed * Math.sin(angle);
    vy = -newSpeed * Math.cos(angle);
  } else if (y - radius > CANVAS_HEIGHT) {
    // Ball passed the paddle — game over.
    status = "gameover";
  }

  return {
    ball: { x, y, vx, vy, radius },
    paddle,
    score,
    status,
  };
}
