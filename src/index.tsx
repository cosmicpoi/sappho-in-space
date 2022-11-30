import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { Line } from "./CharPixel";
import { Spaceship } from "./Spaceship";

const Container = styled.div`
  overflow: visible;
  width: 100%;
  height: 100%;
  position: relative;
`;

function App() {
  return (
    <Container>
      <Line y={3} x={5} text="delicate" />
      <Line y={4} x={7} text="of my brested friend" />

      <Spaceship />
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
