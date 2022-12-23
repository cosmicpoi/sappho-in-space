import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameManager } from "../..";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import { useLines, usePuzzleStatus, useTrigger } from "../../Utils/Hooks";
import { CollisionGroup, Hook, Position3DR } from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { blackearthColorData } from "../FloatingBG";
import { fragment20text } from "../Fragments/FragmentText/FragmentText20to29";
import { FragmentLabel, PL_BlackEarth } from "../Labels";
import { LineText } from "../LineText";
import { Paragraph } from "../Paragraph";
import { DebugBox, Wall } from "../Wall";

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
          <CharPixel x={x} y={y + i * 2} z={z} char={"]"} isWall />
          <LineText
            x={x + 1}
            y={y + i * 2}
            z={z}
            text={line.substring(1, line.length)}
            opacity={0.5}
          />
          <CharPixel x={x + 28} y={y + i * 2} z={z} char={"["} isWall />
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

    [[0, 6], [1, 6]],
    [[2, 6], [3, 6]],
    [[3, 6], [4, 6]],
    [[6, 6], [7, 6]],
    [[8, 6], [9, 6]],

    [[1, 6], [1, 7]],
    [[5, 6], [5, 7]],
    [[6, 6], [6, 7]],
    [[8, 6], [8, 7]],
    [[9, 6], [9, 7]],

    [[1, 7], [2, 7]],
    [[2, 7], [3, 7]],
    [[3, 7], [4, 7]],
    [[5, 7], [6, 7]],
    [[7, 7], [8, 7]],

    [[4, 7], [4, 8]],
    [[6, 7], [6, 8]],
    [[9, 7], [9, 8]],

    [[1, 8], [2, 8]],
    [[2, 8], [3, 8]],
    [[3, 8], [4, 8]],
    [[4, 8], [5, 8]],
    [[6, 8], [7, 8]],
    [[7, 8], [8, 8]],
    [[8, 8], [9, 8]],

    [[3, 8], [3, 9]],
    [[5, 8], [5, 9]],
    [[6, 8], [6, 9]],
    [[8, 8], [8, 9]],

    [[2, 9], [3, 9]],

    [[1, 9], [1, 10]],
    [[4, 9], [4, 10]],
    [[7, 9], [7, 10]],
  );
  return e;
})();
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
          isWall
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
                isWall
              />
            ))}
        </React.Fragment>
      ))}
    </>
  );
}

const untriggered = `<3`;

const triggered = `
 __   __
/  \\ /  \\
|   '   |
|       |
\\       /
 \\     /
  \\   /
   \\ /
    v
`;

function Puzzle20Trigger({
  x,
  y,
  z,
  row,
  col,
  idx,
  on,
  setOn,
}: Position3DR & {
  row: number;
  col: number;
  idx: number;
  on: boolean[];
  setOn: Hook<boolean[]>[1];
}) {
  const active = useMemo(() => on[idx], [on, idx]);
  const activate = useCallback(() => {
    setOn((a: boolean[]) => {
      const arr = [...a];
      arr[idx] = true;
      return arr;
    });
  }, [setOn, idx]);

  const { x: px, y: py } = useMemo(
    () => ({
      x: Math.round(x + col * cellSize + cellSize / 2),
      y: Math.round(y + row * cellSize + cellSize / 2),
    }),
    [x, y, row, col]
  );

  const onHit = useCallback(
    (data: ActorData) => {
      if (data.collisionGroup === CollisionGroup.HeartParticle) activate();
    },
    [activate]
  );

  const hitbox: TriggerData | undefined = useMemo(() => {
    if (active) return undefined;
    else return { x: px - 2, y: py - 2, height: 5, width: 5, callback: onHit };
  }, [px, py, onHit, active]);

  useTrigger(hitbox);

  return (
    <>
      <DebugBox hitbox={hitbox} />
      {!active && <Paragraph x={px} y={py} z={z} text={untriggered} />}
      {active && idx !== 4 && (
        <Paragraph
          x={px - 4}
          y={py - 4}
          z={z + 1}
          text={triggered}
          opacity={0.5}
          spacing={1}
          typist
        />
      )}
      {active && (
        <>
          <CharPixel
            x={px - 1}
            y={py + (idx === 4 ? 3 : 0)}
            z={z + 2}
            char={"" + (idx + 1)}
            typist
          />
          <CharPixel
            x={px}
            y={py + (idx === 4 ? 3 : 0)}
            z={z + 2}
            char={"/"}
            typist
            opacity={0.5}
          />
          <CharPixel
            x={px + 1}
            y={py + (idx === 4 ? 3 : 0)}
            z={z + 2}
            char={"5"}
            typist
          />
        </>
      )}
    </>
  );
}

