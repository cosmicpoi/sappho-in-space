import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment26Puzzle } from "../../Puzzles/Fragment26Puzzle";
import { Fragment3 } from "../FragmentComponents/Fragment1to9";

export function ZoneAutumn() {
  const { x: cx, y: cy } = useCenter();
  return (
    <>
      <Fragment26Puzzle x={cx - 340} y={cy + 300} z={0} />
      <Fragment3 x={cx - 400} y={cy + 100} />
    </>
  );
}
