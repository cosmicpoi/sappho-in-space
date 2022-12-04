import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import {
  fragment12text,
  fragment15Atext,
  fragment15Btext,
  fragment16text,
  fragment17text,
  fragment18text,
  fragment19text,
} from "../FragmentText/FragmentText12to19";


export function Fragment12({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment12text} />;
}

export function Fragment15({ x, y, z }: Position3D) {
  return (
    <>
      <Paragraph x={x} y={y} z={z} text={fragment15Atext} />;
      <Paragraph x={x + 8} y={y + 20} z={z} text={fragment15Btext} />;
    </>
  );
}

export function Fragment16({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment16text} spacing={3} />;
}

export function Fragment17({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment17text} spacing={3} />;
}

export function Fragment18({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment18text} />;
}

export function Fragment19({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment19text} />;
}
