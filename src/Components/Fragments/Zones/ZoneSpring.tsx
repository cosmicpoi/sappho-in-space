import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment132Puzzle } from "../../Puzzles/Fragment132Puzzle";
import { Fragment2 } from "../FragmentComponents/Fragment1to9";

export function ZoneSpring() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment132Puzzle x={cx + 220} y={cy - 270} z={0} />

      <Fragment2 x={cx + 100} y={cy - 270} />
    </>
  );
}
