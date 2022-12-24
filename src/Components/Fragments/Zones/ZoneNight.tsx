import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment83Puzzle } from "../../Puzzles/Fragment83Puzzle";
import { Fragment7 } from "../FragmentComponents/Fragment1to9";
import { Fragment24 } from "../FragmentComponents/Fragment20to29";

export function ZoneNight() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment83Puzzle x={cx - 130} y={cy} />
      <Fragment7 x={cx - 30} y={cy + 80} />
      <Fragment24 x={cx - 50} y={cy - 110} />
    </>
  );
}
