import * as React from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Position3D } from "../Utils/types";

export function Line({
  x,
  y,
  z,
  text,
  isWall,
}: Position3D & { text: string; isWall?: boolean }) {
  return (
    <>
      {text.split("").map((str: string, i: number) => (
        <CharPixel x={x + i} y={y} z={z} char={str} key={i} isWall={isWall} />
      ))}
    </>
  );
}
