
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

export enum TextAlign {
  Left,
  Center,
  Right
}

export enum Layer {
  Default = 0,
  Title = 1,
  Title2 = 2,
  Particles = 9,
  Spaceship = 10,
}