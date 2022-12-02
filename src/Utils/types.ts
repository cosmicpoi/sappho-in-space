
export type Position = {
  x: number;
  y: number;
};

export type Position3D = Position & {
  z?: number;
}

export enum Direction {
  Up,
  Left,
  Down,
  Right,
}
export type Hitbox = Position & {
  width: number;
  height: number;
};