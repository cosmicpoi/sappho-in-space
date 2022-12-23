import * as React from "react";
import { useMemo } from "react";
import { useGameManager } from "..";
import { CharPixelBaseProps } from "../CharPixelLib/CharPixelTypes";
import { FragmentKey, FragmentStatus } from "../Data/FragmentData";
import { useUpdatedValue } from "../Utils/Hooks";
import { Line } from "./Line";

const suffix: Record<FragmentStatus, string> = [".", "?", "*"];

export function FragmentLabel({
  x,
  y,
  z,
  clr,
  fkey,
  decor,
}: CharPixelBaseProps & { fkey: FragmentKey; decor?: boolean }) {
  const { dataManager: dM } = useGameManager();

  const status = useUpdatedValue(
    () => dM.getPuzzleSolved(fkey),
    dM.dataUpdated$
  );

  const str = useMemo(() => fkey + suffix[status], [fkey, status]);

  return (
    <>
      {decor && <Line x={x - 4} y={y} z={z} text={"~ ~"} opacity={0.5} />}
      <Line x={x} y={y} z={z} text={str} clr={clr} opacity={0.5} />
      {decor && <Line x={x + str.length + 1} y={y} z={z} text={"~ ~"} opacity={0.5} />}
    </>
  );
}
