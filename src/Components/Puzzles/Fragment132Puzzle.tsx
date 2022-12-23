import * as React from "react";
import { FragmentKey } from "../../Data/FragmentData";
import { Position3D } from "../../Utils/types";
import { Fragment132 } from "../Fragments/FragmentComponents/Fragment130to139";
import { FragmentLabel } from "../Labels";
import { Line } from "../Line";

export function Fragment132Puzzle({ x, y, z }: Position3D) {
  return (
    <>
      <FragmentLabel fkey={FragmentKey.F132} x={x} y={y - 3} z={z} />
      <Fragment132 x={x} y={y} z={z} />
      {/* <Line x={x - 10} y={y} x1={x + 15} y1={y + 10} /> */}
    </>
  );
}
