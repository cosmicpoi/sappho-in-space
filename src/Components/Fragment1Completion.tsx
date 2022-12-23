import * as React from "react";
import { useMemo } from "react";
import {
  FragmentKey,
  FragmentStatus,
  parToPuzzleFrag,
} from "../Data/FragmentData";
import { useLines, usePuzzleStatus } from "../Utils/Hooks";
import { Position3D } from "../Utils/types";
import { fragment1text } from "./Fragments/FragmentText/FragmentText1to9";
import {
  PL_Golden,
  PL_BlackEarth,
  PL_NowAgain,
  PL_Crazy,
  PL_Gifts,
  PL_Accomplish,
  FragmentLabel,
} from "./Labels";
import { Paragraph } from "./Paragraph";

type F1ParProps = Position3D & { parNo: number };

function Fragment1Paragraph({
  x,
  y,
  z,
  parNo,
  inactive,
  typist,
}: F1ParProps & {
  inactive?: boolean;
  typist?: boolean;
}) {
  const alllines = useLines(fragment1text);
  const lines: string = useMemo(
    () =>
      alllines
        .filter((el: string, i: number) => parNo * 5 <= i && i < parNo * 5 + 4)
        .join("\n"),
    [alllines, parNo]
  );
  const text = useMemo(
    () => (!inactive ? lines : lines.replace(/[^_\s]/g, "-")),
    [lines, inactive]
  );

  return (
    <Paragraph
      x={x}
      y={y + parNo * 10}
      z={z}
      text={text}
      opacity={inactive ? 0.5 : 1}
      typist={typist}
    />
  );
}

function Fragment1PuzzlePar({
  x,
  y,
  z,
  parNo,
  children,
}: F1ParProps & { children: React.ReactNode }) {
  const fkey = useMemo(() => parToPuzzleFrag(parNo), [parNo]);
  const [status] = usePuzzleStatus(fkey);

  return (
    <>
      {status === FragmentStatus.Solved ? (
        <>
          <Fragment1Paragraph x={x} y={y} z={z + 1} parNo={parNo} typist />
          {children}
        </>
      ) : (
        <Fragment1Paragraph x={x} y={y} z={z} parNo={parNo} inactive />
      )}
    </>
  );
}

export function Fragment1Completion({ x, y, z }: Position3D) {
  return (
    <>
      <FragmentLabel x={x} y={y - 4} z={z} fkey={FragmentKey.F1} />
      <Fragment1Paragraph x={x} y={y} z={z} parNo={0} />

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={1}>
        <PL_Golden x={x + 6} y={y + 16} z={z + 2} typist />
      </Fragment1PuzzlePar>

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={2}>
        <PL_BlackEarth x={x + 24} y={y + 22} z={z + 2} typist />
      </Fragment1PuzzlePar>

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={3}>
        <PL_NowAgain x={x + 6} y={y + 36} z={z + 2} typist />
      </Fragment1PuzzlePar>

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={4}>
        <PL_Crazy x={x + 6} y={y + 42} z={z + 2} typist />
      </Fragment1PuzzlePar>

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={5}>
        <PL_Gifts x={x + 15} y={y + 52} z={z + 2} typist />
      </Fragment1PuzzlePar>

      <Fragment1PuzzlePar x={x} y={y} z={z} parNo={6}>
        <PL_Accomplish x={x + 3} y={y + 64} z={z + 2} typist />
      </Fragment1PuzzlePar>
    </>
  );
}
