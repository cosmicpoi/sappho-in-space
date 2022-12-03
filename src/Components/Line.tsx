import * as React from "react";
import { useMemo } from "react";
import { CharPixel, CharPixelStyle } from "../CharPixelLib/CharPixel";
import { Position3D, TextAlign } from "../Utils/types";

export function useAlign(text: string, align: TextAlign): number {
  const offX = useMemo(() => {
    const len = text.length;
    if (align === TextAlign.Center) return -Math.floor(len / 2);
    if (align === TextAlign.Right) return -len;
    else return 0;
  }, [align, text]);

  return offX;
}

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
  const offX = useAlign(text, align);

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
