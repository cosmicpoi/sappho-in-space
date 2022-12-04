import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { GameManager } from "./Engine/GameManager";
import { GameWorld } from "./GameWorld";
import {
  COLORS,
  Environment,
  environmentBackground,
  environmentColor,
} from "./Utils/colors";
import { createDefinedContext } from "./Utils/createDefinedContext";
import { SCROLL_DEBUG } from "./Utils/debug";
import { Frame } from "./Viewport/Frame";

const Container = styled.div<{ color: string; background: string }>`
  width: 100%;
  height: 100%;
  overflow: ${SCROLL_DEBUG ? "scroll" : "hidden"};
  position: relative;

  ${({ color }) => `color: ${color};`}
  ${({ background }) => `background: ${background};`}
  transition: background 2s, color 2.5s;
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

  const [environment, setEnvironment] = useState<Environment>(
    Environment.DEFAULT
  );
  const [color, setColor] = useState<string>(COLORS.colorNight);
  const [background, setBackground] = useState<string>(COLORS.bgNight);
  useEffect(() => {
    const sub = gameManager.viewportManager.colorChange$.subscribe(
      (e: Environment) => {
        setEnvironment(e);
      }
    );
    return sub.unsubscribe;
  }, [gameManager, setEnvironment]);

  useEffect(() => {
    setColor(environmentColor[environment]);
    setBackground(environmentBackground[environment]);
  }, [environment, setColor, setBackground]);

  return (
    <GameManagerProvider value={gameManager}>
      <Container ref={containerRef} color={color} background={background}>
        <Frame />
        <GameWorld />
      </Container>
    </GameManagerProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
