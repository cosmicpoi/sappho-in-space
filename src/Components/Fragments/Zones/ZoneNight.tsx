import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment83 } from "../FragmentComponents/Fragment80to89";

export function ZoneNight() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment83 x={cx - 270} y={cy - 80} />
    </>
  );
}
