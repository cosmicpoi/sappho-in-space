import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey } from "../../Data/FragmentData";
import { useLines } from "../../Utils/Hooks";
import { Position3DR } from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { fragment20text } from "../Fragments/FragmentText/FragmentText20to29";
import { FragmentLabel } from "../Labels";
import { LineText } from "../LineText";
import { Wall } from "../Wall";

function End20Corridor({ x, y, z }: Position3DR) {
  const lines = useLines(fragment20text);

  const w1 = useMemo(() => ({ x: x, y: y, width: 1, height: 48 }), [x, y]);
  const w2 = useMemo(() => ({ x: x + 28, y: y, width: 1, height: 48 }), [x, y]);

  return (
    <>
      <Wall hitbox={w1} />
      <Wall hitbox={w2} />

      {lines.map((line: string, i: number) => (
        <>
          <CharPixel x={x} y={y + i * 2} z={z} char={"]"} />
          <LineText
            x={x + 1}
            y={y + i * 2}
            z={z}
            text={line.substring(1, line.length)}
            opacity={0.5}
          />
          <CharPixel x={x + 28} y={y + i * 2} z={z} char={"["} />
        </>
      ))}
      <LineText x={x + 4} y={y + 10} z={z + 1} text={"black earth"} />
    </>
  );
}

type Pt = [number, number]; // [0, dim] (inclusive)
type Edge = [Pt, Pt];

const dim = 10;
const cellSize = 14;
const corners: Pt[] = (() => {
  const c: Pt[] = [];
  for (let i = 0; i <= dim; i++)
    for (let j = 0; j <= dim; j++) {
      if (
        !(j === 0 && i === 1) &&
        !(j === 1 && i === 1) &&
        !(j === dim && i === dim - 1) &&
        !(j === dim - 1 && i === dim - 1)
      )
        c.push([i, j]);
    }
  return c;
})();

const edges: Edge[] = (() => {
  const e: Edge[] = [];
  // add borders
  for (let i = 0; i < dim; i++) {
    // prettier-ignore
    if (i > 1) e.push([[i, 0], [i + 1, 0]]);
    // prettier-ignore
    e.push([[0, i], [0, i + 1]]);
    // prettier-ignore
    e.push([[dim, i], [dim, i + 1]]);
    // prettier-ignore
    if (i < dim - 2) e.push([[i, dim], [i + 1, dim]]);
  }

  // prettier-ignore
  e.push(
    [[2, 0], [2, 1]],
    [[4, 0], [4, 1]],
    [[6, 0], [6, 1]],

    [[3, 1], [4, 1]],
    [[4, 1], [5, 1]],
    [[7, 1], [8, 1]],
    [[8, 1], [9, 1]],

    [[5, 1], [5, 2]],
    [[6, 1], [6, 2]],
    [[7, 1], [7, 2]],
    [[9, 1], [9, 2]],

    [[1, 2], [2, 2]],
    [[1, 2], [2, 2]],
    [[2, 2], [3, 2]],
    [[4, 2], [5, 2]],

    [[2, 2], [2, 3]],
    [[3, 2], [3, 3]],
    [[6, 2], [6, 3]],
    [[7, 2], [7, 3]],
    [[8, 2], [8, 3]],

    [[0, 3], [1, 3]],
    [[3, 3], [4, 3]],
    [[4, 3], [5, 3]],
    [[5, 3], [6, 3]],
    [[8, 3], [9, 3]],
    [[9, 3], [10, 3]],

    [[2, 3], [2, 4]],
    [[3, 3], [3, 4]],
    [[5, 3], [5, 4]],
    [[6, 3], [6, 4]],
    [[7, 3], [7, 4]],

    [[1, 4], [2, 4]],
    [[6, 4], [7, 4]],
    [[7, 4], [8, 4]],

    [[1, 4], [1, 5]],
    [[3, 4], [3, 5]],
    [[4, 4], [4, 5]],
    [[5, 4], [5, 5]],
    [[9, 4], [9, 5]],

    [[1, 5], [2, 5]],
    [[5, 5], [6, 5]],
    [[7, 5], [8, 5]],
    [[9, 5], [10, 5]],

    [[2, 5], [2, 6]],
    [[4, 5], [4, 6]],
    [[5, 5], [5, 6]],
    [[7, 5], [7, 6]],
  );
  return e;
})();
// prettier-ignore
function Maze({ x, y, z }: Position3DR) {
  return (
    <>
      {corners.map(([i, j]) => (
        <CharPixel
          key={`${i}-${j}`}
          x={x + i * cellSize}
          y={y + j * cellSize}
          z={z}
          char="+"
        />
      ))}
      {edges.map(([[i1, j1], [i2, j2]]) => (
        <React.Fragment key={`${i1}-${j1}.${i2}-${j2}`}>
          <Wall
            hitbox={{
              x: x + i1 * cellSize,
              y: y + j1 * cellSize,
              width: i2 - i1 === 0 ? 1 : cellSize + 1,
              height: j2 - j1 === 0 ? 1 : cellSize + 1,
            }}
          />
          {toN(cellSize)
            .filter((k) => k > 0)
            .map((k) => (
              <CharPixel
                key={k}
                x={x + i1 * cellSize + k * (i2 - i1)}
                y={y + j1 * cellSize + k * (j2 - j1)}
                z={z}
                char={k % 2 === 0 ? (i2 - i1 === 0 ? "|" : "-") : undefined}
              />
            ))}
        </React.Fragment>
      ))}
    </>
  );
}

export function Fragment20Puzzle({ x, y, z }: Position3DR) {
  return (
    <>
      <FragmentLabel x={x} y={y - 4} z={z} fkey={FragmentKey.F20} decor />
      <End20Corridor x={x} y={y} z={z} />
      <Maze x={x} y={y + 48} z={z} />
    </>
  );
}
