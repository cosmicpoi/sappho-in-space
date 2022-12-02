import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { GameManager } from "./Engine/GameManager";
import { Spaceship } from "./Components/Spaceship";
import { createDefinedContext } from "./Utils/createDefinedContext";
import { Position } from "./Utils/Position";
import { Frame } from "./Viewport/Frame";
import { Line } from "./Components/Line";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const {
  useDefinedContext: useGameManager,
  provider: GameManagerProvider,
} = createDefinedContext<GameManager>();

function App() {
  const [gameManager] = useState<GameManager>(new GameManager());

  const containerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (containerRef.current)
    gameManager.viewportManager.setContainer(containerRef.current);
  }, [containerRef]);

  useEffect(() => {
    gameManager.viewportManager.scrollToCenter();
  }, [containerRef]);

  const [center] = useState<Position>(gameManager.viewportManager.getCenter());

  useEffect(() => {
    return gameManager.initialize();
  }, [gameManager]);

  return (
    <GameManagerProvider value={gameManager}>
      <Container ref={containerRef}>
        <Frame />
        <Line y={3} x={5} z={-1} text="de" />
        <Line y={4} x={7} z={-1} text="of my brested friend" />

        <Line y={center.y} x={center.x} z={-1} text="of my brested friend" />

        <Line
          y={10}
          x={5}
          z={-1}
          text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
        />
        <Line
          y={11}
          x={5}
          z={-1}
          text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
        />
        <Line
          y={12}
          x={5}
          z={-1}
          text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
        />
        <Line
          y={13}
          x={5}
          z={-1}
          text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]/?|\"
        />
        <Line
          y={14}
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
