import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment132Puzzle } from "../../Puzzles/Fragment132Puzzle";
import { Fragment2 } from "../FragmentComponents/Fragment1to9";
import { Fragment27, Fragment29 } from "../FragmentComponents/Fragment20to29";

export function ZoneSpring() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment132Puzzle x={cx + 220} y={cy - 270} z={0} />

      <Fragment2 x={cx + 100} y={cy - 270} />
      <Fragment27 x={cx + 250} y={cy - 50} />
      <Fragment29 x={cx + 120} y={cy - 180} />
    </>
  );
}
