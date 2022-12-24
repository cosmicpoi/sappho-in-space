import * as React from "react";
import { useMemo } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { CANVAS_HEIGHT, CANVAS_WIDTH, t_v } from "../../Utils/consts";
import { Layer, Position } from "../../Utils/types";
import { clamp, randEl, seededRandom } from "../../Utils/utils";
import { Paragraph } from "../Paragraph";

const rand = seededRandom(1);

type StarData = Position & {
  opacity: number;
  content: string;
  twinkle?: number;
};

const freq = 50; // smaller -> more
const S_W = CANVAS_WIDTH / freq;
const S_H = CANVAS_HEIGHT / freq;
const starProb = 0.3;
const twinkleProb = 0.2;
const maxOpacity = 0.75;

const star2 = `
 |
-+-
 |
`;
const star2A = `
 ${t_v}
<o>
 v
`;
const star2C = `
\\ /
 *
/ \\
`;

const makeStar = (i: number, j: number): StarData => {
  const size = rand.i(3);
  let content = "*";
  if (size === 1) content = "^^";
  if (size === 2) content = randEl([star2, star2A, star2C]);
  return {
    x: clamp(i * freq + rand.i(30) - 15, 0, CANVAS_WIDTH - 10),
    y: clamp(j * freq + rand.i(30) - 15, 0, CANVAS_HEIGHT - 10),
    content: content,
    opacity: rand.f(),
    twinkle: rand.f() < twinkleProb ? rand.i(10) : undefined,
  };
};

/* React Stuff */

function Star({ data }: { data: StarData }) {
  const { x, y, opacity, content, twinkle } = data;

  return (
    <>
      {content.length === 1 ? (
        <CharPixel
          x={x}
          y={y}
          z={Layer.Stars}
          opacity={opacity * maxOpacity}
          char={content}
          twinkle={twinkle}
        />
      ) : (
        <Paragraph
          x={x}
          y={y}
          z={Layer.Stars}
          opacity={opacity * maxOpacity}
          text={content}
          twinkle={twinkle}
          spacing={1}
        />
      )}
    </>
  );
}

export function StarField() {
  const stars: StarData[] = useMemo(() => {
    const s: StarData[] = [];
    for (let i = 0; i < S_W; i++) {
      for (let j = 0; j < S_H; j++) {
        if (Math.random() < starProb) s.push(makeStar(i, j));
      }
    }
    return s;
  }, []);
  return (
    <>
      {stars.map((d, i) => (
        <Star key={i} data={d} />
      ))}
    </>
  );
}
