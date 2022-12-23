import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import { useFrame, useLines, useTrigger } from "../../Utils/Hooks";
import { CollisionGroup, Position3D } from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { FragmentLabel } from "../FragmentLabel";
import { fragment83Text } from "../Fragments/FragmentText/FragmentText80to89";
import { Line } from "../Line";

const delay = 5;
const now_again = "(now again)";

const extra = 3;

const gap = 3;

function Puzzle83Piece({
  x,
  y,
  z,
  text,
  done,
}: Position3D & { text: string; done?: boolean }) {
  const [active, setActive] = useState<boolean>(!!done);
  const [str, setStr] = useState<string>(done ? now_again : text);

  const [isGrowing, setIsGrowing] = useState<boolean>(!!done);

  const callback = useCallback((data: ActorData) => {
    if (data.collisionGroup === CollisionGroup.HeartParticle) setActive(true);
  }, []);

  useEffect(() => {
    if (active && str.length === 0) setIsGrowing(true);
  }, [str, active]);

  const onFrame = useCallback(
    (fc: number) => {
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

  return (
    <>
      <CharPixel x={x} y={y} z={z} char="]" />
      <Line x={x + 1} y={y} z={z} text={str} />
    </>
  );
}

export function Fragment83Puzzle({ x, y, z }: Position3D) {
  const lines83Raw = useLines(fragment83Text);
  const lines83 = useMemo(
    () => lines83Raw.map((str) => str.substring(1, str.length)),
    [lines83Raw]
  );

  const len = lines83.length + extra;

  return (
    <>
      <FragmentLabel x={x - 8} y={y - 5} z={z} fkey={FragmentKey.F83} decor />

      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x + i * gap}
          y={y + i * gap}
          z={z}
          text={i < lines83.length ? lines83[i] : ""}
          key={i}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x - 14 - i * gap}
          y={y + i * gap}
          z={z}
          text={""}
          key={i}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x - 14 - i * gap}
          y={y + len * 2 * gap - i * gap - gap}
          z={z}
          text={""}
          key={i}
        />
      ))}
      {toN(len).map((i: number) => (
        <Puzzle83Piece
          x={x + i * gap}
          y={y + len * 2 * gap - i * gap - gap}
          z={z}
          text={""}
          key={i}
        />
      ))}
    </>
  );
}

`~ ~ (now again) ~ ~

(now again) my heart is torn in two
under a blazing sun
                  my love is born anew`;
