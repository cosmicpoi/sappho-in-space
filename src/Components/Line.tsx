import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Position3D, TextAlign } from "../Utils/types";

export function Line({
  x,
  y,
  z,
  text,
  isWall,
  align,
}: Position3D & { text: string; isWall?: boolean; align?: TextAlign }) {
  const offX = useMemo(() => {
    const len = text.length;
    if (align === TextAlign.Center) return -Math.floor(len / 2);
    if (align === TextAlign.Right) return -len;
  }, [align, text]);

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
        />
      ))}
    </>
  );
}
