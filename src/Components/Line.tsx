import * as React from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Position3D } from "../Utils/Position";

export function Line({ x, y, z, text }: Position3D & { text: string }) {
  return (
    <>
      {text.split("").map((str: string, i: number) => (
        <CharPixel x={x + i} y={y} z={z} char={str} key={i} />
      ))}
    </>
  );
}
