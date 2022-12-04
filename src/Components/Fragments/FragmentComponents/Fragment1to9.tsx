import * as React from "react";
import { Position3D } from "../../../Utils/types";
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
  return <Paragraph x={x} y={y} z={z} text={fragment1text} />;
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
