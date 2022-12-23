import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment132Puzzle } from "../../Puzzles/Fragment132Puzzle";

export function ZoneSpring() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment132Puzzle x={cx + 340} y={cy - 450} />
    </>
  );
}
