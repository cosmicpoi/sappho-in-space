import * as React from "react";
import { useState } from "react";
import { useGameManager } from "..";
import { Layer } from "../Utils/consts";
import { TextAlign } from "../Utils/types";
import { Line } from "./Line";

const verticalPads = 3;
const baseWith = "Sappho in Space".length;

export function Title() {
  const gM = useGameManager();
  const { viewportManager: vM } = gM;
  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);
  const [z] = useState<number>(Layer.Title);

  return (
    <>
      <Line
        x={x}
        y={y}
        z={z}
        text="~ ~ ~ ~ ~ ~Sappho in Space ~ ~ ~ ~"
        align={TextAlign.Center}
      />
    </>
  );
}
