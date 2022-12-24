import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment20Puzzle } from "../../Puzzles/Fragment20Puzzle";
import { Fragment12 } from "../FragmentComponents/Fragment12to19";
import { Fragment6, Fragment9 } from "../FragmentComponents/Fragment1to9";
import { Fragment22 } from "../FragmentComponents/Fragment20to29";

export function ZoneWinter() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment20Puzzle x={cx - 290} y={cy - 280} z={0} />
      <Fragment6 x={cx - 200} y={cy - 290} />
      <Fragment9 x={cx - 130} y={cy - 200} />
      <Fragment12 x={cx - 50} y={cy - 170} />
      <Fragment22 x={cx - 80} y={cy - 270} />
    </>
  );
}
