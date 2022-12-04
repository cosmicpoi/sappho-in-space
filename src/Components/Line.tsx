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
  color,
  opacity,
  twinkle,
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
                color={color}
                opacity={opacity}
                twinkle={twinkle}
              />
            )
        )}
    </>
  );
}
