import * as React from "react";
import { useMemo } from "react";
import { useGameManager } from "..";
import { CharPixelBaseProps } from "../CharPixelLib/CharPixelTypes";
import { FragmentKey, FragmentStatus } from "../Data/FragmentData";
import { useUpdatedValue } from "../Utils/Hooks";
import { Position3D } from "../Utils/types";
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
      {decor && (
        <Line x={x + str.length + 1} y={y} z={z} text={"~ ~"} opacity={0.5} />
      )}
    </>
  );
}

export const PL_Golden = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"golden"} bold />
);
export const PL_BlackEarth = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"black earth"} bold />
);
export const PL_NowAgain = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"(now again)"} bold />
);
export const PL_Crazy = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"crazy"} bold />
);
export const PL_Gifts = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"gifts"} bold />
);
export const PL_Accomplish = ({ x, y, z }: Position3D) => (
  <Line x={x} y={y} z={z} text={"accomplish"} bold />
);