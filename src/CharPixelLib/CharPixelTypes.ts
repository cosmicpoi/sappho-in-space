import { Position3D, TextAlign } from "../Utils/types";

export type CharPixelStyle = {
  color?: string;
  opacity?: number;
  twinkle?: number;
};
export type CharPixelBaseProps = Position3D &
  CharPixelStyle & { isWall?: boolean };

export type CharPixelProps = CharPixelBaseProps & { char: string | undefined };
export type CharPixelBlockProps = CharPixelBaseProps & {
  text: string;
  align?: TextAlign;
};
