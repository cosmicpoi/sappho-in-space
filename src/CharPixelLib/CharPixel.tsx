import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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

const twinklePeriod = 50;

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

  const [isDim, setIsDim] = useState<boolean>(false);
  const twinkleCB = useCallback(
    (fc: number) => {
      if (fc % 10 === 0 && twinkle !== undefined) {
        const p = twinklePeriod;
        if ((fc + (p / 10) * twinkle) % p === 0) {
          setIsDim((b) => !b);
        }
      }
    },
    [twinkle]
  );

  const color: string | undefined = useMemo(() => {
    if (zoneColor && !clr) return zoneColor;

    let o = opacity === undefined ? 1 : opacity;
    o *= isDim ? 0.2 : 1;
    if (clr === undefined && o === 1) return undefined;

    const tColor = clr ? clr : textColor;

    return colorBlend(tColor, bgColor, o);
  }, [clr, bgColor, textColor, zoneColor, opacity, isDim]);

  // typist stuff
  const [typed, setTyped] = useState<boolean>(false);
  const [typeContent, setTypeContent] = useState<string | undefined>();

  const typistCB = useMemo(() => {
    if (!typist) return undefined;

    return (fc: number, lt: number) => {
      if (fc % 5 === 0) {
        if (Math.random() < 0.1)
          setTypeContent(randEl(["#", "%", "*", "*", "@", "^", ".", "."]));
        if (Math.random() < 0.1 || lt > 120) setTyped(true);
      }
    };
  }, [typist]);

  // bind frame events
  const onFrame = useCallback(
    (fc: number, lt: number) => {
      twinkleCB(fc);
      if (typistCB) typistCB(fc, lt);
    },
    [typistCB, twinkleCB]
  );

  useFrame(onFrame);

  return (
    <StyledCharPixel
      hidden={hidden}
      clr={color}
      style={{
        left: unit_wToS(x) + "px",
        top: unit_wToS(y) + "px",
      }}
      twinkle={twinkle}
      bold={bold}
    >
      {typist && !typed ? typeContent : content}
    </StyledCharPixel>
  );
}
