import * as React from "react";
import { useEffect, useState } from "react";

import { CharPixel } from "./CharPixel";
import { t_v } from "./consts";

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
  const [x, setX] = useState<number>(30);
  const [y, setY] = useState<number>(30);

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
        <CharPixel x={x - 1} y={y - 1} char={chars[0][0]}></CharPixel>
        <CharPixel x={x - 1} y={y + 0} char={chars[1][0]}></CharPixel>
        <CharPixel x={x - 1} y={y + 1} char={chars[2][0]}></CharPixel>
      </>
      {/* Second col */}
      <>
        <CharPixel x={x + 0} y={y - 1} char={chars[0][1]}></CharPixel>
        <CharPixel x={x + 0} y={y + 0} char={chars[1][1]}></CharPixel>
        <CharPixel x={x + 0} y={y + 1} char={chars[2][1]}></CharPixel>
      </>
      {/* Third col */}
      <>
        <CharPixel x={x + 1} y={y - 1} char={chars[0][2]}></CharPixel>
        <CharPixel x={x + 1} y={y + 0} char={chars[1][2]}></CharPixel>
        <CharPixel x={x + 1} y={y + 1} char={chars[2][2]}></CharPixel>
      </>
    </>
  );
}

`
V V
|–|
 V

 >–
  |>
 >-
`;
