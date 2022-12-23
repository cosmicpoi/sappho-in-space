import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import { fragment132Text } from "../FragmentText/FragmentText130to139";

export function Fragment132({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment132Text} />;
}
