export type Position = {
  x: number;
  y: number;
  _x: number;
  _y: number;
};

export type IndexPosition = Position & { index: number };

export const InitialPosition = {
  x: -1,
  y: -1,
  _x: -1,
  _y: -1
};
