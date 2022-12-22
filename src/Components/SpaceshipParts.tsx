import autoBind from "auto-bind";
import * as React from "react";
import { useState, useLayoutEffect } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { GameManager } from "../Engine/GameManager";
import { Position3D, Position, Direction } from "../Utils/types";
import { rotateByDirection } from "../Utils/utils";
import { Particle } from "./ParticleSystem/Particles";

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

export class RocketParticle extends Particle {
  private dir: Direction;
  constructor(gM: GameManager, x: number, y: number, dir: Direction) {
    super(gM, x, y, "*");
    autoBind(this);
    this.dir = dir;
  }

  public onFrame(_fc: number) {
    let displ = { x: 0, y: 20 };
    displ = rotateByDirection(displ, this.dir);

    if (this.lifetime > MAX_PARTICLE_LIFETIME) {
      this.alive = false;
      this.updated = false;
    } else if (this.lifetime > MAX_PARTICLE_LIFETIME / 2) {
      this.char = ".";
      this.updated = false;
    }

    this.motion.setVelocity(displ);
    super.onFrame(_fc);
  }
}
