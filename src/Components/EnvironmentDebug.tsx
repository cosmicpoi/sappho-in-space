import * as React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import { useGameManager } from "..";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Utils/consts";
import { useLog } from "../Utils/Hooks";
import { Position } from "../Utils/types";
import {
  dayNightMargin,
  ellipseHalfHeight,
  ellipseHalfWidth,
  unit_wToS,
} from "../Viewport/ViewportManager";

type BoxProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  line?: boolean;
};

const StyledBox = styled.div<BoxProps>`
  position: absolute;
  z-index: 0;
  ${({ line, width }) =>
    line
      ? width === 0
        ? `border-left: 5px solid red;`
        : `border-top: 5px solid red;`
      : ` border: 5px solid red;`}

  ${({ width, height, x, y }) => `
    width: ${unit_wToS(width)}px;
    height: ${unit_wToS(height)}px;
    left: ${unit_wToS(x)}px;
    top: ${unit_wToS(y)}px;
  `}
`;

const StyledEllipse = styled(StyledBox)`
  border-radius: 50%;
`;

export function EnvironmentDebug() {
  const gM = useGameManager();
  const center = useMemo<Position>(() => gM.viewportManager.getCenter(), [gM]);

  const dayNightBorder = useMemo<BoxProps>(() => {
    const k = (dayNightMargin / ellipseHalfWidth) ** 2;
    console.log(k);
    const RHS = ellipseHalfHeight * Math.sqrt(1 - k);

    return {
      x: center.x + dayNightMargin,
      y: center.y - RHS,
      width: 0,
      height: 2 * RHS,
    };
  }, [center]);

  useLog(dayNightBorder);

  return (
    <>
      <StyledEllipse
        width={ellipseHalfWidth * 2}
        height={ellipseHalfHeight * 2}
        x={center.x - ellipseHalfWidth}
        y={center.y - ellipseHalfHeight}
      />
      <StyledBox
        width={dayNightBorder.width}
        height={dayNightBorder.height}
        x={dayNightBorder.x}
        y={dayNightBorder.y}
        line
      />

      <StyledBox
        width={CANVAS_WIDTH / 2 - ellipseHalfWidth}
        height={0}
        x={center.x + ellipseHalfWidth}
        y={center.y}
        line
      />
      <StyledBox
        width={CANVAS_WIDTH / 2 - ellipseHalfWidth}
        height={0}
        x={0}
        y={center.y}
        line
      />
      <StyledBox
        height={CANVAS_HEIGHT / 2 - ellipseHalfHeight}
        width={0}
        x={center.x}
        y={center.y + ellipseHalfHeight}
        line
      />
      <StyledBox
        height={CANVAS_HEIGHT / 2 - ellipseHalfHeight}
        width={0}
        x={center.x}
        y={0}
        line
      />
    </>
  );
}
