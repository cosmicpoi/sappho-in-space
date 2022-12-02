import * as React from "react";
import { useCallback, useLayoutEffect, useState } from "react";
import { useGameManager } from "..";

import { CharPixel } from "../CharPixelLib/CharPixel";
import { t_v } from "../Utils/consts";
import { useFrame, useManyKeysDown, useManyKeysUp } from "../Utils/Hooks";
import { ObjectMotion } from "../Utils/ObjectMotion";
import { Position3D } from "../Utils/Position";
import { Direction, directionFromKey, directionKeys } from "../Utils/utils";

function Collider({ x, y, z }: Position3D) {
  const [isTop, setTop] = useState<boolean>(false);
  const gM = useGameManager();

  useLayoutEffect(() => {
    setTop(gM.charPixelGridManager.isOccupied({ x, y }));
  }, [x, y, z, gM]);

  return (
    <CharPixel x={x} y={y} z={z} char={isTop ? "." : " "} color={"gray"} />
  );
}
function SpaceshipPart({ x, y, z, char }: Position3D & { char: string }) {
  if (char === " ") return <Collider x={x} y={y} z={z} />;
  else return <CharPixel x={x} y={y} z={z} char={char} />;
}

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

const TERM_V = 12 / 60; // 12 units / sec
export function Spaceship() {
  const gM = useGameManager();
  const { viewportManager: vM, inputManager: iM } = gM;

  const [faceDir, setFaceDir] = useState<Direction>(Direction.Up);
  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);

  const [motion] = useState<ObjectMotion>(new ObjectMotion(x, y, true, TERM_V));

  const [chars, setChars] = useState<string[][]>(spaceshipCharsRight);

  // spaceship control
  const onFrame = useCallback(
    (fc: number) => {
      const hoz = iM.resolveHozDirection();
      const vert = iM.resolveVertDirection();

      motion.setAcceleration(hoz * 0.03, vert * 0.03);
      const { x: nX, y: nY } = motion.onFrame(true);
      if (fc % 3 === 0) {
        setX(nX);
        setY(nY);
      }
    },
    [iM, setX, setY, motion]
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
    </>
  );
}
