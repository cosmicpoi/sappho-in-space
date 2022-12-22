import * as React from "react";
import { Position3D } from "../../../Utils/types";
import { Paragraph } from "../../Paragraph";
import { fragment112Text } from "../FragmentText/FragmentText110to119";

export function Fragment112({ x, y, z }: Position3D) {
  return <Paragraph x={x} y={y} z={z} text={fragment112Text} />;
}
