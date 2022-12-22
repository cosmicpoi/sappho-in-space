import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment2 } from "../FragmentComponents/Fragment1to9";

export function ZoneSpring() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment2 x={cx + 340} y={cy - 450} />
    </>
  );
}
