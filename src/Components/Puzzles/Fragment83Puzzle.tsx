import * as React from "react";
import { FragmentKey } from "../../Data/FragmentData";
import { Position3D } from "../../Utils/types";
import { FragmentLabel } from "../FragmentLabel";
import { fragment83Text } from "../Fragments/FragmentText/FragmentText80to89";
import { Paragraph } from "../Paragraph";

export function Fragment83Puzzle({ x, y, z }: Position3D) {
  return (
    <>
      <FragmentLabel x={x} y={y - 3} z={z} fkey={FragmentKey.F83} />
      <Paragraph x={x} y={y} z={z} text={fragment83Text} />
    </>
  );
}
