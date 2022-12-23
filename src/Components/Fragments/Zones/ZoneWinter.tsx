import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment20Puzzle } from "../../Puzzles/Fragmet20Puzzle";

export function ZoneWinter() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment20Puzzle x={cx - 430} y={cy - 440} z={0} />
    </>
  );
}
