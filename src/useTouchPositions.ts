import { useEffect, useState, TouchEvent } from "react";

import { Position } from "./main.d";

export const useTouchPositions = () => {
  const [touches, setTouches] = useState<Position[]>([]);

  useEffect(() => {
    function fromEvent(ev: TouchEvent) {
      //ev.preventDefault();

      if (ev.touches.length > 0) {
        const windowWidth =
          window.innerWidth && document.documentElement.clientWidth
            ? Math.min(window.innerWidth, document.documentElement.clientWidth)
            : window.innerWidth ||
              document.documentElement.clientWidth ||
              document.getElementsByTagName("body")[0].clientWidth;
        const windowHeight =
          window.innerHeight && document.documentElement.clientHeight
            ? Math.min(
                window.innerHeight,
                document.documentElement.clientHeight
              )
            : window.innerHeight ||
              document.documentElement.clientHeight ||
              document.getElementsByTagName("body")[0].clientHeight;

        setTouches(
          Object.values(ev.touches).map(({ clientX, clientY }) => ({
            x: clientX / windowWidth,
            y: clientY / windowHeight,
            _x: clientX,
            _y: clientY
          }))
        );
      } else {
        setTouches([]);
      }
    }

    //@ts-ignore
    window.addEventListener("touchstart", fromEvent);
    //@ts-ignore
    window.addEventListener("touchmove", fromEvent);
    //@ts-ignore
    window.addEventListener("touchend", fromEvent);

    return () => {
      //@ts-ignore
      window.removeEventListener("touchmove", setFromEvent);
      //@ts-ignore
      window.removeEventListener("touchmove", setFromEvent);
      //@ts-ignore
      window.removeEventListener("touchend", handleCancel);
    };
  }, []);

  return touches;
};
