import { useEffect, useState } from "react";
import { Synth } from "tone";
import { usePositions } from "./usePositions";
import { closestFrequency } from "./utils";
// import { Position } from "./main";

const SYNTH_COUNT = 10;
const MAX_FREQ = 500;
const MIN_FREQ = 30;
// const MAX_VOL = 0;
// const MIN_VOL = -5;

export const useSynths = () => {
  const [synths, setSynths] = useState<any[]>([]);

  const positions = usePositions();

  useEffect(() => {
    if (synths.length === 0 || positions.length === 0) {
      return;
    }

    for (
      let i = 0;
      i < positions.slice(Math.min(positions.length, SYNTH_COUNT) - 1).length;
      i += 1
    ) {
      const { x } = positions[i];
      const synth = synths[i];
      const freq = closestFrequency(MAX_FREQ * x + MIN_FREQ);
      console.log(freq);
      synth.triggerAttack(freq);
    }
  }, [positions, synths]);

  useEffect(() => {
    for (let i = 0; i < SYNTH_COUNT; i += 1) {
      setSynths(s => [
        ...s,
        new Synth({ oscillator: { type: "triangle" } }).toMaster()
      ]);
    }
  }, []);

  return synths;
};
