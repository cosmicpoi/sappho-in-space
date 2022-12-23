import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import {
  useFrame,
  useLines,
  usePuzzleSolved,
  useTrigger,
} from "../../Utils/Hooks";
import { CollisionGroup, Position3D } from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { FragmentLabel, PL_NowAgain } from "../Labels";
import { fragment83Text } from "../Fragments/FragmentText/FragmentText80to89";
import { Line } from "../Line";
import { Paragraph } from "../Paragraph";

const delay = 5;
const now_again = "(now again)";
const extra = 4;
const gap = 3;

function Puzzle83Piece({
  x,
  y,
  z,
  text,
  done,
  onDone,
  solved,
  idx,
}: Position3D & {
  text: string;
  done?: boolean;
  onDone: () => void;
  solved: boolean;
  idx: number;
}) {
  done = Math.random() < 0.95;

  const [active, setActive] = useState<boolean>(!!done);
  const [str, setStr] = useState<string>(done ? now_again : text);

  const [isGrowing, setIsGrowing] = useState<boolean>(!!done);

  useEffect(() => {
    if (active) onDone();
  }, [active, onDone]);

  const callback = useCallback((data: ActorData) => {
    if (data.collisionGroup === CollisionGroup.HeartParticle) setActive(true);
  }, []);

  useEffect(() => {
    if (active && str.length === 0) setIsGrowing(true);
  }, [str, active]);

  const [coffset, setCoffset] = useState<number>(0);
  const onFrame = useCallback(
    (fc: number) => {
      if (fc % 120 === 0) setCoffset((x) => x + 1);
      if (fc % delay === 0 && active) {
        if (!isGrowing) {
          setStr((str: string) =>
            str.length === 0 ? "" : str.substring(0, str.length - 1)
          );
        } else {
          setStr((str: string) => now_again.substring(0, str.length + 1));
        }
      }
    },
    [active, isGrowing]
  );
  useFrame(onFrame);

  const hitbox: TriggerData | undefined = useMemo(() => {
    if (!active) return { x, y, height: 1, width: 1 + text.length, callback };
    else return undefined;
  }, [x, y, text, active, callback]);

  useTrigger(hitbox);

  const color: string | undefined = useMemo(() => {
    if (!solved) return undefined;
    return `hsl(${((idx + coffset) * 30) % 360}, 80%, 80%)`;
  }, [idx, solved, coffset]);

  return (
    <>
      <CharPixel x={x} y={y} z={z} char="]" clr={color} />
      <Line x={x + 1} y={y} z={z} text={str} clr={color} />
    </>
  );
}

export function Fragment83Puzzle({ x, y, z }: Position3D) {
  const lines83Raw = useLines(fragment83Text);
  const lines83 = useMemo(
    () => lines83Raw.map((str) => str.substring(1, str.length)),
    [lines83Raw]
  );
  const len = useMemo(() => lines83.length + extra, [lines83]);

  const [status, solve] = usePuzzleSolved(FragmentKey.F83);
  const solved = status === FragmentStatus.Solved;

  const [numComplete, setNumComplete] = useState<number>(0);
  const onDone = useCallback(() => {
    setNumComplete((x) => x + 1);
  }, []);

  useEffect(() => {
    if (status !== FragmentStatus.Solved) {
      if (numComplete === len * 4) solve();
    }
  }, [numComplete, len, status, solve]);

  return (
    <>
      <FragmentLabel x={x - 3} y={y - 5} z={z} fkey={FragmentKey.F83} decor />

      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x + i * gap}
          y={y + i * gap}
          z={z}
          text={i < lines83.length ? lines83[i] : ""}
          key={i}
          onDone={onDone}
          solved={solved}
          idx={i}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x - 15 - i * gap}
          y={y + i * gap}
          z={z}
          text={""}
          key={i}
          onDone={onDone}
          solved={solved}
          idx={i + len}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x - 15 - i * gap}
          y={y + len * 2 * gap - i * gap - gap + 1}
          z={z}
          text={""}
          key={i}
          onDone={onDone}
          solved={solved}
          idx={i + len * 2}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x + i * gap}
          y={y + len * 2 * gap - i * gap - gap + 1}
          z={z}
          text={""}
          key={i}
          onDone={onDone}
          solved={solved}
          idx={i + len * 3}
        />
      ))}

      {solved && (
        <>
          <PL_NowAgain x={x - 20 + ox} y={y + 30} z={z} typist />
          <Paragraph
            x={x - 20 + ox}
            y={y + 30}
            z={z}
            text={completionPoem}
            typist
          />
        </>
      )}

      <CharPixel x={x - 23 + ox} y={y + 30} z={z} char={"["} opacity={0.5} />
      <CharPixel x={x - 23 + ox} y={y + 32} z={z} char={"["} opacity={0.5} />
      <CharPixel x={x - 23 + ox} y={y + 34} z={z} char={"["} opacity={0.5} />

      <CharPixel x={x + 15 + ox} y={y + 30} z={z} char={"]"} opacity={0.5} />
      <CharPixel x={x + 15 + ox} y={y + 32} z={z} char={"]"} opacity={0.5} />
      <CharPixel x={x + 15 + ox} y={y + 34} z={z} char={"]"} opacity={0.5} />
    </>
  );
}
const ox = 2;
const completionPoem = `
(now again) my heart tears in two
under a blazing night
              my love births anew`;
