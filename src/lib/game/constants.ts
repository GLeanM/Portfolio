export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 600;

export const PADDLE_WIDTH = 90;
export const PADDLE_HEIGHT = 14;
export const PADDLE_Y = CANVAS_HEIGHT - 40;
export const PADDLE_KEYBOARD_SPEED = 480; // px/sec, for arrow-key control

export const BALL_RADIUS = 8;
export const INITIAL_BALL_SPEED = 340; // px/sec
export const SPEED_INCREMENT = 1.5; // multiplier applied on each paddle hit
export const MAX_BALL_SPEED = INITIAL_BALL_SPEED * 10;

// Max angle (from vertical) the ball can bounce off the paddle at, based on
// where it lands relative to the paddle's center.
export const MAX_BOUNCE_ANGLE = (5 * Math.PI) / 12; // 75 degrees
