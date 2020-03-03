// The x,y here should be a 0 > 1 range that is Pos(X|Y) / Screen(Width|Height)
export const positionToColor = (x: number, y: number) => ({
  r: Math.round(64 + 125 * x + 64 * Math.sin(x)),
  g: Math.round(64 + 125 * (1 - y) + 64 * Math.cos(y)),
  b: Math.round(64 + 125 * y + 64 * Math.cos(y))
});
