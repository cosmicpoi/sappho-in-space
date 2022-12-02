import * as React from "react";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useGameManager } from "..";
import { t_v } from "../Utils/consts";
import { Position3D } from "../Utils/types";
import { unit_wToS } from "../Viewport/ViewportManager";

type CharPixelStyle = {
  color?: string;
  opacity?: number;
};
type StyledCharPixelProps = CharPixelStyle & {
  hidden?: boolean;
};

const StyledCharPixel = styled.span<StyledCharPixelProps>`
  position: absolute;
  width: ${unit_wToS(1)}px;
  height: ${unit_wToS(1)}px;

  /* background: yellow; */
  /* outline: 1px solid red; */

  line-height: ${unit_wToS(1)}px;
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

export type CharPixelProps = Position3D &
  CharPixelStyle & { char: string | undefined; isWall?: boolean };
export function CharPixel(props: CharPixelProps) {
  const { x, y, z, char, color, opacity, isWall } = props;
  const gM = useGameManager();

  let content: React.ReactNode | string = char;

  if (char === "|") content = <ShortPipe />;
  if (char === t_v) content = <ShortTV />;

  const [hidden, setHidden] = useState<boolean>(false);

  useLayoutEffect(() => {
    const unregister = gM.charPixelGridManager.registerPixel(
      { x, y },
      { z: z || 0, setHidden, isWall: !!isWall, char }
    );

    return unregister;
  }, [x, y, z, char, gM, setHidden, isWall]);

  return (
    <StyledCharPixel
      hidden={hidden}
      color={color}
      opacity={opacity}
      style={{
        left: unit_wToS(x) + "px",
        top: unit_wToS(y) + "px",
      }}
    >
      {content}
    </StyledCharPixel>
  );
}
