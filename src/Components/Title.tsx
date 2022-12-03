import * as React from "react";
import { useMemo, useState } from "react";
import { useGameManager } from "..";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { Layer } from "../Utils/consts";
import { Position3D, TextAlign } from "../Utils/types";
import { randEl, randIntRange, randomRange, toN } from "../Utils/utils";
import { Line, useAlign } from "./Line";

const verticalPads = 7;
const baseTitle = "Sappho in Space";
const extraWidth = 2 * 2 * 6;
let padded = baseTitle;
for (let i = 0; i < extraWidth / 4; i++) {
  padded = "~ " + padded + " ~";
}

export function Title() {
  const gM = useGameManager();
  const { viewportManager: vM } = gM;
  const [x, setX] = useState<number>(vM.getCenter().x);
  const [y, setY] = useState<number>(vM.getCenter().y);
  const [z] = useState<number>(Layer.Title);

  return (
    <>
      {toN(verticalPads).map((i) => (
        <React.Fragment key={i}>
          <PadRow
            x={x}
            y={y - (3 + i)}
            z={z}
            idx={i}
            maxLength={padded.length}
          />
          <PadRow
            x={x}
            y={y + (3 + i)}
            z={z}
            idx={i}
            maxLength={padded.length}
          />
        </React.Fragment>
      ))}
      <TitleText x={x} y={y} z={z} />
    </>
  );
}

function TitleText({ x, y, z }: Position3D) {
  return <Line x={x} y={y} z={z} text={padded} align={TextAlign.Center} />;
}

function PadRow({
  x,
  y,
  z,
  idx,
  maxLength,
}: Position3D & { idx: number; maxLength: number }) {
  const [text] = useState<string>(() => {
    const length = maxLength - idx * 2;

    let str = "";
    for (let i = 0; i < length; i++) {
      const myChar =
        i === 0 || i === length - 1
          ? "."
          : randEl(["#", "%", "*", "*", "@", "^", ".", ".", ".", ".", "."]);
      const char = i % 2 === 0 ? myChar : " ";
      str += char;
    }

    return str;
  });

  const offX = useAlign(text, TextAlign.Center);

  const twinklers: (number | undefined)[] = useMemo(
    () =>
      text
        .split("")
        .map((_v) => (Math.random() < 0.2 ? randIntRange(0, 9) : undefined)),
    [text]
  );
  const fade: number[] = useMemo(
    () =>
      text
        .split("")
        .map((_v) => (Math.random() < 0.4 ? randomRange(0, 0.5) : 1)),
    [text]
  );

  return (
    <>
      {text.split("").map((str: string, i: number) => (
        <CharPixel
          char={str}
          x={x + offX + i}
          y={y}
          z={z}
          opacity={fade[i] * Math.max(1 - idx * 0.15, 0)}
          key={"c" + i}
          twinkle={twinklers[i]}
        />
      ))}
    </>
  );
}
