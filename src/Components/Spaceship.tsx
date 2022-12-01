import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useGameManager } from "..";

import { CharPixel } from "../CharPixelLib/CharPixel";
import { KEYS } from "../Engine/InputManager";
import { t_v } from "../Utils/consts";
import { useFrame, useKeyDown } from "../Utils/Hooks";
import { Position3D } from "../Utils/Position";

function Collider({ x, y, z }: Position3D) {
  const [isTop, setTop] = useState<boolean>(false);
  const gM = useGameManager();

  useLayoutEffect(() => {
    setTop(gM.charPixelGridManager.isOccupied({ x, y }));
  }, [x, y, z]);

  return (
    <CharPixel x={x} y={y} z={z} char={isTop ? "." : " "} color={"gray"} />
  );
}
function SpaceshipPart({ x, y, z, char }: Position3D & { char: string }) {
  if (char == " ") return <Collider x={x} y={y} z={z} />;
  else return <CharPixel x={x} y={y} z={z} char={char} />;
}

enum Direction {
  Up,
  Left,
  Down,
  Right,
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

export function Spaceship() {
  const gM = useGameManager();
  const { viewportManager: vM, inputManager: iM } = gM;

  const [dir, setDir] = useState<Direction>(Direction.Up);

  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);

  const [chars, setChars] = useState<string[][]>(spaceshipCharsRight);

  // spaceship control
  const onFrame = useCallback(() => {
    const hozDir = iM.resolveHozDirection();
    const vertDir = iM.resolveVertDirection();

    setY((y) => y + vertDir);
    setX((x) => x + hozDir);
  }, [iM, setX, setY]);
  useFrame(onFrame);

  const d1 = useCallback(() => {
    setDir(Direction.Down);
  }, []);
  useKeyDown(KEYS.Down, d1);
  const d2 = useCallback(() => {
    setDir(Direction.Up);
  }, []);
  useKeyDown(KEYS.Up, d2);
  const d3 = useCallback(() => {
    setDir(Direction.Left);
  }, []);
  useKeyDown(KEYS.Left, d3);
  const d4 = useCallback(() => {
    setDir(Direction.Right);
  }, []);
  useKeyDown(KEYS.Right, d4);

  // sync chars to direction
  useLayoutEffect(() => {
    setChars(dirChars[dir]);
  }, [dir]);

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
