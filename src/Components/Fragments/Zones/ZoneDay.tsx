import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment112Puzzle } from "../../Puzzles/Fragment112Puzzle";
import { Fragment15 } from "../FragmentComponents/Fragment12to19";
import { Fragment5 } from "../FragmentComponents/Fragment1to9";
import { Fragment23 } from "../FragmentComponents/Fragment20to29";

export function ZoneDay() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment112Puzzle x={cx + 80} y={cy + 60} z={0} />
      <Fragment5 x={cx + 50} y={cy - 80} />
      <Fragment15 x={cx + 100} y={cy} />
      <Fragment23 x={cx + 140} y={cy - 60} />
    </>
  );
}
