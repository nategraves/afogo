import { useEffect, useState, useCallback, MouseEvent } from "react";

interface Props {
  onFrame: (timestamp: DOMHighResTimeStamp) => any;
}

export const useAnimationFrame = ({ onFrame }: Props) => {
  const [callbackId, setCallbackId] = useState<number | null>(null);
  const callback = useCallback(
    timestamp => {
      onFrame(timestamp);
    },
    [onFrame]
  );

  useEffect(() => {
    const _callbackId = window.requestAnimationFrame(timestamp => {
      callback(timestamp);
    });
    setCallbackId(_callbackId);
    return () => {
      if (callbackId !== null) {
        window.cancelAnimationFrame(callbackId);
      }
    };
  }, [callback, callbackId]);
};
