import * as React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { Line } from "./CharPixelLib/CharPixel";
import { GameManager } from "./GameManager";
import { Spaceship } from "./Spaceship";
import { createDefinedContext } from "./Utils/createDefinedContext";

const Container = styled.div`
  overflow: visible;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const {
  useDefinedContext: useGameManager,
  provider: GameManagerProvider,
} = createDefinedContext<GameManager>();

function App() {
  const [gameManager] = useState<GameManager>(new GameManager());

  return (
    <GameManagerProvider value={gameManager}>
      <Container>
        <Line y={3} x={5} z={-1} text="de" />
        <Line y={4} x={7} z={-1} text="of my brested friend" />

        <Line
          y={10}
          x={5}
          z={-1}
          text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
        />
        <Spaceship />
      </Container>
    </GameManagerProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
