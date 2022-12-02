import * as React from "react";
import { useState, useLayoutEffect, useCallback } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { useFrame, useObjectMotion } from "../Utils/Hooks";
import { Position, Position3D } from "../Utils/Position";
import {
  Direction,
  randIntRange,
  randomRange,
  rotateByDirection,
} from "../Utils/utils";

// if there is more than one fragment on a pixel, turns into a .
// the effect of this is that when this is on top, it changes its appearance to a .
export function Collider({ x, y, z }: Position3D) {
  const [isTop, setTop] = useState<boolean>(false);
  const cpM = useGameManager().charPixelGridManager;

  useLayoutEffect(() => {
    const sub = cpM.onPixelUpdate({ x, y }, () => {
      setTop(cpM.isOccupied({ x, y }));
    });

    return sub.unsubscribe;

    // setTop(cpM.isOccupied({ x, y }));
  }, [x, y, z, cpM, setTop]);

  return <CharPixel x={x} y={y} z={z} char={isTop ? "." : " "} opacity={0.8} />;
}
export function SpaceshipPart({
  x,
  y,
  z,
  char,
}: Position3D & { char: string }) {
  if (char === " ") return <Collider x={x} y={y} z={z} />;
  else return <CharPixel x={x} y={y} z={z} char={char} />;
}

export type RocketParticleData = Position & {
  dir: Direction;
};
export function RocketParticle({
  x,
  y,
  z,
  dir,
}: Position3D & RocketParticleData) {
  const [delta, setDelta] = useState<Position>(
    rotateByDirection({ x: randIntRange(-1, 1), y: 2 }, dir)
  );

  const motion = useObjectMotion(delta);

  const [alive, setAlive] = useState<boolean>(true);

  const onFrame = useCallback(
    (_fc: number, lt: number) => {
      let displ = { x: randomRange(-2, 2), y: 8 };
      displ = rotateByDirection(displ, dir);
      motion.move(displ);
      setDelta(motion.getPosition());

      if (lt > 120) setAlive(false);
    },
    [motion, dir]
  );
  useFrame(onFrame);

  if (!alive) return <></>;
  return <CharPixel x={x + delta.x} y={y + delta.y} z={z} char="*" />;
}
