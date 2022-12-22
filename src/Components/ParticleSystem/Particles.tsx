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
  newParticle$: Monomitter<T>;

  constructor() {
    this.newParticle$ = monomitter();
  }

  public newParticle(p: T) {
    this.newParticle$.publish(p);
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

  const pushParticle = useCallback(
    (newP: T) => {
      setParticles((oldpl: T[]) => {
        // if there exists a dead particle, replace it in-place
        let pl: T[];
        let idx = -1;
        for (let i = 0; i < oldpl.length; i++) {
          if (oldpl[i]?.alive !== true) {
            idx = i;
            pl = [...oldpl];
            pl[i] = newP;
            break;
          }
        }

        // if there was nowhere to add it, increase array size
        if (idx === -1) {
          pl = [...oldpl, ...Array(undefined).fill(oldpl.length)];
        }

        return pl;
      });
    },
    [setParticles]
  );

  useEffect(() => {
    const sub = handle.newParticle$.subscribe((p: T) => {
      pushParticle(p);
    });

    return sub.unsubscribe;
  }, [handle, pushParticle]);

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
