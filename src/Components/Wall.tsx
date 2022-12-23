import * as React from "react";
import styled from "styled-components";
import { DEBUG_WALL } from "../Utils/debug";
import { unit_wToS } from "../Viewport/ViewportManager";
import { Hitbox, ZIndex } from "../Utils/types";
import { useSolid } from "../Utils/Hooks";

const StyledDebugBox = styled.div.attrs<Hitbox>(({ x, y }) => ({
  style: {
    left: unit_wToS(x) + "px",
    top: unit_wToS(y) + "px",
  },
}))<Hitbox>`
  position: absolute;
  width: ${({ width }) => unit_wToS(width)}px;
  height: ${({ height }) => unit_wToS(height)}px;
  z-index: ${ZIndex.Walls};

  background: red;
`;

export function DebugBox({ hitbox }: { hitbox: Hitbox }) {
  const { x, y, width, height } = hitbox;

  if (DEBUG_WALL)
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
  useSolid(hitbox);

  return <DebugBox hitbox={hitbox}></DebugBox>;
}
