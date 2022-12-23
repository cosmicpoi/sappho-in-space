import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useColors, useGameManager } from "..";
import { t_v } from "../Utils/consts";
import { DEBUG_ENVIRONMENT } from "../Utils/debug";
import { unit_wToS } from "../Viewport/ViewportManager";
import { CharPixelStyle, CharPixelProps } from "./CharPixelTypes";
import { environmentColor } from "../Utils/colors";
import { ZIndex } from "../Utils/types";
import { useFrame } from "../Utils/Hooks";
import { randEl } from "../Utils/utils";
import { colorBlend } from "../Utils/ColorUtils";

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
  z-index: ${ZIndex.Characters};

  line-height: ${unit_wToS(1)}px;
  display: inline-block;

  transition: color 1s;

  ${({ hidden }) => hidden && "display: none;"}
  ${({ clr }) => clr && `color: ${clr};`}
  ${({ twinkle }) => twinkle && twinkleAnim}
  ${({ bold }) => bold && `font-weight: 900; font-style: italic;`}
`;

const Short = styled.span<{ h?: number }>`
  transform: scale(1, ${({ h }) => h || 0.7});
  display: inline-block;
`;
const ShortPipe = () => <Short>|</Short>;
const ShortTV = () => <Short h={0.6}>{t_v}</Short>;

export function CharPixel(props: CharPixelProps) {
  const { x, y, z, char, clr, opacity, isWall, twinkle, bold, typist } = props;
  const gM = useGameManager();

  const content = useMemo<React.ReactNode | string>(() => {
    if (char === "|") return <ShortPipe />;
    if (char === t_v) return <ShortTV />;
    return char;
  }, [char]);

  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    const unregister = gM.charPixelGridManager.registerPixel(
      { x, y },
      { z: z === undefined ? 0 : z, setHidden, isWall: !!isWall, char }
    );

    return unregister;
  }, [x, y, z, char, gM, setHidden, isWall]);

  // color management
  const { bg: bgColor, text: textColor } = useColors();

  const zoneColor: string | undefined = useMemo(() => {
    if (!DEBUG_ENVIRONMENT) return undefined;

    return environmentColor[gM.viewportManager.getEnvironment({ x, y })];
  }, [gM, x, y]);

  const color: string | undefined = useMemo(() => {
    if (zoneColor) return zoneColor;
    const o = opacity === undefined ? 1 : opacity;
    if (clr === undefined && o === 1) return undefined;

    const tColor = clr ? clr : textColor;

    return colorBlend(tColor, bgColor, o);
  }, [clr, bgColor, textColor, zoneColor, opacity]);

  // typist stuff
  const [typed, setTyped] = useState<boolean>(false);
  const [typeContent, setTypeContent] = useState<string | undefined>();
  const onFrame = useMemo(() => {
    if (!typist) return undefined;

    return (fc: number, lt: number) => {
      if (fc % 5 === 0) {
        if (Math.random() < 0.1)
          setTypeContent(randEl(["#", "%", "*", "*", "@", "^", ".", "."]));
        if (Math.random() < 0.1 || lt > 120) setTyped(true);
      }
    };
  }, [typist]);
  useFrame(onFrame);

  return (
    <StyledCharPixel
      hidden={hidden}
      clr={color}
      style={{
        left: unit_wToS(x) + "px",
        top: unit_wToS(y) + "px",
        // opacity: opacity,
        animationDelay:
          twinkle !== undefined ? `${(twinkle % 10) * 0.15}s` : undefined,
      }}
      twinkle={twinkle}
      bold={bold}
    >
      {typist && !typed ? typeContent : content}
    </StyledCharPixel>
  );
}
