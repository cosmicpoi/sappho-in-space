import * as React from "react";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useGameManager } from "..";
import { PIXEL_WIDTH, t_v } from "../Utils/consts";
import { Position, Position3D } from "../Utils/Position";

type StyledCharPixelProps = Position & { hidden?: boolean; color?: string };

const StyledCharPixel = styled.span.attrs<StyledCharPixelProps>(({ x, y }) => ({
  style: {
    left: x * PIXEL_WIDTH + "px",
    top: y * PIXEL_WIDTH + "px",
  },
}))<StyledCharPixelProps>`
  position: absolute;
  width: ${PIXEL_WIDTH}px;
  height: ${PIXEL_WIDTH}px;

  /* background: yellow; */
  /* outline: 1px solid red; */

  line-height: ${PIXEL_WIDTH}px;
  display: inline-block;

  ${({ hidden }) => hidden && "opacity: 0;"}
  ${({ color }) => color && `color: ${color};`}
`;

const Short = styled.span<{ h?: number }>`
  transform: scale(1, ${({ h }) => h || 0.7});
  display: inline-block;
`;
const ShortPipe = () => <Short>|</Short>;
const ShortTV = () => <Short h={0.6}>{t_v}</Short>;

export type CharPixelProps = Position3D & { char: string; color?: string };
export function CharPixel({ x, y, z, char, color }: CharPixelProps) {
  const gM = useGameManager();

  var content: React.ReactNode | string = char;

  if (char === "|") content = <ShortPipe />;
  if (char === t_v) content = <ShortTV />;

  const [hidden, setHidden] = useState<boolean>(false);

  useLayoutEffect(() => {
    // if (char === " ") return;
    const unregister = gM.charPixelGridManager.registerPixel(
      { x, y },
      z || 0,
      setHidden
    );

    return unregister;
  }, [x, y, z, char]);

  return (
    <StyledCharPixel x={x} y={y} hidden={hidden} color={color}>
      {content}
    </StyledCharPixel>
  );
}