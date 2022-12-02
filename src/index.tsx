import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { Spaceship } from "./Components/Spaceship";
import { GameManager } from "./Engine/GameManager";
import { GameWorld } from "./GameWorld";
import { createDefinedContext } from "./Utils/createDefinedContext";
import { Frame } from "./Viewport/Frame";

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
  }, [containerRef, gameManager]);

  useEffect(() => {
    gameManager.viewportManager.scrollToCenter();
  }, [containerRef, gameManager]);

  useEffect(() => {
    return gameManager.initialize();
  }, [gameManager]);

  return (
    <GameManagerProvider value={gameManager}>
      <Container ref={containerRef}>
        <Frame />
        <GameWorld />
      </Container>
    </GameManagerProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
