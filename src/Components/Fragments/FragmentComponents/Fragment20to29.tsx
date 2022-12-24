import * as React from "react";
import { FragmentKey } from "../../../Data/FragmentData";
import { Position3D } from "../../../Utils/types";
import { FragmentN } from "../Fragments";
import {} from "../FragmentText/FragmentText12to19";
import {
  fragment21text,
  fragment22text,
  fragment23text,
  fragment24Atext,
  fragment24Ctext,
  fragment24Dtext,
  fragment25text,
  fragment27text,
  fragment29Atext,
  fragment29Btext,
  fragment29Ctext,
  fragment29Htext,
} from "../FragmentText/FragmentText20to29";

export const Fragment21 = FragmentN(FragmentKey.F21, fragment21text, 3);
export const Fragment22 = FragmentN(FragmentKey.F22, fragment22text);
export const Fragment23 = FragmentN(FragmentKey.F23, fragment23text);

const Fragment24A = FragmentN(FragmentKey.F24A, fragment24Atext);
const Fragment24C = FragmentN(FragmentKey.F24C, fragment24Ctext);
const Fragment24D = FragmentN(FragmentKey.F24D, fragment24Dtext);

export function Fragment24({ x, y, z }: Position3D) {
  return (
    <>
      <Fragment24A x={x} y={y} z={z} />
      <Fragment24C x={x + 30} y={y + 30} z={z} />
      <Fragment24D x={x + 60} y={y + 60} z={z} />
    </>
  );
}
export const Fragment25 = FragmentN(FragmentKey.F25, fragment25text);
export const Fragment27 = FragmentN(FragmentKey.F27, fragment27text);

const Fragment29A = FragmentN(FragmentKey.F29A, fragment29Atext);
const Fragment29B = FragmentN(FragmentKey.F29B, fragment29Btext);
const Fragment29C = FragmentN(FragmentKey.F29C, fragment29Ctext);
const Fragment29H = FragmentN(FragmentKey.F29H, fragment29Htext);

export function Fragment29({ x, y, z }: Position3D) {
  return (
    <>
      <Fragment29A x={x} y={y} z={z} />
      <Fragment29B x={x + 20} y={y + 20} z={z} />
      <Fragment29C x={x + 40} y={y + 40} z={z} />
      <Fragment29H x={x + 60} y={y + 60} z={z} />
    </>
  );
}
