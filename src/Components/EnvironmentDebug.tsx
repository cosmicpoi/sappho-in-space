import * as React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import { useGameManager } from "..";
import { COLORS } from "../Utils/colors";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Utils/consts";
import { Position, ZIndex } from "../Utils/types";
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
};

const StyledBox = styled.div<BoxProps & { background?: string }>`
  position: absolute;
  z-index: ${ZIndex.Environment};
  /* border: 5px solid red; */

  ${({ background }) => `background: ${background};`}

  ${({ width, height, x, y }) => `
    width: ${unit_wToS(width)}px;
    height: ${unit_wToS(height)}px;
    left: ${unit_wToS(x)}px;
    top: ${unit_wToS(y)}px;
  `}
`;

const StyledEllipse = styled(StyledBox)`
  border-radius: 50%;
  overflow: hidden;
`;

export function EnvironmentDebug() {
  const gM = useGameManager();
  const center = useMemo<Position>(() => gM.viewportManager.getCenter(), [gM]);

  const dayNightBorder = useMemo<BoxProps>(() => {
    const k = (dayNightMargin / ellipseHalfWidth) ** 2;
    const RHS = ellipseHalfHeight * Math.sqrt(1 - k);

    return {
      x: center.x + dayNightMargin,
      y: center.y - RHS,
      width: 0,
      height: 2 * RHS,
    };
  }, [center]);

  return (
    <>
      <StyledBox
        width={dayNightBorder.width}
        height={dayNightBorder.height}
        x={dayNightBorder.x}
        y={dayNightBorder.y}
        // line
      />

      <StyledBox
        width={CANVAS_WIDTH / 2}
        height={CANVAS_HEIGHT / 2}
        x={0}
        y={0}
        background={COLORS.bgWinter}
      />
      <StyledBox
        width={CANVAS_WIDTH / 2}
        height={CANVAS_HEIGHT / 2}
        x={center.x}
        y={0}
        background={COLORS.bgSpring}
      />
      <StyledBox
        width={CANVAS_WIDTH / 2}
        height={CANVAS_HEIGHT / 2}
        x={0}
        y={center.y}
        background={COLORS.bgAutumn}
      />
      <StyledBox
        width={CANVAS_WIDTH / 2}
        height={CANVAS_HEIGHT / 2}
        x={center.x}
        y={center.y}
        background={COLORS.bgSummer}
      />

      <StyledEllipse
        width={ellipseHalfWidth * 2}
        height={ellipseHalfHeight * 2}
        x={center.x - ellipseHalfWidth}
        y={center.y - ellipseHalfHeight}
        background={COLORS.bgNight}
      >
        <StyledBox
          width={ellipseHalfWidth}
          height={ellipseHalfHeight * 4}
          x={ellipseHalfWidth + dayNightMargin}
          y={0}
          background={COLORS.bgDay}
        />
      </StyledEllipse>
    </>
  );
}
