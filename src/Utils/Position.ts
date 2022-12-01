export type Position = {
  x: number;
  y: number;
};

export const getPositionKey = ({ x, y }: Position): string => `${x}-${y}`;