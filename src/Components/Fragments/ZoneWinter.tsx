import * as React from "react";
import { useCenter } from "../../Utils/Hooks";
import { Fragment20 } from "./FragmentComponents/Fragment20to29";

export function ZoneWinter() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment20 x={cx - 430} y={cy - 440} />
    </>
  );
}
