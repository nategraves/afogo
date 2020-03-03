import { useMousePosition } from "./useMousePosition";
import { useMouseButtons } from "./useMouseButtons";
import { useTouchPositions } from "./useTouchPositions";
import { Position } from "./main.d";

export const usePositions = () => {
  const { leftDown, rightDown } = useMouseButtons();
  const mousePosition = useMousePosition();
  const touchPositions = useTouchPositions();
  const positions: Position[] = [...touchPositions];

  if (leftDown) {
    positions.push(mousePosition);
  }

  return positions;
};
