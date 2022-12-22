import * as React from "react";
import { useCenter } from "../../Utils/Hooks";
import { Fragment26 } from "./FragmentComponents/Fragment20to29";

export function ZoneAutumn() {
  const { x: cx, y: cy } = useCenter();
  return (
    <>
      <Fragment26 x={cx - 340} y={cy + 300} />
    </>
  );
}
