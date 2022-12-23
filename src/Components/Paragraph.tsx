import * as React from "react";
import { CharPixelBlockProps } from "../CharPixelLib/CharPixelTypes";
import { useLines } from "../Utils/Hooks";
import { getAlign } from "../Utils/utils";
import { LineText } from "./LineText";

export function Paragraph({
  x,
  y,
  z,
  text,
  isWall,
  align,
  clr: color,
  opacity,
  twinkle,
  spacing,
  bold,
  typist,
  transition,
}: CharPixelBlockProps & { spacing?: number }) {
  const lines = useLines(text);
  const sp = spacing === undefined ? 2 : spacing;

  return (
    <>
      {lines.map(
        (line: string, i: number) =>
          line !== "" && (
            <LineText
              key={i}
              x={x + getAlign(text.length, align)}
              y={y + i * sp}
              z={z}
              text={line}
              isWall={isWall}
              clr={color}
              opacity={opacity}
              twinkle={twinkle}
              bold={bold}
              typist={typist}
              transition={transition}
            />
          )
      )}
    </>
  );
}
