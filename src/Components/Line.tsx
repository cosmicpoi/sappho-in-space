import * as React from "react";
import { CharPixel, CharPixelStyle } from "../CharPixelLib/CharPixel";
import { useAlign } from "../Utils/Hooks";
import { Position3D, TextAlign } from "../Utils/types";

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
}: Position3D &
  CharPixelStyle & { text: string; isWall?: boolean; align?: TextAlign }) {
  const offX = useAlign(text.length, align);

  return (
    <>
      {text.split("").map((str: string, i: number) => (
        <CharPixel
          x={x + i + offX}
          y={y}
          z={z}
          char={str}
          key={i}
          isWall={isWall}
          color={color}
          opacity={opacity}
          twinkle={twinkle}
        />
      ))}
    </>
  );
}
