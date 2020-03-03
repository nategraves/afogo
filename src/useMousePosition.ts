import { useEffect, useState, MouseEvent } from "react";

import { Position, InitialPosition } from "./main.d";

export const useMousePosition = () => {
  const [position, setPosition] = useState<Position>(InitialPosition);

  useEffect(() => {
    function setFromEvent(this: Window, ev: MouseEvent) {
      const windowWidth =
        window.innerWidth && document.documentElement.clientWidth
          ? Math.min(window.innerWidth, document.documentElement.clientWidth)
          : window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName("body")[0].clientWidth;
      const windowHeight =
        window.innerHeight && document.documentElement.clientHeight
          ? Math.min(window.innerHeight, document.documentElement.clientHeight)
          : window.innerHeight ||
            document.documentElement.clientHeight ||
            document.getElementsByTagName("body")[0].clientHeight;

      const { clientX, clientY } = ev;
      setPosition({
        x: clientX / windowWidth,
        y: clientY / windowHeight,
        _x: clientX,
        _y: clientY
      });
    }

    //@ts-ignore
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      //@ts-ignore
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};
