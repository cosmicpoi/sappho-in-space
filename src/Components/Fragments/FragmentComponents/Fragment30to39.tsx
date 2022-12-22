import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";

export function Fragment30({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={""} />;
}