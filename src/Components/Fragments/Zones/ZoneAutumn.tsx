import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment26Puzzle } from "../../Puzzles/Fragment26Puzzle";

export function ZoneAutumn() {
  const { x: cx, y: cy } = useCenter();
  return (
    <>
      <Fragment26Puzzle x={cx - 340} y={cy + 300} z={0} />
    </>
  );
}
