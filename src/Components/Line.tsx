import * as React from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { CharPixelBlockProps } from "../CharPixelLib/CharPixelTypes";
import { getAlign } from "../Utils/utils";

export function Line({
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
}: CharPixelBlockProps) {
  return (
    <>
      {text
        .split("")
        .map(
          (str: string, i: number) =>
            str !== "_" && (
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
              />
            )
        )}
    </>
  );
}
