import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import {} from "../FragmentText/FragmentText12to19";
import {
  fragment20text,
  fragment21text,
  fragment22text,
  fragment23text,
  fragment24Atext,
  fragment24Ctext,
  fragment24Dtext,
  fragment25text,
  fragment26text,
  fragment27text,
  fragment29Atext,
  fragment29Btext,
  fragment29Ctext,
  fragment29Htext,
} from "../FragmentText/FragmentText20to29";

export function Fragment20({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment20text} />;
}

export function Fragment21({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment21text} />;
}

export function Fragment22({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment22text} />;
}

export function Fragment23({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment23text} />;
}

export function Fragment24({ x, y, z }: Position3D) {
  return (
    <>
      <Paragraph x={x} y={y} z={z} text={fragment24Atext} />
      <Paragraph x={x + 10} y={y + 20} z={z} text={fragment24Ctext} />
      <Paragraph x={x + 20} y={y + 40} z={z} text={fragment24Dtext} />
    </>
  );
}
export function Fragment25({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment25text} />;
}
export function Fragment26({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment26text} />;
}
export function Fragment27({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment27text} />;
}

export function Fragment29({ x, y, z }: Position3D) {
  return (
    <>
      <Paragraph x={x} y={y} z={z} text={fragment29Atext} />
      <Paragraph x={x + 20} y={y + 20} z={z} text={fragment29Btext} />
      <Paragraph x={x + 40} y={y + 40} z={z} text={fragment29Ctext} />
      <Paragraph x={x + 60} y={y + 60} z={z} text={fragment29Htext} />
    </>
  );
}
