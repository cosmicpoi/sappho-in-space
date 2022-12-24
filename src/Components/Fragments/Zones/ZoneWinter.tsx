import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment20Puzzle } from "../../Puzzles/Fragment20Puzzle";
import { Fragment6 } from "../FragmentComponents/Fragment1to9";

export function ZoneWinter() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment20Puzzle x={cx - 430} y={cy - 440} z={0} />
      <Fragment6 x={cx - 200} y={cy - 290} />
    </>
  );
}
