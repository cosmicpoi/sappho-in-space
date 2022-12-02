import { KEYS } from "../Engine/InputManager";
import { Position } from "./Position";

// numbers
export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

// random
export const randomRange = (min: number, max: number): number =>
  min + Math.random() * (max - min);

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
export const randIntRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

export function rotateByDirection(
  { x, y }: Position,
  dir: Direction
): Position {
  if (dir === Direction.Up) return { x, y };
  else if (dir === Direction.Down) {
    return {
      x: -x,
      y: -y,
    };
  } else if (dir === Direction.Left) {
    return {
      x: y,
      y: x,
    };
  } else if (dir === Direction.Right) {
    return {
      x: -y,
      y: -x,
    };
  }
}
