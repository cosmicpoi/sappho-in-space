import * as React from "react";
import { useState } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Wall } from "../Components/Wall";
import { DEBUG_WALL } from "../Utils/debug";
import { Position } from "../Utils/types";

function Framer({ x, y }: Position) {
  return (
    <CharPixel
      char="@"
      z={0}
      x={x}
      y={y}
      opacity={DEBUG_WALL ? 1 : 0}
      clr={"#FF0000"}
    />
  );
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
      <Wall hitbox={{ x: 0, y: 0, width, height: 1 }} />
      <Wall hitbox={{ x: 0, y: height - 1, width, height: 1 }} />
      <Wall hitbox={{ x: 0, y: 0, width: 1, height }} />
      <Wall hitbox={{ x: width - 1, y: 0, width: 1, height }} />
    </>
  );
}
