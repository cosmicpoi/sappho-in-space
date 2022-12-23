import { Position3D, TextAlign } from "../Utils/types";

export type CharPixelStyle = {
  clr?: string;
  opacity?: number;
  twinkle?: number;
  bold?: boolean;
  typist?: boolean;
};
export type CharPixelBaseProps = Position3D &
  CharPixelStyle & { isWall?: boolean };

export type CharPixelProps = CharPixelBaseProps & { char: string | undefined; };
export type CharPixelBlockProps = CharPixelBaseProps & {
  text: string;
  align?: TextAlign;
};
