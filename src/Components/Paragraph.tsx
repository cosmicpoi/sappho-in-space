import * as React from "react";
import { useMemo } from "react";
import { CharPixelBlockProps } from "../CharPixelLib/CharPixelTypes";
import { useCleanStr } from "../Utils/Hooks";
import { getAlign } from "../Utils/utils";
import { Line } from "./Line";

export function Paragraph({
  x,
  y,
  z,
  text,
  isWall,
  align,
  color,
  opacity,
  twinkle,
  spacing,
}: CharPixelBlockProps & {spacing?: number}) {
  const cleaned = useCleanStr(text);
  const lines = useMemo(() => cleaned.split("\n"), [cleaned]);
  const sp = spacing === undefined ? 2 : spacing;

  return (
    <>
      {lines.map(
        (line: string, i: number) =>
          line !== "" && (
            <Line
              key={i}
              x={x + getAlign(text.length, align)}
              y={y + i * sp}
              z={z}
              text={line}
              isWall={isWall}
              color={color}
              opacity={opacity}
              twinkle={twinkle}
            />
          )
      )}
    </>
  );
}
