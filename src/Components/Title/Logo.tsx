import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { Position3D, TextAlign } from "../../Utils/types";
import { getAlign, randEl, randomRange, toN } from "../../Utils/utils";
import { Line } from "../Line";

const verticalPads = 7;
const baseTitle = "Sappho in Space";
const extraWidth = 2 * 2 * 4;
let padded = baseTitle;
for (let i = 0; i < extraWidth / 4; i++) {
  padded = "~ " + padded + " ~";
}

const startGap = 3;

export function Logo({ x, y, z }: Position3D) {
  return (
    <>
      {toN(verticalPads).map((i) => (
        <PadRow
          key={i}
          x={x}
          y={y - (3 + i)}
          z={z}
          idx={i}
          maxLength={padded.length}
          gap
        />
      ))}
      {toN(Math.ceil(padded.length / 2)).map((i) => (
        <PadRow
          key={i}
          x={x}
          y={y + (3 + i)}
          z={z}
          idx={i}
          maxLength={padded.length}
        />
      ))}
      <LogoText x={x} y={y} z={z} />
    </>
  );
}

function LogoText({ x, y, z }: Position3D) {
  return <Line x={x} y={y} z={z} text={padded} align={TextAlign.Center} />;
}

function PadRow({
  x,
  y,
  z,
  idx,
  maxLength,
  gap,
}: Position3D & { idx: number; maxLength: number; gap?: boolean }) {
  const chars = useMemo<string[]>(() => {
    const chars: (string | undefined)[] = [];
    const length = maxLength - idx * 2;
    const center = Math.floor(length / 2);

    for (let i = 0; i < length; i++) {
      const myChar =
        i === 0 || i === length - 1
          ? "."
          : randEl(["#", "%", "*", "*", "@", "^", ".", ".", ".", ".", "."]);
      let char = i % 2 === 0 ? myChar : " ";
      if (gap && idx >= startGap) {
        const gapSize = 1 + (idx - startGap);
        if (i > center - gapSize && i < center + gapSize) char = undefined;
      }
      chars.push(char);
    }

    return chars;
  }, [maxLength, gap, idx]);

  const offX = useMemo(() => getAlign(chars.length, TextAlign.Center), [chars]);

  const fade: number[] = useMemo(
    () =>
      chars.map((_v) => {
        if (chars.length <= 3) return 1;
        else return Math.random() < 0.4 ? randomRange(0, 0.5) : 1;
      }),
    [chars]
  );

  return (
    <>
      {chars.map(
        (str: string | undefined, i: number) =>
          str && (
            <CharPixel
              char={str}
              x={x + offX + i}
              y={y}
              z={z}
              opacity={fade[i] * Math.max(1 - idx * 0.05, 0.3)}
              key={"c" + i}
            />
          )
      )}
    </>
  );
}