export function Fragment20Puzzle({ x, y, z }: Position3DR) {
  const [on, setOn] = useState<boolean[]>(Array(5).fill(false));

  const [status, solve] = usePuzzleStatus(FragmentKey.F20);
  const solved = status === FragmentStatus.Solved;

  useEffect(() => {
    console.log(on);
    if (on.reduce((prev: boolean, curr: boolean) => prev && curr)) solve();
  }, [on, solve]);

  const sO = solved ? 0.5 : 1;

  const { colorManager: cM } = useGameManager();
  useEffect(() => {
    if (!solved) return;

    return cM.registerZone({
      x: x + 18,
      y: y - 6,
      radius: 10,
      data: blackearthColorData,
    });
  }, [cM, solved, x, y]);

  return (
    <>
      <FragmentLabel x={x + 13} y={y - 12} z={z} fkey={FragmentKey.F20} decor />
      <End20Corridor x={x} y={y} z={z} />
      <Maze x={x} y={y + 48} z={z} />
      <Puzzle20Trigger
        x={x}
        y={y + 48}
        z={z}
        row={0}
        col={4}
        on={on}
        idx={0}
        setOn={setOn}
      />
      <Puzzle20Trigger
        x={x}
        y={y + 48}
        z={z}
        row={3}
        col={6}
        on={on}
        idx={1}
        setOn={setOn}
      />
      <Puzzle20Trigger
        x={x}
        y={y + 48}
        z={z}
        row={6}
        col={0}
        on={on}
        idx={2}
        setOn={setOn}
      />
      <Puzzle20Trigger
        x={x}
        y={y + 48}
        z={z}
        row={2}
        col={2}
        on={on}
        idx={3}
        setOn={setOn}
      />
      <Puzzle20Trigger
        x={x}
        y={y + 48}
        z={z}
        row={-4.25}
        col={0.5}
        on={on}
        idx={4}
        setOn={setOn}
      />
      <CharPixel
        x={x}
        y={y - 6}
        z={z}
        char={"["}
        isWall={!solved}
        opacity={sO}
      />
      <CharPixel
        x={x + 28}
        y={y - 6}
        z={z}
        char={"]"}
        isWall={!solved}
        opacity={sO}
      />
      <CharPixel
        x={x}
        y={y - 4}
        z={z}
        char={"["}
        isWall={!solved}
        opacity={sO}
      />
      <CharPixel
        x={x + 28}
        y={y - 2}
        z={z}
        char={solved ? "." : "|"}
        isWall={!solved}
        typist={!solved}
        opacity={sO}
      />
      <CharPixel
        x={x}
        y={y - 2}
        z={z}
        char={solved ? "." : "|"}
        isWall={!solved}
        typist={!solved}
        opacity={sO}
      />
      <CharPixel
        x={x + 28}
        y={y - 4}
        z={z}
        char={"]"}
        isWall={!solved}
        opacity={sO}
      />
      <LineText
        x={x}
        y={y - 8}
        text={"_".repeat(29)}
        isWall={!solved}
        typist={!solved}
      />
      <Paragraph x={x + 3} y={y - 6} text={completionPoem} typist={solved} />
      <PL_BlackEarth x={x + 12} y={y - 6} z={z + 1} typist={solved} />
      {!solved && (
        <>
          <Wall hitbox={{ x, y: y - 8, width: 29, height: 1 }} />
          <Wall hitbox={{ x, y: y - 7, width: 1, height: 7 }} />
          <Wall hitbox={{ x: x + 28, y: y - 7, width: 1, height: 7 }} />
        </>
      )}
    </>
  );
}

const completionPoem = `
ships of black earth
    sail on dusty tears
`;
