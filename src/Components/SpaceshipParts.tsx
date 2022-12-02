import * as React from "react";
import { useState, useLayoutEffect, useCallback } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { useFrame, useActor } from "../Utils/Hooks";
import { Position3D, Position, Direction } from "../Utils/types";
import { randIntRange, rotateByDirection } from "../Utils/utils";

// if there is more than one fragment on a pixel, turns into a .
// the effect of this is that when this is on top, it changes its appearance to a .
export function Collider({ x, y, z }: Position3D) {
  const [isTop, setTop] = useState<boolean>(false);
  const cpM = useGameManager().charPixelGridManager;

  useLayoutEffect(() => {
    // not entirely sure why we need both, I think it's because when x, y change something
    // weird happens with the observer where it doesn't update in the right order
    const sub = cpM.onPixelUpdate({ x, y }, () => {
      setTop(cpM.isOccupied({ x, y }));
    });
    setTop(cpM.isOccupied({ x, y }));

    return () => {
      sub.unsubscribe();
    };
  }, [x, y, z, cpM, setTop]);

  return (
    <CharPixel x={x} y={y} z={z} char={isTop ? "." : undefined} opacity={0.5} />
  );
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
  createdOn: number;
  id: number;
};

export const MAX_PARTICLE_LIFETIME = 60;
export const getParticleId = (function () {
  let id = 0;
  return (): number => {
    return id++;
  };
})();

export function RocketParticle({
  x,
  y,
  z,
  dir,
}: Position3D & {
  dir: Direction;
}) {
  const [delta, setDelta] = useState<Position>(
    rotateByDirection({ x: randIntRange(-1, 1), y: 2 }, dir)
  );

  const motion = useActor(delta);

  const [alive, setAlive] = useState<boolean>(true);

  const [char, setChar] = useState<string>("*");

  const onFrame = useCallback(
    (fc: number, lt: number) => {
      let displ = { x: 0, y: 20 };
      displ = rotateByDirection(displ, dir);
      motion.move(displ);

      if (lt > 0.5 * MAX_PARTICLE_LIFETIME) {
        setChar(".");
      }

      if (fc % 3 === 0) setDelta(motion.getPosition());

      if (lt > MAX_PARTICLE_LIFETIME) setAlive(false);
    },
    [motion, dir]
  );
  useFrame(onFrame);

  if (!alive) return <></>;
  return (
    <CharPixel
      x={x + delta.x}
      y={y + delta.y}
      z={z}
      char={char}
      opacity={0.5}
    />
  );
}
