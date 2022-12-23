import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { CharPixelBlockProps } from "../CharPixelLib/CharPixelTypes";
import { getAlign } from "../Utils/utils";

export function LineText({
  x,
  y,
  z,
  text,
  isWall,
  align,
  clr,
  opacity,
  twinkle,
  bold,
  typist,
  transition,
}: CharPixelBlockProps) {
  const trimmed: number = useMemo(() => {
    const trimFront = text.replace(/^\s+/gm, "");
    const trimmed = text.length - trimFront.length;
    return trimmed;
  }, [text]);
  return (
    <>
      {text
        .split("")
        .map(
          (str: string, i: number) =>
            i >= trimmed && (
              <CharPixel
                x={x + i + getAlign(text.length, align)}
                y={y}
                z={z}
                char={str}
                key={i}
                isWall={isWall}
                clr={clr}
                opacity={opacity}
                twinkle={twinkle}
                bold={bold}
                typist={typist}
                transition={transition}
              />
            )
        )}
    </>
  );
}
