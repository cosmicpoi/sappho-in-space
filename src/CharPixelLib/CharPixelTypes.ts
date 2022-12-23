import { Position3D, TextAlign } from "../Utils/types";

export type CharPixelStyle = {
  clr?: string;
  opacity?: number;
  bold?: boolean;
  transition?: number;
};
export type CharPixelBaseProps = Position3D &
  CharPixelStyle & {
    isWall?: boolean;
    typist?: boolean; // boolean (visible) | undefined
    twinkle?: number; // [1...10] | undefined
  };

export type CharPixelProps = CharPixelBaseProps & { char: string | undefined };
export type CharPixelBlockProps = CharPixelBaseProps & {
  text: string;
  align?: TextAlign;
};
