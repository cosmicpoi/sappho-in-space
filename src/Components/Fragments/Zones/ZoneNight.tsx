import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment83Puzzle } from "../../Puzzles/Fragment83Puzzle";

export function ZoneNight() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment83Puzzle x={cx - 270} y={cy - 80} />
    </>
  );
}
