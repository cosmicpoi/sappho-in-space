import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../CharPixelLib/CharPixel";
import { CharPixelBaseProps } from "../CharPixelLib/CharPixelTypes";
import { Position } from "../Utils/types";

// https://www.geeksforgeeks.org/mid-point-line-generation-algorithm/

export function Line({
  x,
  y,
  z,
  x1,
  y1,
  typist,
  opacity,
  clr,
  twinkle,
  bold,
  transition,
}: CharPixelBaseProps & { x1: number; y1: number }) {
  const { points, char }: { points: Position[]; char: string } = useMemo(() => {
    const dx = x1 - x;
    let dy = y1 - y;

    // set char
    const pi = Math.PI;
    const angle = Math.atan2(dy, dx);
    let char = "-";

    if (-pi / 8 <= angle && angle < pi / 8) char = "-";
    else if ((-3 * pi) / 8 <= angle && angle < -pi / 8) char = "/";
    else if ((-5 * pi) / 8 <= angle && angle < (-3 * pi) / 8) char = "|";
    else if ((-7 * pi) / 8 <= angle && angle < (-5 * pi) / 8) char = "/";
    else if (pi / 8 <= angle && angle < (3 * pi) / 8) char = "\\";
    else if ((3 * pi) / 8 <= angle && angle < (5 * pi) / 8) char = "|";
    else if ((5 * pi) / 8 <= angle && angle < (7 * pi) / 8) char = "\\";
    else char = "-";

    // rasterize
    let points: Position[] = [];
    let x_ = x;
    let y_ = y;
    const draw = () => points.push({ x: x_, y: y_ });
    draw();

    if (dy < 0) dy *= -1;
    if (dy <= dx) {
      let d = dy - dx / 2;
      while (x_ < x1) {
        x_++;
        if (d < 0) d = d + dy;
        else {
          d += dy - dx;
          y_++;
        }

        draw();
      }
    } else {
      let d = dx - dy / 2;
      while (y_ < y1) {
        y_++;
        if (d < 0) d = d + dx;
        else {
          d += dx - dy;
          x_++;
        }
        draw();
      }
    }

    if (y1 < y)
      points = points.map(({ x: px, y: py }) => ({ x: px, y: y - (py - y) }));

    return { points, char };
  }, [x, y, x1, y1]);

  return (
    <>
      {points.map(({ x, y }, i) => (
        <CharPixel
          char={char}
          key={i}
          x={x}
          y={y}
          z={z}
          typist={typist}
          opacity={opacity}
          clr={clr}
          twinkle={twinkle}
          transition={transition}
          bold={bold}
        />
      ))}
    </>
  );
}
