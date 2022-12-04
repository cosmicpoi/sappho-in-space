import * as React from "react";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useGameManager } from "..";
import { t_v } from "../Utils/consts";
import { unit_wToS } from "../Viewport/ViewportManager";
import { CharPixelStyle, CharPixelProps } from "./CharPixelTypes";

type StyledCharPixelProps = CharPixelStyle & {
  hidden?: boolean;
};

const twinkleFrames = keyframes`
  from {
    filter: opacity(0.2);
  }

  to {
    filter: opacity(1.0);
  }
`;
const twinkleAnim = css`
  animation: ${twinkleFrames} 1.5s alternate-reverse linear infinite;
`;

const StyledCharPixel = styled.span<StyledCharPixelProps>`
  position: absolute;
  width: ${unit_wToS(1)}px;
  height: ${unit_wToS(1)}px;

  /* background: yellow; */
  /* outline: 1px solid red; */

  line-height: ${unit_wToS(1)}px;
  display: inline-block;

  ${({ hidden }) => hidden && "display: none;"}
  ${({ color }) => color && `color: ${color};`}
  ${({ twinkle }) => twinkle && twinkleAnim}
`;

const Short = styled.span<{ h?: number }>`
  transform: scale(1, ${({ h }) => h || 0.7});
  display: inline-block;
`;
const ShortPipe = () => <Short>|</Short>;
const ShortTV = () => <Short h={0.6}>{t_v}</Short>;

export function CharPixel(props: CharPixelProps) {
  const { x, y, z, char, color, opacity, isWall, twinkle } = props;
  const gM = useGameManager();

  let content: React.ReactNode | string = char;

  if (char === "|") content = <ShortPipe />;
  if (char === t_v) content = <ShortTV />;

  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    const unregister = gM.charPixelGridManager.registerPixel(
      { x, y },
      { z: z === undefined ? 0 : z, setHidden, isWall: !!isWall, char }
    );

    return unregister;
  }, [x, y, z, char, gM, setHidden, isWall]);

  return (
    <StyledCharPixel
      hidden={hidden}
      color={color}
      style={{
        left: unit_wToS(x) + "px",
        top: unit_wToS(y) + "px",
        opacity: opacity,
        animationDelay:
          twinkle !== undefined ? `${(twinkle % 10) * 0.15}s` : undefined,
      }}
      twinkle={twinkle}
    >
      {content}
    </StyledCharPixel>
  );
}
