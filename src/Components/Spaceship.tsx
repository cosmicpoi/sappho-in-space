import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useGameManager } from "..";
import { KEYS } from "../Engine/InputManager";
import { t_v } from "../Utils/consts";
import { DEBUG_START_POS, DEBUG_SCROLL } from "../Utils/debug";
import {
  useFrame,
  useManyKeysDown,
  useManyKeysUp,
  useActor,
  useKeyDown,
} from "../Utils/Hooks";
import {
  CollisionGroup,
  Direction,
  Hitbox,
  Layer,
  Position,
} from "../Utils/types";
import { addPos, directionFromKey, directionKeys } from "../Utils/utils";
import { Particles, ParticlesHandle } from "./ParticleSystem/Particles";
import {
  SpaceshipPart,
  Collider,
  RocketParticle,
  HeartParticle,
  heartParticles,
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
  const { viewportManager: vM, inputManager: iM, colorManager: cM } = gM;

  // basic spaceship stuff
  const [faceDir, setFaceDir] = useState<Direction>(Direction.Up);
  const [pos, setPos] = useState<Position>(
    DEBUG_START_POS ? addPos(DEBUG_START_POS, vM.getCenter()) : vM.getCenter()
  );

  const motion = useActor(
    { x: pos.x, y: pos.y },
    {
      termV: TERM_V,
      hitbox: spaceshipHitbox,
      solidCollision: true,
      collisionGroup: CollisionGroup.Spaceship,
    }
  );

  const [chars, setChars] = useState<string[][]>(spaceshipCharsRight);

  // manage particles
  const [rocketHandle] = useState<ParticlesHandle<RocketParticle>>(
    new ParticlesHandle<RocketParticle>()
  );
  const [heartHandle] = useState<ParticlesHandle<HeartParticle>>(
    new ParticlesHandle<HeartParticle>()
  );

  // spaceship control
  const onFrame = useCallback(
    (fc: number) => {
      // handle motion
      const hoz = iM.resolveHozDirection();
      const vert = iM.resolveVertDirection();

      motion.setAcceleration({ x: hoz * 0.008, y: vert * 0.008 });
      motion.onFrame(true);

      const { x: nX, y: nY } = motion.getPosition();
      setPos({ x: nX, y: nY });

      // make new particles
      if (hoz !== 0 || vert !== 0) {
        if (fc % 10 === 0)
          rocketHandle.newParticle(new RocketParticle(gM, nX, nY, faceDir));
      }
    },
    [iM, setPos, motion, rocketHandle, gM, faceDir]
  );
  useFrame(onFrame);

  const onArrowDown = useCallback(
    (k: string) => {
      setFaceDir(directionFromKey(k));
    },
    [setFaceDir]
  );
  useManyKeysDown(directionKeys, onArrowDown);

  const onSpaceDown = useCallback(() => {
    heartHandle.newParticles(heartParticles(gM, pos.x, pos.y));
  }, [gM, heartHandle, pos]);
  useKeyDown(KEYS.Space, onSpaceDown);

  const onArrowUp = useCallback(
    (_k: string) => {
      const single = gM.inputManager.getSingleDirection();
      if (single !== undefined) setFaceDir(single);
    },
    [gM]
  );
  useManyKeysUp(directionKeys, onArrowUp);
  // sync chars to direction
  useLayoutEffect(() => {
    setChars(dirChars[faceDir]);
  }, [faceDir]);

  // camera control
  useEffect(() => {
    if (!DEBUG_SCROLL) vM.follow(pos);
    cM.requestColors(pos);
  }, [pos, vM, cM]);

  const [z] = useState<number>(Layer.Spaceship);

  const { x, y } = pos;

  return (
    <>
      {/* First col */}
      <>
        <SpaceshipPart z={z} x={x - 1} y={y - 1} char={chars[0][0]} />
        <SpaceshipPart z={z} x={x - 1} y={y + 0} char={chars[1][0]} />
        <SpaceshipPart z={z} x={x - 1} y={y + 1} char={chars[2][0]} />
      </>
      {/* Second col */}
      <>
        <SpaceshipPart z={z} x={x + 0} y={y - 1} char={chars[0][1]} />
        <SpaceshipPart z={z} x={x + 0} y={y + 0} char={chars[1][1]} />
        <SpaceshipPart z={z} x={x + 0} y={y + 1} char={chars[2][1]} />
      </>
      {/* Third col */}
      <>
        <SpaceshipPart z={z} x={x + 1} y={y - 1} char={chars[0][2]} />
        <SpaceshipPart z={z} x={x + 1} y={y + 0} char={chars[1][2]} />
        <SpaceshipPart z={z} x={x + 1} y={y + 1} char={chars[2][2]} />
      </>
      {/* Vertical Colliders */}
      <Collider z={z} x={x - 1} y={y - 2} />
      <Collider z={z} x={x + 0} y={y - 2} />
      <Collider z={z} x={x + 1} y={y - 2} />
      <Collider z={z} x={x - 1} y={y + 2} />
      <Collider z={z} x={x + 0} y={y + 2} />
      <Collider z={z} x={x + 1} y={y + 2} />
      {/* Horizontal Colliders */}
      <Collider z={z} x={x - 2} y={y - 1} />
      <Collider z={z} x={x - 2} y={y + 0} />
      <Collider z={z} x={x - 2} y={y + 1} />
      <Collider z={z} x={x + 2} y={y - 1} />
      <Collider z={z} x={x + 2} y={y + 0} />
      <Collider z={z} x={x + 2} y={y + 1} />

      {/* Particles */}
      <Particles handle={rocketHandle} opacity={0.5} />
      <Particles handle={heartHandle} opacity={0.5} />
    </>
  );
}
