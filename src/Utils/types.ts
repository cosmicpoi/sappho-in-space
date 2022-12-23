import * as React from "react";

export type Hook<T> = ReturnType<typeof React.useState<T>>;

export type Position = {
  x: number;
  y: number;
};

export type Position3D = Position & {
  z?: number;
};

export type Position3DR = Required<Position3D>;

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
  Right,
}

export enum Layer {
  Default = 0,
  Title = 1,
  Title2 = 2,
  Particles = 9,
  Spaceship = 10,
}

export enum ZIndex {
  Container = 0,
  Environment = 1,
  FloatingBG = 2,
  Walls = 3,
  Characters = 4,
}

export enum CollisionGroup {
  Spaceship,
  HeartParticle,
}
