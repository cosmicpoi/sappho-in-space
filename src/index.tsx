import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { EnvironmentDebug } from "./Components/EnvironmentDebug";
import { FloatingBG } from "./Components/FloatingBG";
import { GameManager } from "./Engine/GameManager";
import { GameWorld } from "./GameWorld";
import { ColorData, COLORS, defaultColorData } from "./Utils/colors";
import { createDefinedContext } from "./Utils/createDefinedContext";
import {
  DEBUG_START_POS,
  DEBUG_ENVIRONMENT,
  DEBUG_SCROLL,
} from "./Utils/debug";
import { useEmittedValue } from "./Utils/Hooks";
import { ZIndex } from "./Utils/types";
import { Frame } from "./Viewport/Frame";

const Container = styled.div<{ clr: string; background: string }>`
  width: 100%;
  height: 100%;
  overflow: ${DEBUG_SCROLL ? "scroll" : "hidden"};
  position: relative;
  z-index: ${ZIndex.Container};
  /* font-size: 14px; */

  ${({ clr }) => !DEBUG_ENVIRONMENT && `color: ${clr};`}
  ${({ background }) => `background: ${background};`}
  transition: background 2s, color 2.5s;
`;

export const {
  useDefinedContext: useGameManager,
  provider: GameManagerProvider,
} = createDefinedContext<GameManager>();

export const ColorContext = React.createContext<ColorData>({
  bg: COLORS.bgNight,
  text: COLORS.colorNight,
});

export const useColors = () => React.useContext(ColorContext);

function App() {
  const [gameManager] = useState<GameManager>(() => new GameManager());

  const containerRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (containerRef.current)
      gameManager.viewportManager.setContainer(containerRef.current);
  }, [containerRef, gameManager]);

  useEffect(() => {
    if (DEBUG_START_POS !== undefined) {
      const c = gameManager.viewportManager.getCenter();
      gameManager.viewportManager.scrollWorld(
        c.x + DEBUG_START_POS.x,
        c.y + DEBUG_START_POS.y
      );
    } else gameManager.viewportManager.scrollToCenter();
  }, [containerRef, gameManager]);

  useEffect(() => {
    return gameManager.initialize();
  }, [gameManager]);

  const cData = useEmittedValue<ColorData>(
    gameManager.colorManager.colorData$,
    defaultColorData
  );

  return (
    <GameManagerProvider value={gameManager}>
      <ColorContext.Provider value={cData}>
        <Container ref={containerRef} clr={cData.text} background={cData.bg}>
          <FloatingBG bg={cData.floatBg} />
          <Frame />
          {DEBUG_ENVIRONMENT && <EnvironmentDebug />}
          <GameWorld />
        </Container>
      </ColorContext.Provider>
    </GameManagerProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
