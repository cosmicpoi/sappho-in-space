import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { CircleTriggerData } from "../../Engine/CollisionManager";
import {
  useCircleTrigger,
  usePuzzleStatus,
  useSpaceshipPos,
} from "../../Utils/Hooks";
import {
  CollisionGroup,
  Position,
  Position3DR,
  TextAlign,
} from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { Fragment169A } from "../Fragments/FragmentComponents/Fragment160to169";
import { FragmentLabel, PL_Gifts } from "../Labels";
import { LineText } from "../LineText";
import { Paragraph } from "../Paragraph";
import { DebugBox } from "../Wall";

const giftW = 19;
const giftH = 13;
const giftM = 6;
const giftR = Math.ceil(Math.sqrt((giftH / 2) ** 2 + (giftM / 2) ** 2));
const giftCols = 4;
const giftRows = 3;

const totalW = giftCols * giftW + (giftCols - 1) * giftM;
const totalH = giftRows * giftW + (giftRows - 1) * giftW;

enum GiftState {
  Neutral,
  Nearby,
  Overlapping,
  Selected,
}

function Puzzle169AGift({
  cx,
  yTop,
  z,
  row,
  col,
  content,
  len,
  fkey,
  offY,
  gift,
}: {
  cx: number;
  yTop: number;
  z: number;
  row: number;
  col: number;
  content: string;
  len: number;
  fkey: FragmentKey;
  offY?: number;
  gift?: boolean;
}) {
  const x = cx - totalW / 2 + col * (giftW + giftM);
  const y = yTop + row * (giftH + giftM);

  const [state, setState] = useState<GiftState>(GiftState.Neutral);

  const contentChar: string | undefined = useMemo(() => {
    if (state === GiftState.Neutral) return "%";
    else if (state === GiftState.Nearby) return "+";
    else if (state === GiftState.Overlapping) return ".";
    else if (state === GiftState.Selected) return "~";
    return undefined;
  }, [state]);
  const contentOpacity: number = useMemo(() => {
    if (state === GiftState.Selected) return 0.5;
    else if (state === GiftState.Overlapping) return 0.5;
    else return 1;
  }, [state]);

  const spaceshipPos: Position | undefined = useSpaceshipPos();

  const center: Position = useMemo(
    () => ({ x: Math.floor(x + giftW / 2), y: Math.floor(y + giftH / 2) }),
    [x, y]
  );

  useEffect(() => {
    if (!spaceshipPos) return;

    const dx = center.x - spaceshipPos.x;
    const dy = center.y - spaceshipPos.y;

    const rad = Math.sqrt(dx ** 2 + dy ** 2);
    if (rad <= giftR * 1.5) setState(GiftState.Overlapping);
    else if (rad <= giftR * 3) setState(GiftState.Nearby);
    else setState(GiftState.Neutral);
  }, [spaceshipPos, center]);

  const spaces: string = useMemo(() => {
    // const padded = len % 2 === 0 ? len + 3 : len + 2;

    const line = " ".repeat(giftW - 4);
    return line;
  }, [len]);
  let showGift: boolean =
    state === GiftState.Overlapping || state === GiftState.Selected;

  showGift = true;

  return (
    <>
      <DebugBox
        hitbox={{
          x,
          y,
          width: giftW,
          height: giftH,
        }}
      />
      {/* Contents */}
      {toN(Math.ceil((giftH - 2) / 2)).map((i) => (
        <React.Fragment key={i}>
          {toN(Math.ceil((giftW - 2) / 2)).map((j) => (
            <CharPixel
              key={j}
              x={x + 1 + j * 2}
              y={y + 1 + i * 2}
              z={z}
              char={contentChar}
              opacity={contentOpacity}
            />
          ))}
        </React.Fragment>
      ))}

      {showGift && (
        <>
          {toN(3).map((i) => (
            <React.Fragment key={i}>
              {spaces.split("").map((c, j) => (
                <CharPixel
                  key={j}
                  x={x + 2 + j}
                  y={center.y - 1 + i}
                  z={z + 1}
                  char={c}
                />
              ))}
            </React.Fragment>
          ))}
          <Paragraph
            x={center.x - Math.floor(len / 2)}
            y={center.y + (offY || 0)}
            text={content}
            z={z + 2}
            align={TextAlign.Center}
            spacing={1}
          />
          <FragmentLabel fkey={fkey} x={x + 1} y={y + 1} z={z + 2} short />
        </>
      )}

      {/* Frame */}
      <CharPixel x={x} y={y} z={z} char="+" />
      <CharPixel x={x + giftW - 1} y={y + giftH - 1} z={z} char="+" />
      <CharPixel x={x} y={y + giftH - 1} z={z} char="+" />
      <CharPixel x={x + giftW - 1} y={y} z={z} char="+" />
      {toN(giftW - 2).map((i) => (
        <React.Fragment key={i}>
          <CharPixel x={x + i + 1} y={y} z={z} char={"-"} />
          <CharPixel x={x + i + 1} y={y + giftH - 1} z={z} char={"-"} />
        </React.Fragment>
      ))}
      {toN(giftH - 2).map((i) => (
        <React.Fragment key={i}>
          <CharPixel x={x} y={y + i + 1} z={z} char={"|"} />
          <CharPixel x={x + giftW - 1} y={y + i + 1} z={z} char={"|"} />
        </React.Fragment>
      ))}
    </>
  );
}

