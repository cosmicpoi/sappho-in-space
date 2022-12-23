import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Line } from "../../Line";
import { Paragraph } from "../../Paragraph";
import {
  fragment1text,
  fragment2text,
  fragment3text,
  fragment4text,
  fragment5text,
  fragment6text,
  fragment7text,
  fragment8text,
  fragment9text,
} from "../FragmentText/FragmentText1to9";

export function Fragment1({ x, y, z }: Position3D) {
  return (
    <>
      <Paragraph x={x} y={y} z={z} text={fragment1text} />
      <Line x={x + 6} y={y + 16} z={z + 1} text={"golden"} bold />
      <Line x={x + 24} y={y + 22} z={z + 1} text={"black earth"} bold />
      <Line x={x + 6} y={y + 36} z={z + 1} text={"(now again)"} bold />
      <Line x={x + 6} y={y + 42} z={z + 1} text={"crazy"} bold />
      <Line x={x + 15} y={y + 52} z={z + 1} text={"gifts"} bold />
      <Line x={x + 3} y={y + 64} z={z + 1} text={"accomplish"} bold />
    </>
  );
}

export function Fragment2({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment2text} />;
}

export function Fragment3({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment3text} spacing={3} />;
}

export function Fragment4({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment4text} spacing={3} />;
}

export function Fragment5({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment5text} />;
}

export function Fragment6({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment6text} />;
}

export function Fragment7({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment7text} />;
}

export function Fragment8({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment8text} spacing={4} />;
}

export function Fragment9({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment9text} />;
}
