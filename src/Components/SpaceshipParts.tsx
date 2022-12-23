import autoBind from "auto-bind";
import * as React from "react";
import { useState, useLayoutEffect } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { GameManager } from "../Engine/GameManager";
import { Position3D, Position, Direction } from "../Utils/types";
import { randIntRange, rotateByDirection } from "../Utils/utils";
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
    const delta = rotateByDirection({ x: randIntRange(-1, 1), y: 2 }, dir);

    super(gM, x + delta.x, y + delta.y, "*");
    autoBind(this);
    this.dir = dir;
  }

  public onFrame(_fc: number) {
    let displ = { x: 0, y: 0.33 };
    displ = rotateByDirection(displ, this.dir);

    if (this.lifetime > MAX_PARTICLE_LIFETIME) {
      this.die();
    } else if (this.lifetime > MAX_PARTICLE_LIFETIME / 2) {
      this.setChar(".");
    }

    this.motion.setVelocity(displ);
    super.onFrame(_fc);
  }
}

const HEART_RAMPUP = 30;
const HEART_DELAY = 60;
const HEART_RAMPDOWN = 20;
enum HeartState {
  RampUp,
  Full,
  RampDown,
}
export class HeartParticle extends Particle {
  targetx: number;
  targety: number;

  tx: number;
  ty: number;

  private state: HeartState = HeartState.RampUp;
  private lt = 0;

  constructor(gM: GameManager, x: number, y: number, tx: number, ty: number) {
    super(gM, x, y, "+");
    autoBind(this);

    this.targetx = x + tx;
    this.targety = y + ty;
    this.tx = tx;
    this.ty = ty;
  }

  public onFrame(_fc: number) {
    switch (this.state) {
      case HeartState.RampUp:
        this.motion.setVelocity({
          x: this.tx / HEART_RAMPUP,
          y: this.ty / HEART_RAMPUP,
        });

        if (this.lt > HEART_RAMPUP) {
          this.lt = 0;
          this.state = HeartState.Full;
        }

        break;
      case HeartState.Full:
        this.motion.setVelocity({ x: 0, y: 0 });
        if (this.lt > HEART_DELAY) {
          this.lt = 0;
          this.state = HeartState.RampDown;
        }
        break;
      case HeartState.RampDown:
        if (this.lt > HEART_RAMPDOWN) {
          this.die();
          return;
        }

        this.motion.setVelocity({
          x: -this.tx / HEART_RAMPDOWN,
          y: -this.ty / HEART_RAMPDOWN,
        });

        break;
    }

    this.lt++;
    super.onFrame(_fc);
  }
}

export const heartParticles = (
  gM: GameManager,
  x: number,
  y: number
): HeartParticle[] => [
  new HeartParticle(gM, x, y, 3, 0),
  new HeartParticle(gM, x, y, 3, -1),
  new HeartParticle(gM, x, y, 3, -2),

  new HeartParticle(gM, x, y, -3, 0),
  new HeartParticle(gM, x, y, -3, -1),
  new HeartParticle(gM, x, y, -3, -2),

  new HeartParticle(gM, x, y, -2, -3),
  new HeartParticle(gM, x, y, -1, -3),
  new HeartParticle(gM, x, y, 0, -2),
  new HeartParticle(gM, x, y, 1, -3),
  new HeartParticle(gM, x, y, 2, -3),

  new HeartParticle(gM, x, y, -2, 1),
  new HeartParticle(gM, x, y, 2, 1),
  new HeartParticle(gM, x, y, -1, 2),
  new HeartParticle(gM, x, y, 1, 2),
  new HeartParticle(gM, x, y, 0, 3),
];
