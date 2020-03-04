import { useMouse } from "./useMouse";
import { useTouchPositions } from "./useTouchPositions";
import { Position } from "./main.d";

export const usePositions = () => {
  const { position, leftDown, rightDown } = useMouse({});
  const { positions: _positions } = useTouchPositions({});
  const positions: Position[] = [..._positions];

  if ((leftDown || rightDown) && position) {
    positions.push(position);
  }

  return positions;
};