export function Fragment169APuzzle({ x, y, z }: Position3DR) {
  const [status, solve] = usePuzzleStatus(FragmentKey.F26);
  const solved = status === FragmentStatus.Solved;

  const cx = x + 2;

  const yT = y + 15;

  return (
    <>
      <FragmentLabel fkey={FragmentKey.F169A} x={x} y={y - 4} z={z} decor />
      <Fragment169A x={x - 4} y={y} z={z} />

      <CharPixel x={cx - 1} y={y + 3} char="0" />
      <CharPixel x={cx} y={y + 3} char="/" opacity={0.5} />
      <CharPixel x={cx + 1} y={y + 3} char="0" />

      {/* Copmletion Poem */}
      <CharPixel x={cx - 18} y={y + 7} char={"["} opacity={0.5} />
      <CharPixel x={cx + 18} y={y + 7} char={"]"} opacity={0.5} />
      <CharPixel x={cx - 18} y={y + 9} char={"["} opacity={0.5} />
      <CharPixel x={cx + 18} y={y + 9} char={"]"} opacity={0.5} />

      {solved && (
        <>
          <Paragraph x={x - 13} y={y + 7} z={z} text={completionPoem} typist />
          <PL_Gifts x={x - 9} y={y + 7} z={z + 1} typist />
        </>
      )}

      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={0}
        col={0}
        len={8}
        content="non-evil"
        fkey={FragmentKey.F171}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={0}
        col={1}
        len={9}
        content="paingiver"
        fkey={FragmentKey.F172}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={0}
        col={2}
        len={7}
        content="channel"
        fkey={FragmentKey.F174}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={0}
        col={3}
        len={10}
        content={`
lyre
   lyre
      lyre
`}
        offY={-1}
        fkey={FragmentKey.F176}
        gift
      />

      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={1}
        col={0}
        len={4}
        content="dawn"
        fkey={FragmentKey.F175}
        gift
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={1}
        col={1}
        len={11}
        offY={-1}
        content={`transparent

   dress`}
        fkey={FragmentKey.F177}
        gift
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={1}
        col={2}
        len={10}
        content="I might go"
        fkey={FragmentKey.F182}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={1}
        col={3}
        len={6}
        content="danger"
        fkey={FragmentKey.F184}
      />

      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={2}
        col={0}
        len={11}
        content="honeyvoiced"
        fkey={FragmentKey.F185}
        gift
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={2}
        col={1}
        len={10}
        content="mythweaver"
        fkey={FragmentKey.F188}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={2}
        col={2}
        len={4}
        content="soda"
        fkey={FragmentKey.F189}
      />
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={2}
        col={3}
        len={6}
        content="celery"
        fkey={FragmentKey.F191}
      />
    </>
  );
}

const completionPoem = `
she gifts me a shield
     on which I deny the cosmos
`;
