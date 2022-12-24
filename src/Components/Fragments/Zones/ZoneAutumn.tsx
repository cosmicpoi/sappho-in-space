import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment26Puzzle } from "../../Puzzles/Fragment26Puzzle";
import { Fragment17, Fragment18 } from "../FragmentComponents/Fragment12to19";
import { Fragment3 } from "../FragmentComponents/Fragment1to9";
import { Fragment21 } from "../FragmentComponents/Fragment20to29";

export function ZoneAutumn() {
  const { x: cx, y: cy } = useCenter();
  return (
    <>
      <Fragment26Puzzle x={cx - 280} y={cy + 80} z={0} />
      <Fragment3 x={cx - 270} y={cy + 150} />
      <Fragment17 x={cx - 200} y={cy + 200} />
      <Fragment18 x={cx - 50} y={cy + 200} />
      <Fragment21 x={cx - 130} y={cy + 130} />
    </>
  );
}
