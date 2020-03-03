import React, { useRef } from "react";
import styled from "styled-components";

import { usePositions } from "./usePositions";
import { positionToColor } from "./positionToColor";
import { useSynths } from "./useSynths";

import "./App.css";

const Container = styled.svg`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

function App() {
  //const [frame, setFrame] = useState<number | null>(null);
  const canvas = useRef<SVGSVGElement>(null);
  const positions = usePositions();
  useSynths();

  return (
    <Container ref={canvas}>
      {positions.map(({ x, y, _x, _y }, i) => {
        const { r, g, b } = positionToColor(x, y);
        return (
          <circle
            key={`element${i}`}
            cx={_x}
            cy={_y}
            r={30}
            fill={`rgb(${r},${g},${b})`}
          />
        );
      })}
    </Container>
  );
}

export default App;
