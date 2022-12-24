import * as React from "react";
import { FragmentKey } from "../../Data/FragmentData";
import { Position3D } from "../../Utils/types";
import { FragmentLabel } from "../Labels";
import { Paragraph } from "../Paragraph";

export type FragmentProps = Position3D;
export const FragmentN = (fkey: FragmentKey, text: string, spacing = 2) => {
  const F = ({ x, y, z }: FragmentProps) => (
    <>
      <FragmentLabel x={x} y={y - 4} z={z} fkey={fkey} />
      <Paragraph x={x} y={y} z={z} text={text} spacing={spacing} />
    </>
  );
  return F;
};
