import * as React from "react";
import { useCallback, useLayoutEffect, useState } from "react";
import { useGameManager } from "..";
import { t_v } from "../Utils/consts";
import {
  useFrame,
  useManyKeysDown,
  useManyKeysUp,
  useActor,
} from "../Utils/Hooks";
import { Direction, Hitbox } from "../Utils/types";
import { directionFromKey, directionKeys } from "../Utils/utils";
import {
  SpaceshipPart,
  Collider,
  RocketParticle,
  RocketParticleData,
  MAX_PARTICLE_LIFETIME,
  getParticleId,
} from "./SpaceshipParts";

const spaceshipCharsDown = [
  ["v", " ", "v"],
  ["|", "–", "|"],
  [" ", "v", " "],
];
const spaceshipCharsUp = [
  [" ", t_v, " "],
  ["|", "–", "|"],
  [t_v, " ", t_v],
];
const spaceshipCharsRight = [
  [">", "–", " "],
  [" ", "|", ">"],
  [">", "–", " "],
];
const spaceshipCharsLeft = [
  [" ", "–", "<"],
  ["<", "|", " "],
  [" ", "–", "<"],
];
const dirChars: string[][][] = [
  spaceshipCharsUp,
  spaceshipCharsLeft,
  spaceshipCharsDown,
  spaceshipCharsRight,
];

const TERM_V = 20; // 12 units / sec
const spaceshipHitbox: Hitbox = {
  x: -1,
  y: -1,
  width: 3,
  height: 3,
};
export function Spaceship() {
  const gM = useGameManager();
  const { viewportManager: vM, inputManager: iM } = gM;

  // basic spaceship stuff
  const [faceDir, setFaceDir] = useState<Direction>(Direction.Up);
  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);

  const motion = useActor({
    x,
    y,
    collides: true,
    termV: TERM_V,
    hitbox: spaceshipHitbox,
  });

  const [chars, setChars] = useState<string[][]>(spaceshipCharsRight);

  // manage particles
  const [particles, setParticles] = useState<RocketParticleData[]>([]);
  const newParticle = useCallback(
    (createdOn: number) => {
      const { x, y } = motion.getPosition();
      setParticles((p) => [
        ...p,
        { x, y, dir: faceDir, createdOn, id: getParticleId() },
      ]);
    },
    [faceDir, motion]
  );

  // spaceship control
  const onFrame = useCallback(
    (fc: number) => {
      // handle motion
      const hoz = iM.resolveHozDirection();
      const vert = iM.resolveVertDirection();

      motion.setAcceleration({ x: hoz * 1.8, y: vert * 1.8 });
      motion.onFrame(true);

      const { x: nX, y: nY } = motion.getPosition();
      setX(nX);
      setY(nY);

      // make new particles
      if (hoz !== 0 || vert !== 0) {
        if (fc % 5 === 0) newParticle(fc);
      }

      // clear out old particles every now and then
      if (fc % (2 * MAX_PARTICLE_LIFETIME) === 0) {
        setParticles((pl) =>
          pl.filter(
            (p: RocketParticleData) => fc - p.createdOn < MAX_PARTICLE_LIFETIME
          )
        );
      }
    },
    [iM, setX, setY, motion, newParticle, setParticles]
  );
  useFrame(onFrame);

  const onKeyDown = useCallback(
    (k: string) => {
      setFaceDir(directionFromKey(k));
    },
    [setFaceDir]
  );
  useManyKeysDown(directionKeys, onKeyDown);

  const onKeyUp = useCallback(
    (_k: string) => {
      const single = gM.inputManager.getSingleDirection();
      if (single !== undefined) setFaceDir(single);
    },
    [gM]
  );
  useManyKeysUp(directionKeys, onKeyUp);
  // sync chars to direction
  useLayoutEffect(() => {
    setChars(dirChars[faceDir]);
  }, [faceDir]);

  // camera control
  useLayoutEffect(() => {
    vM.follow({ x, y });
    vM.requestColor({x, y});
  }, [x, y, vM]);


  return (
    <>
      {/* First col */}
      <>
        <SpaceshipPart x={x - 1} y={y - 1} char={chars[0][0]} />
        <SpaceshipPart x={x - 1} y={y + 0} char={chars[1][0]} />
        <SpaceshipPart x={x - 1} y={y + 1} char={chars[2][0]} />
      </>
      {/* Second col */}
      <>
        <SpaceshipPart x={x + 0} y={y - 1} char={chars[0][1]} />
        <SpaceshipPart x={x + 0} y={y + 0} char={chars[1][1]} />
        <SpaceshipPart x={x + 0} y={y + 1} char={chars[2][1]} />
      </>
      {/* Third col */}
      <>
        <SpaceshipPart x={x + 1} y={y - 1} char={chars[0][2]} />
        <SpaceshipPart x={x + 1} y={y + 0} char={chars[1][2]} />
        <SpaceshipPart x={x + 1} y={y + 1} char={chars[2][2]} />
      </>
      {/* Vertical Colliders */}
      <Collider x={x - 1} y={y - 2} />
      <Collider x={x + 0} y={y - 2} />
      <Collider x={x + 1} y={y - 2} />
      <Collider x={x - 1} y={y + 2} />
      <Collider x={x + 0} y={y + 2} />
      <Collider x={x + 1} y={y + 2} />
      {/* Horizontal Colliders */}
      <Collider x={x - 2} y={y - 1} />
      <Collider x={x - 2} y={y + 0} />
      <Collider x={x - 2} y={y + 1} />
      <Collider x={x + 2} y={y - 1} />
      <Collider x={x + 2} y={y + 0} />
      <Collider x={x + 2} y={y + 1} />

      {/* Particles */}
      {particles.map(({ x, y, dir, id }) => (
        <RocketParticle x={x} y={y} dir={dir} key={id} />
      ))}
    </>
  );
}
