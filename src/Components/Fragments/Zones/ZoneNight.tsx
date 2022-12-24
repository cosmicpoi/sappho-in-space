import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment83Puzzle } from "../../Puzzles/Fragment83Puzzle";
import { Fragment7 } from "../FragmentComponents/Fragment1to9";

export function ZoneNight() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment83Puzzle x={cx - 270} y={cy - 80} />

      <Fragment7 x={cx - 50} y={cy - 55} />
    </>
  );
}
