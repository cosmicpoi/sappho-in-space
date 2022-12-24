import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment112Puzzle } from "../../Puzzles/Fragment112Puzzle";

export function ZoneDay() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment112Puzzle x={cx + 250} y={cy + 80} z={0} />
    </>
  );
}
