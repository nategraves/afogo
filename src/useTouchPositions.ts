import { useEffect, useState } from "react";

import { useWindowSize } from "react-use";
import { Position } from "./main.d";

export type IndexPosition = Position & { index: number };

interface Props {
  onTouchStart?: (positions: IndexPosition[]) => void;
  onTouchMove?: (positions: IndexPosition[]) => void;
  onTouchEnd?: (positions: IndexPosition[]) => void;
}

export const useTouchPositions = ({
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: Props) => {
  const [trackedTouches, setTrackedTouches] = useState<TouchList | null>(null);
  const [positions, setPositions] = useState<IndexPosition[]>([]);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    function touchStart(ev: TouchEvent) {
      const { touches, changedTouches } = ev;

      setTrackedTouches(touches);

      const indexes = Object.keys(changedTouches);
      const changed = Object.values(changedTouches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      onTouchStart && onTouchStart(changed);

      const _positions = Object.values(touches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      setPositions(_positions);
    }

    function touchMove(ev: TouchEvent) {
      const { touches, changedTouches } = ev;

      setTrackedTouches(touches);

      const indexes = Object.keys(changedTouches);
      const changed = Object.values(changedTouches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      onTouchMove && onTouchMove(changed);

      const _positions = Object.values(touches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      setPositions(_positions);
    }

    function touchEnd(ev: TouchEvent) {
      const { touches, changedTouches } = ev;

      setTrackedTouches(touches);

      const indexes = Object.keys(changedTouches);
      const changed = Object.values(changedTouches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      onTouchEnd && onTouchEnd(changed);

      const _positions = Object.values(touches).map(
        ({ clientX, clientY }, i) => ({
          x: clientX / windowWidth,
          y: clientY / windowHeight,
          _x: clientX,
          _y: clientY,
          index: parseInt(indexes[i], 10)
        })
      );
      setPositions(_positions);
    }

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [windowHeight, windowWidth, onTouchStart, onTouchMove, onTouchEnd]);

  return { positions, touches: trackedTouches };
};
