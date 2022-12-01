import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useGameManager } from ".";

import { CharPixel } from "./CharPixelLib/CharPixel";
import { t_v } from "./consts";
import { Position3D } from "./Utils/Position";

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

export function Spaceship() {
  const gM = useGameManager();
  const { viewportManager: vM } = gM;

  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);

  const [chars, setChars] = useState<string[][]>(spaceshipCharsRight);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp") {
        setY((y) => y - 1);
        setChars(spaceshipCharsUp);
      } else if (e.key == "ArrowDown") {
        setY((y) => y + 1);
        setChars(spaceshipCharsDown);
      }

      if (e.key == "ArrowRight") {
        setX((x) => x + 1);
        setChars(spaceshipCharsRight);
      } else if (e.key == "ArrowLeft") {
        setX((x) => x - 1);
        setChars(spaceshipCharsLeft);
      }
    });
  }, []);

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

`
 ...
.V.V.
.|–|.
 .V.

 >–
  |>
 >-
`;
