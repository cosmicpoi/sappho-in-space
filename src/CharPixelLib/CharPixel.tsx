import * as React from "react";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useGameManager } from "..";
import { PIXEL_WIDTH, t_v } from "../Utils/consts";
import { Position, Position3D } from "../Utils/Position";

type CharPixelStyle = {
  color?: string;
  opacity?: number;
};
type StyledCharPixelProps = CharPixelStyle & {
  hidden?: boolean;
};

const StyledCharPixel = styled.span<StyledCharPixelProps>`
  position: absolute;
  width: ${PIXEL_WIDTH}px;
  height: ${PIXEL_WIDTH}px;

  /* background: yellow; */
  /* outline: 1px solid red; */

  line-height: ${PIXEL_WIDTH}px;
  display: inline-block;

  ${({ opacity }) => opacity && `opacity: ${opacity};`}
  ${({ hidden }) => hidden && "display: none;"}
  ${({ color }) => color && `color: ${color};`}
`;

const Short = styled.span<{ h?: number }>`
  transform: scale(1, ${({ h }) => h || 0.7});
  display: inline-block;
`;
const ShortPipe = () => <Short>|</Short>;
const ShortTV = () => <Short h={0.6}>{t_v}</Short>;

export type CharPixelProps = Position3D & CharPixelStyle & { char: string };
export function CharPixel({ x, y, z, char, color, opacity }: CharPixelProps) {
  const gM = useGameManager();

  let content: React.ReactNode | string = char;

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
  }, [x, y, z, char, gM, setHidden]);

  return (
    <StyledCharPixel
      hidden={hidden}
      color={color}
      opacity={opacity}
      style={{
        left: x * PIXEL_WIDTH + "px",
        top: y * PIXEL_WIDTH + "px",
      }}
    >
      {content}
    </StyledCharPixel>
  );
}
