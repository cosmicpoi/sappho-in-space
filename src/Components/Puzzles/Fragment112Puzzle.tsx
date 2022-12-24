import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameManager } from "../..";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { SolidData } from "../../Engine/CollisionManager";
import { usePuzzleStatus, useSolid } from "../../Utils/Hooks";
import { Position, Position3DR } from "../../Utils/types";
import { accomplishColorData } from "../FloatingBG";
import { Fragment112 } from "../Fragments/FragmentComponents/Fragment110to119";
import { FragmentLabel, PL_Accomplish } from "../Labels";
import { Paragraph } from "../Paragraph";

const blockWidth = 60;
const blockHeight = 11;
const pad = 2;

function Block({ pos, z, die }: { pos: Position; z: number; die: () => void }) {
  const [hp, setHp] = useState<number>(2);
  const isDead = useMemo(() => hp <= 0, [hp]);

  useEffect(() => {
    if (isDead) die();
  }, [die, isDead]);

  const hit = useCallback((_data: ActorData) => {
    setHp((h: number) => h - 1);
  }, []);
  const char = useMemo(() => {
    if (hp === 2) return "#";
    else if (hp === 1) return "*";
    else return undefined;
  }, [hp]);

  const hitbox: SolidData | undefined = useMemo(
    () =>
      isDead
        ? undefined
        : { x: pos.x, y: pos.y, width: 1, height: 1, callback: hit },
    [pos, hit, isDead]
  );
  useSolid(hitbox);

  return (
    <>
      {!isDead && (
        <CharPixel x={pos.x} y={pos.y} z={z + 1} char={char} isWall />
      )}
    </>
  );
}

export function Fragment112Puzzle({ x, y, z }: Position3DR) {
  const [status, solve] = usePuzzleStatus(FragmentKey.F112);
  const solved = status === FragmentStatus.Solved;

  const cx = x + 30;
  const fy = useMemo(() => y + 12, [y]);

  const blockPositions: Position[] = useMemo(() => {
    const p: Position[] = [];
    const sx = x - pad;
    const sy = fy - pad;
    for (let i = 0; i < blockWidth + 2 * pad; i++) {
      for (let j = 0; j < blockHeight + 2 * pad; j++) {
        p.push({ x: sx + i, y: sy + j });
      }
    }
    return p;
  }, [x, fy]);

  const [dead, setDead] = useState<number>(0);
  const die = useCallback(() => setDead((x) => x + 1), []);

  useEffect(() => {
    if (dead === blockPositions.length) solve();
  }, [dead, blockPositions, solve]);

  // colors
  const { colorManager: cM } = useGameManager();
  useEffect(() => {
    if (!solved) return;

    return cM.registerZone({
      x: cx,
      y: y + 4,
      radius: 10,
      data: accomplishColorData,
    });
  }, [cM, solved, cx, y]);

  return (
    <>
      <FragmentLabel x={cx - 1} y={y} decor fkey={FragmentKey.F112} />
      <Fragment112 x={x} y={fy} z={z} />
      {/* <DebugBox hitbox={{ x, y: fy, width: blockWidth, height: blockHeight }} /> */}

      {/* Blocks */}
      {blockPositions.map((pos, i) => (
        <Block pos={pos} z={z} key={i} die={die} />
      ))}

      {/* Copmletion Poem */}
      <CharPixel x={cx - 18} y={y + 4} char={"["} opacity={0.5} />
      <CharPixel x={cx + 18} y={y + 4} char={"]"} opacity={0.5} />
      <CharPixel x={cx - 18} y={y + 6} char={"["} opacity={0.5} />
      <CharPixel x={cx + 18} y={y + 6} char={"]"} opacity={0.5} />

      {solved && (
        <>
          <Paragraph x={cx - 15} y={y + 4} z={z} text={completionPoem} typist />
          <PL_Accomplish x={cx} y={y + 4} z={z + 1} typist />
        </>
      )}
    </>
  );
}

const completionPoem = `
what I seek to accomplish
     is left beautifully undone`;
