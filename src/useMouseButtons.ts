import { useEffect, useState, MouseEvent } from "react";

export const useMouseButtons = () => {
  const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);

  useEffect(() => {
    function setFromEvent(ev: MouseEvent) {
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
    }

    //@ts-ignore
    window.addEventListener("mousedown", setFromEvent);
    //@ts-ignore
    window.addEventListener("mouseup", setFromEvent);
    //@ts-ignore
    window.addEventListener("contextmenu", (e: MouseEvent) =>
      e.preventDefault()
    );

    return () => {
      //@ts-ignore
      window.removeEventListener("mousedown", setFromEvent);
      //@ts-ignore
      window.removeEventListener("mouseup", setFromEvent);
      //@ts-ignore
      window.removeEventListener("contextmenu", (e: MouseEvent) =>
        e.preventDefault()
      );
    };
  }, []);

  return { leftDown, rightDown };
};
