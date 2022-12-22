import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import { fragment169AText } from "../FragmentText/FragmentText160to169";

export function Fragment169A({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment169AText} />;
}
