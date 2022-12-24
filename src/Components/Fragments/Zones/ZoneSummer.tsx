import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment169APuzzle } from "../../Puzzles/Fragment169APuzzle";
import { Fragment4 } from "../FragmentComponents/Fragment1to9";

export function ZoneSummer() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment169APuzzle x={cx + 300} y={cy + 400} z={0} />
      <Fragment4 x={cx + 300} y={cy + 170} />
    </>
  );
}
