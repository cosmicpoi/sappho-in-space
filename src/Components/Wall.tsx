import * as React from "react";
import { useEffect } from "react";
import { useGameManager } from "..";
import styled from "styled-components";
import { DEBUG } from "../Utils/debug";
import { unit_wToS } from "../Viewport/ViewportManager";
import { Hitbox } from "../Utils/types";

const StyledDebugBox = styled.div.attrs<Hitbox>(({ x, y }) => ({
  style: {
    left: unit_wToS(x) + "px",
    top: unit_wToS(y) + "px",
  },
}))<Hitbox>`
  position: absolute;
  width: ${({ width }) => unit_wToS(width)}px;
  height: ${({ height }) => unit_wToS(height)}px;
  z-index: -1000;

  background: red;
`;

export function DebugBox({ hitbox }: { hitbox: Hitbox }) {
  const { x, y, width, height } = hitbox;

  if (DEBUG)
    return (
      <StyledDebugBox
        x={x}
        y={y}
        height={height}
        width={width}
      ></StyledDebugBox>
    );
  else return <></>;
}

export function Wall({ hitbox }: { hitbox: Hitbox }) {
  const { x, y, width, height } = hitbox;
  const gM = useGameManager();
  useEffect(() => {
    return gM.collisionManager.registerHitbox({
      x,
      y,
      width,
      height,
    });
  }, [x, y, gM, width, height]);

  return <DebugBox hitbox={hitbox}></DebugBox>;
}
