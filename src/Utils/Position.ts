export type Position = {
  x: number;
  y: number;
};

export type Position3D = Position & {
  z?: number;
}

export const getPositionKey = ({ x, y }: Position): string => `${x}-${y}`;