import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment112 } from "../FragmentComponents/Fragment110to119";

export function ZoneDay() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment112 x={cx + 250} y={cy + 80} />
    </>
  );
}
