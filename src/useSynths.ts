import { useEffect, useState } from "react";
import { Synth } from "tone";
import { useMouse } from "./useMouse";
import { closestFrequency } from "./utils";
import { useTouchPositions, IndexPosition } from "./useTouchPositions";
import { Position } from "./main";

const SYNTH_COUNT = 10;
const MAX_FREQ = 500;
const MIN_FREQ = 30;

export const useSynths = () => {
  const [synths, setSynths] = useState<any[]>([]);

  useEffect(() => {
    for (let i = 0; i < SYNTH_COUNT; i += 1) {
      setSynths(s => [
        ...s,
        new Synth({ oscillator: { type: "triangle" } }).toMaster()
      ]);
    }
  }, []);

  const synthStart = ({ x }: Position) => {
    if (!synths || synths.length === 0) {
      return;
    }

    synths[0].triggerAttack(closestFrequency(MAX_FREQ * x + MIN_FREQ));
  };

  const synthsStart = (updatedPositions: IndexPosition[]) => {
    if (!synths || synths.length === 0) {
      return;
    }

    updatedPositions.forEach(({ x, index }) =>
      synths[index].triggerAttack(closestFrequency(MAX_FREQ * x + MIN_FREQ))
    );
  };

  const synthUpdate = ({ x }: Position) => {
    if (!synths || synths.length === 0) {
      return;
    }

    synths[0].frequency.value = MAX_FREQ * x + MIN_FREQ;
  };

  const synthsUpdate = (updatedPositions: IndexPosition[]) => {
    if (!synths || synths.length === 0) {
      return;
    }

    updatedPositions.forEach(
      ({ x, index }) =>
        (synths[index].frequency.value = MAX_FREQ * x + MIN_FREQ)
    );
  };

  const synthEnd = () => {
    if (!synths || synths.length === 0) {
      return;
    }

    synths[0].triggerRelease();
  };

  const synthsEnd = (updatedPositions: IndexPosition[]) => {
    if (!synths || synths.length === 0) {
      return;
    }

    updatedPositions.forEach(({ index }) => synths[index].triggerRelease());
  };

  const { leftDown, rightDown, position } = useMouse({
    onMouseDown: synthStart,
    onMouseMove: synthUpdate,
    onMouseUp: synthEnd
  });

  const { positions: _positions } = useTouchPositions({
    onTouchStart: synthsStart,
    onTouchMove: synthsUpdate,
    onTouchEnd: synthsEnd
  });

  const positions: (IndexPosition | Position)[] = [..._positions];

  if (leftDown || rightDown) {
    positions.push(position);
  }

  return synths;
};
