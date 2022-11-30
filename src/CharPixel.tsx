import * as React from "react";
import styled from "styled-components";
import { PIXEL_WIDTH, t_v } from "./consts";

const StyledCharPixel = styled.span<Position>`
  position: absolute;
  width: ${PIXEL_WIDTH}px;
  height: ${PIXEL_WIDTH}px;

  left: ${({ x }) => x * PIXEL_WIDTH}px;
  top: ${({ y }) => y * PIXEL_WIDTH}px;

  /* background: yellow;
  outline: 1px solid red; */

  line-height: ${PIXEL_WIDTH}px;
  display: inline-block;
`;

const Short = styled.span`
  transform: scale(1, 0.7);
  display: inline-block;
`;
const ShortPipe = () => <Short>|</Short>;
const ShortTV = () => <Short>{t_v}</Short>;

export function CharPixel({ x, y, char }: Position & { char: string }) {
  var content: React.ReactNode | string = char;

  if (char === "|") content = <ShortPipe />;
  if (char === t_v) content = <ShortTV />;

  return (
    <StyledCharPixel x={x} y={y}>
      {content}
    </StyledCharPixel>
  );
}

export function Line({ x, y, text }: Position & { text: string }) {
  return (
    <>
      {text.split("").map((str: string, i: number) => (
        <CharPixel x={x + i} y={y} char={str} />
      ))}
    </>
  );
}
