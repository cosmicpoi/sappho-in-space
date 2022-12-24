import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameManager } from "../..";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import {
  useActor,
  useFrame,
  useLines,
  usePuzzleStatus,
  useTrigger,
} from "../../Utils/Hooks";
import { CollisionGroup, Hook, Position, Position3DR } from "../../Utils/types";
import { clamp, randEl, randIntRange, randomRange } from "../../Utils/utils";
import { crazyColorData } from "../FloatingBG";
import { fragment26text } from "../Fragments/FragmentText/FragmentText20to29";
import { FragmentLabel, PL_Crazy } from "../Labels";
import { Paragraph } from "../Paragraph";
import { DebugBox } from "../Wall";

type LetterData = Position & {
  char: string;
  fixed: boolean;
};

function Puzzle26Letter({
  letter,
  z,
  idx,
  setData,
}: {
  letter: LetterData;
  z: number;
  idx: number;
  setData: Hook<LetterData[]>[1];
}) {
  const gM = useGameManager();
  const { char, fixed } = letter;
  const [pos, setPos] = useState<Position>({
    x: letter.x + randIntRange(-10, 10),
    y: letter.y + randIntRange(-10, 10),
  });
  const [unfixedChar, setUnfixedChar] = useState<string | undefined>(char);

  const motion = useActor(pos, {});

  const onFrame = useMemo(() => {
    if (fixed) return undefined;
    else
      return (fc: number) => {
        if (!gM.viewportManager.onScreen(motion.getPosition())) return;
        if (fc % 300 === 0) {
          motion.setVelocity({
            x: randomRange(-0.1, 0.1),
            y: randomRange(-0.1, 0.1),
          });
        }
        let update = false;
        if (fc % 5 === 0) {
          update = motion.onFrame();
          const mp = motion.getPosition();
          motion.setPosition({
            x: clamp(mp.x, letter.x - 30, letter.x + 30),
            y: clamp(mp.y, letter.y - 30, letter.y + 30),
          });
        }
        if (fc % 30 === 0 && update) {
          const mp0 = motion.getPosition();
          setPos({ x: mp0.x, y: mp0.y });
        }
      };
  }, [fixed, motion, letter, gM]);
  useFrame(onFrame);

  const fix = useCallback(() => {
    setData((d: LetterData[]) => {
      const arr = [...d];
      const el = arr[idx];
      arr[idx] = {
        x: el.x,
        y: el.y,
        fixed: true,
        char: el.char,
      };
      return arr;
    });
    setTimeout(() => {
      setUnfixedChar(randEl(["%", "$", "^", "*", ".", "@", "'"]));
    }, 500);
    setTimeout(() => {
      setUnfixedChar(undefined);
    }, 1000);
  }, [setData, idx]);

  const onHit = useCallback(
    (data: ActorData) => {
      if (data.collisionGroup === CollisionGroup.HeartParticle) fix();
    },
    [fix]
  );

  const hitbox: TriggerData | undefined = useMemo(() => {
    if (fixed) return undefined;
    else
      return {
        x: pos.x - 1,
        y: pos.y - 1,
        height: 3,
        width: 3,
        callback: onHit,
      };
  }, [onHit, fixed, pos]);

  useTrigger(hitbox);

  return (
    <>
      <DebugBox hitbox={hitbox} />
      {fixed && (
        <CharPixel x={letter.x} y={letter.y} z={z} char={char} typist />
      )}

      {unfixedChar !== undefined && (
        <CharPixel
          x={pos.x}
          y={pos.y}
          z={z + 1}
          char={unfixedChar}
          opacity={unfixedChar === char ? 0.5 : 0.25}
        />
      )}
    </>
  );
}

export function Fragment26Puzzle({ x, y, z }: Position3DR) {
  const [status, solve] = usePuzzleStatus(FragmentKey.F26);
  const solved = status === FragmentStatus.Solved;

  const { colorManager: cM } = useGameManager();
  useEffect(() => {
    if (!solved) return;

    return cM.registerZone({
      x: x + 18,
      y: y - 6,
      radius: 10,
      data: crazyColorData,
    });
  }, [cM, solved, x, y]);

  const lines = useLines(fragment26text);

  const [data, setData] = useState<LetterData[]>(() => {
    const l: LetterData[] = [];
    for (let i = 0; i < lines.length; i++) {
      const letters = lines[i].split("");
      for (let j = 0; j < letters.length; j++) {
        const char = letters[j];
        if (char !== " ")
          l.push({ x: x + j, y: y + i * 2, char, fixed: false });
      }
    }

    return l;
  });

  useEffect(() => {
    if (
      data.map((d: LetterData) => d.fixed).reduce((prev, curr) => prev && curr)
    ) {
      solve();
    }
  }, [data, solve]);

  return (
    <>
      <FragmentLabel x={x + 16} y={y - 14} decor fkey={FragmentKey.F26} />
      <CharPixel x={x + 4} y={y - 10} char={"["} opacity={0.5} />
      <CharPixel x={x + 30} y={y - 10} char={"]"} opacity={0.5} />
      <CharPixel x={x + 4} y={y - 8} char={"["} opacity={0.5} />
      <CharPixel x={x + 30} y={y - 8} char={"]"} opacity={0.5} />

      {data.map((letter: LetterData, i) => (
        <Puzzle26Letter
          key={i}
          letter={letter}
          z={z}
          setData={setData}
          idx={i}
        />
      ))}

      {solved && (
        <>
          <Paragraph x={x + 7} y={y - 10} z={z} text={completionPoem} typist />
          <PL_Crazy x={x + 18} y={y - 10} z={z + 1} typist />
        </>
      )}
    </>
  );
}

const completionPoem = `
she is not crazy
  but I was only dust
`;
