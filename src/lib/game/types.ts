export type GameStatus = "playing" | "gameover";

export type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export type Paddle = {
  x: number; // left edge
  width: number;
  height: number;
  y: number; // top edge, fixed
};

export type GameState = {
  ball: Ball;
  paddle: Paddle;
  score: number;
  status: GameStatus;
};
