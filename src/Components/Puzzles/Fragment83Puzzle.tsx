import * as React from "react";
import { useEffect, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey } from "../../Data/FragmentData";
import { Position3D } from "../../Utils/types";
import { FragmentLabel } from "../FragmentLabel";
import { fragment83Text } from "../Fragments/FragmentText/FragmentText80to89";
import { Line } from "../Line";
import { Paragraph } from "../Paragraph";

function Puzzle83Piece({ x, y, z, text }: Position3D & { text: string }) {
  const [active, setActive] = useState<boolean>(false);
  const [str, setStr] = useState<string>(text);

  useEffect(() => {
    if (active) setStr("(now again)");
  }, [active, setActive]);

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
      <Paragraph x={x-20} y={y} z={z} text={fragment83Text} />
      <Puzzle83Piece x={x} y={y} z={z} text="right here" />
    </>
  );
}
