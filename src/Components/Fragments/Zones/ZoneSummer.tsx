import * as React from "react";
import { useCenter } from "../../../Utils/Hooks";
import { Fragment169A } from "../FragmentComponents/Fragment160to169";

export function ZoneSummer() {
  const { x: cx, y: cy } = useCenter();

  return (
    <>
      <Fragment169A x={cx + 300} y={cy + 430} />
    </>
  );
}
