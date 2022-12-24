import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment169APuzzle } from "../../Puzzles/Fragment169APuzzle";
import { Fragment16, Fragment19 } from "../FragmentComponents/Fragment12to19";
import { Fragment4, Fragment8 } from "../FragmentComponents/Fragment1to9";

export function ZoneSummer() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment169APuzzle x={cx + 230} y={cy + 220} z={0} />
      <Fragment4 x={cx + 150} y={cy + 120} />
      <Fragment8 x={cx + 30} y={cy + 160} />
      <Fragment16 x={cx + 60} y={cy + 200} />
      <Fragment19 x={cx + 230} y={cy + 80} />
    </>
  );
}
