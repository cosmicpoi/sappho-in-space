import * as React from "react";
import { CharPixelBaseProps } from "../../../CharPixelLib/CharPixelTypes";
import { Paragraph } from "../../Paragraph";
import { fragment132Text } from "../FragmentText/FragmentText130to139";

export function Fragment132({ x, y, z, typist }: CharPixelBaseProps) {
  return <Paragraph x={x} y={y} z={z} text={fragment132Text} typist={typist} />;
}
