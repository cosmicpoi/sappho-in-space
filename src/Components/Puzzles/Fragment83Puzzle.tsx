import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import { useTrigger } from "../../Utils/Hooks";
import { CollisionGroup, Position3D } from "../../Utils/types";
import { FragmentLabel } from "../FragmentLabel";
import { fragment83Text } from "../Fragments/FragmentText/FragmentText80to89";
import { Line } from "../Line";
import { Paragraph } from "../Paragraph";
import { Wall } from "../Wall";

function Puzzle83Piece({ x, y, z, text }: Position3D & { text: string }) {
  const [active, setActive] = useState<boolean>(false);
  const [str, setStr] = useState<string>(text);

  useEffect(() => {
    if (active) setStr("(now again)");
  }, [active, setActive]);

  const callback = useCallback(
    (data: ActorData) => {
      if (data.collisionGroup === CollisionGroup.HeartParticle) setActive(true);
    },
    [setActive]
  );

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
  return (
    <>
      <FragmentLabel x={x} y={y - 3} z={z} fkey={FragmentKey.F83} />
      <Paragraph x={x - 20} y={y} z={z} text={fragment83Text} />
      <Puzzle83Piece x={x} y={y} z={z} text="right here" />

      <Wall hitbox={{ x: x - 20, y, width: 5, height: 1 }} />
    </>
  );
}
