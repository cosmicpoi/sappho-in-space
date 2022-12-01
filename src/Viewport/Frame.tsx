import * as React from "react";
import { useState } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Position } from "../Utils/Position";

function Framer({ x, y }: Position) {
  return <CharPixel char="@" z={0} x={x} y={y} color="red" />;
}

export function Frame() {
  const gM = useGameManager();
  const [width] = useState<number>(gM.viewportManager.getWidth());
  const [height] = useState<number>(gM.viewportManager.getHeight());

  return (
    <>
      <Framer x={0} y={0} />
      <Framer x={0} y={height - 1} />
      <Framer x={width - 1} y={0} />
      <Framer x={width - 1} y={height - 1} />
    </>
  );
}
