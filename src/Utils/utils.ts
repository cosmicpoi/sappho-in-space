import { KEYS } from "../Engine/InputManager";

export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

  // Direction
export enum Direction {
  Up,
  Left,
  Down,
  Right,
}
export const directionFromKey = (key: string) => {
  if (key === KEYS.Down) return Direction.Down;
  else if (key === KEYS.Up) return Direction.Up;
  else if (key === KEYS.Left) return Direction.Left;
  else if (key === KEYS.Right) return Direction.Right;
  else console.error("invalid key!");
};
export const directionKeys = [KEYS.Down, KEYS.Up, KEYS.Left, KEYS.Right];
