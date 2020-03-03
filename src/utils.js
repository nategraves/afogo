class Octave {
  constructor(a) {
    this.b = a * Math.pow(2, 2 / 12);
    this.aSharp = a * Math.pow(2, 1 / 12);
    this.a = a;
    this.gSharp = a * Math.pow(2, -1 / 12);
    this.g = a * Math.pow(2, -2 / 12);
    this.fSharp = a * Math.pow(2, -3 / 12);
    this.f = a * Math.pow(2, -4 / 12);
    this.e = a * Math.pow(2, -5 / 12);
    this.dSharp = a * Math.pow(2, -6 / 12);
    this.d = a * Math.pow(2, -7 / 12);
    this.cSharp = a * Math.pow(2, -8 / 12);
    this.c = a * Math.pow(2, -9 / 12);
  }
}

export const buildFrequencies = () => {
  const A4 = 440;
  let scale = [];
  let frequencies = [];

  for (let i = -2; i < 4; i += 1) {
    let a = A4 * Math.pow(2, i);
    let octave = new Octave(a);
    scale.push(octave);
  }

  scale.map(o => {
    for (var note in o) {
      frequencies.push(o[note]);
    }
  });

  frequencies.sort((a, b) => a - b);
  frequencies.reverse();

  return frequencies;
};

export const closestFrequency = (
  frequency,
  frequencies = buildFrequencies()
) => {
  let diff = 10000;
  let closest;

  for (let i = 0; i < frequencies.length; i += 1) {
    const d = Math.abs(frequency - frequencies[i]);

    if (d < diff) {
      diff = d;
      closest = frequencies[i];
    }
  }

  return closest;
};
