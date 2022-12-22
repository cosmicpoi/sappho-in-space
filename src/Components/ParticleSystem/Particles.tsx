import autoBind from "auto-bind";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { ActorData } from "../../Engine/Actor";
import { GameManager } from "../../Engine/GameManager";
import { useFrame } from "../../Utils/Hooks";
import { monomitter, Monomitter } from "../../Utils/Monomitter";
import { Layer } from "../../Utils/types";

export const getParticleId = (function () {
  let id = 0;
  return (): number => {
    return id++;
  };
})();

export class Particle {
  motion: ActorData;
  x: number;
  y: number;
  alive: boolean;
  char: string | undefined;

  lifetime = 0;

  updated = true;

  constructor(gM: GameManager, x: number, y: number, char: string) {
    autoBind(this);
    this.x = x;
    this.y = y;
    this.motion = new ActorData(gM, { x, y });

    this.char = char;
    this.alive = true;
  }

  public onFrame(_fc: number) {
    const didChange = this.motion.onFrame();
    const pos = this.motion.getPosition();
    this.x = pos.x;
    this.y = pos.y;
    this.lifetime++;

    if (didChange) this.updated = false;
  }
}

export class ParticlesHandle<T extends Particle> {
  newParticles$: Monomitter<T[]>;

  constructor() {
    this.newParticles$ = monomitter();
  }

  public newParticle(p: T) {
    this.newParticles$.publish([p]);
  }
  public newParticles(p: T[]) {
    this.newParticles$.publish(p);
  }
}

export function Particles<T extends Particle>({
  handle,
  z,
  opacity,
}: {
  handle: ParticlesHandle<T>;
  z?: number;
  opacity?: number;
}) {
  const [particles, setParticles] = useState<T[]>(Array(16).fill(undefined));

  const pushParticles = useCallback(
    (newPs: T[]) => {
      setParticles((oldpl: T[]) => {
        let newpl = [...oldpl];

        for (const newP of newPs) {
          // if there exists a dead particle, replace it in-place
          let idx = -1;
          for (let i = 0; i < newpl.length; i++) {
            if (newpl[i]?.alive !== true) {
              idx = i;
              newpl[i] = newP;
              break;
            }
          }

          // if there was nowhere to add it, increase array size
          if (idx === -1) {
            const len = newpl.length;
            newpl = [...newpl, ...Array(undefined).fill(len)];
            newpl[len] = newP;
          }
        }

        return newpl;
      });
    },
    [setParticles]
  );

  useEffect(() => {
    const sub = handle.newParticles$.subscribe((p: T[]) => {
      pushParticles(p);
    });

    return sub.unsubscribe;
  }, [handle, pushParticles]);

  const onFrame = useCallback(
    (fc: number) => {
      setParticles((oldpl: T[]) => {
        const newpl = [...oldpl];
        for (let i = 0; i < newpl.length; i++) {
          if (newpl[i]?.alive === true) newpl[i].onFrame(fc);
        }

        if (fc % 3 === 0) {
          let update = false;
          for (let i = 0; i < newpl.length; i++) {
            if (newpl[i]?.updated === false) update = true;
          }
          if (update) return newpl;
        }

        return oldpl;
      });
    },
    [setParticles]
  );
  useFrame(onFrame);

  return (
    <>
      {particles.map((particle: T, i: number) => (
        <CharPixel
          x={particle?.alive ? particle.x : 0}
          y={particle?.alive ? particle.y : 0}
          z={z !== undefined ? z : Layer.Particles}
          key={i}
          opacity={opacity}
          char={particle?.alive ? particle.char : undefined}
        />
      ))}
    </>
  );
}
