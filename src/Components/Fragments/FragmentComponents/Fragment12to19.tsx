import * as React from "react";
import { FragmentKey } from "../../../Data/FragmentData";
import { Position3D } from "../../../Utils/types";
import { FragmentN } from "../Fragments";
import {
  fragment12text,
  fragment15Atext,
  fragment15Btext,
  fragment16text,
  fragment17text,
  fragment18text,
  fragment19text,
} from "../FragmentText/FragmentText12to19";

export const Fragment12 = FragmentN(FragmentKey.F12, fragment12text);
const Fragment15A = FragmentN(FragmentKey.F15A, fragment15Atext);
const Fragment15B = FragmentN(FragmentKey.F15B, fragment15Btext);

export function Fragment15({ x, y, z }: Position3D) {
  return (
    <>
      <Fragment15A x={x} y={y} z={z} />
      <Fragment15B x={x + 16} y={y + 24} z={z} />
    </>
  );
}

export const Fragment16 = FragmentN(FragmentKey.F16, fragment16text);
export const Fragment17 = FragmentN(FragmentKey.F17, fragment17text);
export const Fragment18 = FragmentN(FragmentKey.F18, fragment18text);
export const Fragment19 = FragmentN(FragmentKey.F19, fragment19text);
