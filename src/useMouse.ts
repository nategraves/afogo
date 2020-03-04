import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import { Position, InitialPosition } from "./main.d";

interface Props {
  onMouseDown?: (position: Position) => void;
  onMouseMove?: (position: Position) => void;
  onMouseUp?: () => void;
}

interface Return {
  position: Position;
  leftDown: boolean;
  rightDown: boolean;
}

export const useMouse = ({
  onMouseDown,
  onMouseMove,
  onMouseUp
}: Props): Return => {
  const [position, setPosition] = useState<Position>(InitialPosition);
  const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    function mouseDown(ev: MouseEvent) {
      const { clientX: x, clientY: y, buttons } = ev;

      setPosition({
        x: x / windowWidth,
        y: y / windowHeight,
        _x: x,
        _y: y
      });

      switch (buttons) {
        case 1:
          setLeftDown(true);
          setRightDown(false);
          break;
        case 2:
          setLeftDown(false);
          setRightDown(true);
          break;
        case 3:
          setLeftDown(true);
          setRightDown(true);
          break;
        default:
          setLeftDown(false);
          setRightDown(false);
          break;
      }

      onMouseDown && position && onMouseDown(position);
    }

    function mouseMove(ev: MouseEvent) {
      const { clientX: x, clientY: y } = ev;
      setPosition({
        x: x / windowWidth,
        y: y / windowHeight,
        _x: x,
        _y: y
      });

      onMouseMove && position && onMouseMove(position);
    }

    function mouseUp(ev: MouseEvent) {
      const { buttons } = ev;

      switch (buttons) {
        case 1:
          setLeftDown(true);
          setRightDown(false);
          break;
        case 2:
          setLeftDown(false);
          setRightDown(true);
          break;
        case 3:
          setLeftDown(true);
          setRightDown(true);
          break;
        default:
          setLeftDown(false);
          setRightDown(false);
          break;
      }

      if (!leftDown && !rightDown) {
        setPosition(InitialPosition);
        onMouseUp && onMouseUp();
      }
    }

    function cancel(ev: MouseEvent) {
      ev.preventDefault();
    }

    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("contextmenu", cancel);

    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("contextmenu", cancel);
    };
  }, [
    windowWidth,
    windowHeight,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    position,
    leftDown,
    rightDown
  ]);

  return { position, leftDown, rightDown };
};
