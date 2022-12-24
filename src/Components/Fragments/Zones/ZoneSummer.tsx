import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment169APuzzle } from "../../Puzzles/Fragment169APuzzle";

export function ZoneSummer() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment169APuzzle x={cx + 300} y={cy + 430} z={0} />
    </>
  );
}
