import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import { fragment83Text } from "../FragmentText/FragmentText80to89";

export function Fragment83({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment83Text} />;
}
