import * as React from "react";
import { useMemo } from "react";
import { CharPixelBaseProps } from "../CharPixelLib/CharPixelTypes";
import { FragmentKey, FragmentStatus } from "../Data/FragmentData";
import { usePuzzleStatus } from "../Utils/Hooks";
import { Position3D } from "../Utils/types";
import { LineText } from "./LineText";

const suffix: Record<FragmentStatus, string> = [".", "?", "*"];

export function FragmentLabel({
  x,
  y,
  z,
  fkey,
  decor,
}: CharPixelBaseProps & { fkey: FragmentKey; decor?: boolean }) {
  const [status] = usePuzzleStatus(fkey);

  const str = useMemo(() => fkey + suffix[status], [fkey, status]);

  return (
    <>
      {decor && <LineText x={x - 4} y={y} z={z} text={"~ ~"} opacity={0.5} />}
      <LineText x={x} y={y} z={z} text={str} opacity={0.5} />
      {decor && (
        <LineText x={x + str.length + 1} y={y} z={z} text={"~ ~"} opacity={0.5} />
      )}
    </>
  );
}

type PLProps = Position3D & { typist?: boolean };
export const PL_Golden = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"golden"} bold typist={typist} />
);
export const PL_BlackEarth = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"black earth"} bold typist={typist} />
);
export const PL_NowAgain = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"(now again)"} bold typist={typist} />
);
export const PL_Crazy = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"crazy"} bold typist={typist} />
);
export const PL_Gifts = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"gifts"} bold typist={typist} />
);
export const PL_Accomplish = ({ x, y, z, typist }: PLProps) => (
  <LineText x={x} y={y} z={z} text={"accomplish"} bold typist={typist} />
);
