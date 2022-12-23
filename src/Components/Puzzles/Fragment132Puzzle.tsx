import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameManager } from "../..";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import { usePuzzleStatus, useTrigger } from "../../Utils/Hooks";
import {
  CollisionGroup,
  Hook,
  Position3D,
  Position3DR,
} from "../../Utils/types";
import { goldenColorData } from "../FloatingBG";
import { Fragment132 } from "../Fragments/FragmentComponents/Fragment130to139";
import { FragmentLabel, PL_Golden } from "../Labels";
import { Line } from "../Line";
import { Paragraph } from "../Paragraph";

const K_flower = `
 _.-'-._
( \\._./ )
>-((K))-<
(_/'-'\\_)
  '-.-'
`;

const l_flower = `
   _ _
 .\\ | /.
.>-(l)-<
 '/_|_\\'
`;

const e_flower = `
    _
 __/ \\__
(  \\ /  )
 > (e) <
(__/ \\__)
   \\_/
`;
const i_flower = `
  _ _
 (   )
( (i) )
 (_ _)
`;
const s_flower = `
   _
 (\\_/)
(_(s)_)
 (\\_/)
`;
const G_flower = `
 .--, ,--.
( ,-.|.-, )
 (__\\G/__)
  / / \\ \\
  '-'\\'-'
`;

const bulb = `
 +
+o+
 +
`;

function Puzzle132Bulb({
  x,
  y,
  z,
  active,
  setActive,
  idx,
  solved,
}: Position3D & {
  active: boolean[];
  idx: number;
  setActive: Hook<boolean[]>[1];
  solved: boolean;
}) {
  const { x: offX, y: offY } = useMemo(() => {
    if (idx === 0) return { x: -3, y: -3 };
    else if (idx === 1) return { x: -3, y: -3 };
    else if (idx === 2) return { x: -3, y: -5 };
    else if (idx === 3) return { x: -2, y: -3 };
    else if (idx === 4) return { x: -2, y: -3 };
    else if (idx === 5) return { x: -4, y: -3 };

    return { x: 0, y: 0 };
  }, [idx]);
  const bloomed = useMemo(() => {
    if (idx === 0) return K_flower;
    else if (idx === 1) return l_flower;
    else if (idx === 2) return e_flower;
    else if (idx === 3) return i_flower;
    else if (idx === 4) return s_flower;
    else if (idx === 5) return G_flower;
    return "";
  }, [idx]);

  const setBloom = useCallback(
    (b: boolean) =>
      setActive((a: boolean[]) => {
        const arr = [...a];
        arr[idx] = b;

        return arr;
      }),
    [setActive, idx]
  );

  const [interactable, setInteractable] = useState<boolean>(true);
  const onHit = useCallback(
    (data: ActorData) => {
      if (!interactable || solved) return;

      if (data.collisionGroup === CollisionGroup.Spaceship) {
        if (!active[idx]) setBloom(true);
        else setBloom(false);
        setInteractable(false);
        setTimeout(() => setInteractable(true), 3000);
      }
    },
    [active, idx, setBloom, interactable, solved]
  );

  const hitbox: TriggerData | undefined = useMemo(
    () => ({ x: x - 1, y: y - 1, height: 3, width: 3, callback: onHit }),
    [x, y, onHit]
  );

  useTrigger(hitbox);

  return (
    <>
      {!active[idx] && (
        <Paragraph
          x={x - 1}
          y={y - 1}
          z={z + 1}
          text={bulb}
          spacing={1}
          typist={true}
        />
      )}
      <Paragraph
        x={x - 1 + offX}
        y={y - 1 + offY}
        z={z}
        text={bloomed}
        typist={active[idx]}
        spacing={2}
      />
    </>
  );
}

export function Fragment132Puzzle({ x, y, z }: Position3DR) {
  const [active, setActive] = useState<boolean[]>(Array(6).fill(false));

  const ox = x + 10;
  const oy = y + 30;

  const [status, solve] = usePuzzleStatus(FragmentKey.F132);
  const solved = status === FragmentStatus.Solved;

  useEffect(() => {
    if (
      active[0] &&
      active[1] &&
      active[2] &&
      active[3] &&
      active[4] &&
      !active[5]
    ) {
      solve();
    }
  }, [active, solve]);

  const { colorManager: cM } = useGameManager();
  useEffect(() => {
    if (!solved) return;

    return cM.registerZone({
      x: x + 23,
      y: y + 17,
      radius: 10,
      data: goldenColorData,
    });
  }, [cM, solved, x, y]);

  return (
    <>
      <FragmentLabel fkey={FragmentKey.F132} x={x + 24} y={y - 4} z={z} decor />
      <Fragment132 x={x} y={y} z={z} />
      <Puzzle132Bulb
        x={ox}
        y={oy}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={0}
        solved={solved}
      />
      <Puzzle132Bulb
        x={ox}
        y={oy + 18}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={1}
        solved={solved}
      />
      <Puzzle132Bulb
        x={ox + 30}
        y={oy}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={2}
        solved={solved}
      />
      <Puzzle132Bulb
        x={ox}
        y={oy + 36}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={3}
        solved={solved}
      />
      <Puzzle132Bulb
        x={ox + 30}
        y={oy + 36}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={4}
        solved={solved}
      />
      <Puzzle132Bulb
        x={ox + 30}
        y={oy + 18}
        z={z + 1}
        active={active}
        setActive={setActive}
        idx={5}
        solved={solved}
      />
      <Line
        x={ox}
        y={oy + 4}
        x1={ox}
        y1={oy + 14}
        opacity={0.5}
        typist={solved}
      />
      <Line
        x={ox}
        y={oy + 22}
        x1={ox}
        y1={oy + 32}
        opacity={0.5}
        typist={solved}
      />
      <Line
        x={ox + 4}
        y={oy + 18 - 3}
        y1={oy + 3}
        x1={ox + 26}
        opacity={0.5}
        typist={solved}
      />
      <Line
        x={ox + 4}
        y={oy + 21}
        y1={oy + 34}
        x1={ox + 27}
        opacity={0.5}
        typist={solved}
      />

      {/* Completion Poem */}
      <CharPixel x={x + 5} y={y + 17} z={z} char="[" opacity={0.5} />
      <CharPixel x={x + 5} y={y + 19} z={z} char="[" opacity={0.5} />
      <CharPixel x={x + 45} y={y + 17} z={z} char="]" opacity={0.5} />
      <CharPixel x={x + 45} y={y + 19} z={z} char="]" opacity={0.5} />
      <PL_Golden x={x + 23} y={y + 17} z={z} typist={solved} />
      <Paragraph
        x={x + 7}
        y={y + 17}
        z={z}
        text={completionPoem}
        typist={solved}
      />
    </>
  );
}

const completionPoem = `
a strand of her golden locks
      I am richer than kings of Troy
`;
