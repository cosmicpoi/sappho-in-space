import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameManager } from "../..";
import { CharPixel } from "../../CharPixelLib/CharPixel";
import { FragmentKey, FragmentStatus } from "../../Data/FragmentData";
import { ActorData } from "../../Engine/Actor";
import { TriggerData } from "../../Engine/CollisionManager";
import {
  usePuzzleStatus,
  useSpaceshipPos,
  useTrigger,
} from "../../Utils/Hooks";
import {
  CollisionGroup,
  Position,
  Position3DR,
  TextAlign,
} from "../../Utils/types";
import { toN } from "../../Utils/utils";
import { crazyColorData, giftColorData } from "../FloatingBG";
import { Fragment169A } from "../Fragments/FragmentComponents/Fragment160to169";
import { FragmentLabel, PL_Gifts } from "../Labels";
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

const spaces = " ".repeat(giftW - 4);

enum GiftState {
  Neutral,
  Nearby,
  Overlapping,
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
  addGift,
  selection,
  select,
  deselect,
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
  selection: string[];
  addGift: (row: number, col: number) => void;
  select: (row: number, col: number) => void;
  deselect: (row: number, col: number) => void;
}) {
  // basic setup
  const x = cx - totalW / 2 + col * (giftW + giftM);
  const y = yTop + row * (giftH + giftM);

  useEffect(() => {
    if (gift) addGift(row, col);
  }, [gift, addGift, row, col]);

  // basic state management
  const [state, setState] = useState<GiftState>(GiftState.Neutral);
  const isSelected = useMemo(
    () => selection.includes(getKey(row, col)),
    [selection, row, col]
  );

  const contentChar: string | undefined = useMemo(() => {
    if (isSelected) return "~";
    if (state === GiftState.Neutral) return "%";
    else if (state === GiftState.Nearby) return "+";
    else if (state === GiftState.Overlapping) return ".";
    return undefined;
  }, [state, isSelected]);
  const contentOpacity: number = useMemo(() => {
    if (isSelected) return 0.5;

    if (state === GiftState.Overlapping) return 0.5;
    else return 1;
  }, [state, isSelected]);

  const showGift: boolean = state === GiftState.Overlapping || isSelected;

  // manage positions
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

  // collisions
  const [interactable, setInteractable] = useState<boolean>(true);
  const onHit = useCallback(
    (actor: ActorData) => {
      if (!interactable) return;
      if (actor.collisionGroup === CollisionGroup.HeartParticle) {
        if (!isSelected) select(row, col);
        else deselect(row, col);

        setInteractable(false);
        setTimeout(() => setInteractable(true), 3000);
      }
    },
    [select, row, col, deselect, isSelected, interactable]
  );

  const hitbox: TriggerData = useMemo(
    () => ({
      x,
      y,
      width: giftW,
      height: giftH,
      callback: onHit,
    }),
    [x, y, onHit]
  );
  useTrigger(hitbox);

  return (
    <>
      <DebugBox hitbox={hitbox} />
      {/* Contents */}
      {toN(Math.ceil((giftH - 2) / 2)).map((i) => (
        <React.Fragment key={i}>
          {toN(Math.ceil((giftW - 2) / 2)).map((j) => (
            <CharPixel
              key={j}
              x={x + 1 + j * 2}
              y={y + 1 + i * 2}
              z={z}
              // all this janky expression says is "skip every other when isSelected"
              char={
                isSelected
                  ? j % 2 === 0
                    ? contentChar
                    : undefined
                  : contentChar
              }
              opacity={contentOpacity}
            />
          ))}
        </React.Fragment>
      ))}
      {/* Gift */}
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

const getKey = (row: number, col: number) => `${row}-${col}`;

const totalGifts = 4;

export function Fragment169APuzzle({ x, y, z }: Position3DR) {
  const [status, solve] = usePuzzleStatus(FragmentKey.F26);
  const solved = status === FragmentStatus.Solved;

  const cx = x + 2;
  const yT = y + 15;

  // selection management
  const [gifts, setGifts] = useState<string[]>([]);
  const addGift = useCallback((row: number, col: number) => {
    setGifts((a) => {
      const key = getKey(row, col);
      const arr = [...a];
      if (!arr.includes(key)) arr.push(key);
      return arr;
    });
  }, []);

  const [mySelection, setSelection] = useState<string[]>([]);
  const select = useCallback((row: number, col: number) => {
    setSelection((a) => {
      const key = getKey(row, col);
      // if it's already selected, do nothing
      if (a.includes(key)) return a;

      // otherwise, add and trim
      const arr = [...a];
      arr.push(key);
      if (arr.length > totalGifts) arr.shift();
      return arr;
    });
  }, []);
  const deselect = useCallback((row: number, col: number) => {
    setSelection((a) => {
      const key = getKey(row, col);
      if (!a.includes(key)) return a;
      const arr = [...a];
      return arr.filter((el) => el !== key);
    });
  }, []);

  const selection = useMemo(
    () => (solved ? gifts : mySelection),
    [solved, gifts, mySelection]
  );

  const giftsSelected: number = useMemo(
    () => selection.filter((el) => gifts.includes(el)).length,
    [gifts, selection]
  );

  useEffect(() => {
    if (giftsSelected === totalGifts) solve();
  }, [giftsSelected, solve]);

  // colors
  const { colorManager: cM } = useGameManager();
  useEffect(() => {
    if (!solved) return;

    return cM.registerZone({
      x: x - 9,
      y: y + 7,
      radius: 10,
      data: giftColorData,
    });
  }, [cM, solved, x, y]);

  // caching
  const Gift = useCallback(
    ({
      row,
      col,
      content,
      fkey,
      len,
      offY,
      gift,
      selection,
    }: {
      row: number;
      col: number;
      content: string;
      fkey: FragmentKey;
      len: number;
      offY?: number;
      gift?: boolean;
      selection: string[];
    }) => (
      <Puzzle169AGift
        cx={cx}
        yTop={yT}
        z={z}
        row={row}
        col={col}
        len={len}
        offY={offY}
        gift={gift}
        content={content}
        fkey={fkey}
        selection={selection}
        select={select}
        deselect={deselect}
        addGift={addGift}
      />
    ),
    [cx, yT, z, select, addGift, deselect]
  );

  return (
    <>
      <FragmentLabel fkey={FragmentKey.F169A} x={x} y={y - 4} z={z} decor />
      <Fragment169A x={x - 4} y={y} z={z} />

      <CharPixel x={cx - 1} y={y + 3} char={"" + giftsSelected} />
      <CharPixel x={cx} y={y + 3} char="/" opacity={0.5} />
      <CharPixel x={cx + 1} y={y + 3} char={"" + totalGifts} />

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

      {/* Row 1  */}
      <Gift
        row={0}
        col={0}
        len={8}
        content="non-evil"
        fkey={FragmentKey.F171}
        selection={selection}
      />
      <Gift
        row={0}
        col={1}
        len={9}
        content="paingiver"
        fkey={FragmentKey.F172}
        selection={selection}
      />
      <Gift
        row={0}
        col={2}
        len={7}
        content="channel"
        fkey={FragmentKey.F174}
        selection={selection}
      />
      <Gift
        row={0}
        col={3}
        len={10}
        selection={selection}
        content={`
lyre
   lyre
      lyre
`}
        offY={-1}
        fkey={FragmentKey.F176}
        gift
      />

      {/* Row 2 */}
      <Gift
        row={1}
        col={0}
        len={4}
        content="dawn"
        fkey={FragmentKey.F175}
        selection={selection}
        gift
      />
      <Gift
        row={1}
        col={1}
        len={11}
        offY={-1}
        content={`transparent

   dress`}
        fkey={FragmentKey.F177}
        selection={selection}
        gift
      />
      <Gift
        row={1}
        col={2}
        len={10}
        selection={selection}
        content="I might go"
        fkey={FragmentKey.F182}
      />
      <Gift
        row={1}
        col={3}
        len={6}
        content="danger"
        fkey={FragmentKey.F184}
        selection={selection}
      />

      {/* Row 3  */}
      <Gift
        row={2}
        col={0}
        len={11}
        selection={selection}
        content="honeyvoiced"
        fkey={FragmentKey.F185}
        gift
      />
      <Gift
        row={2}
        col={1}
        len={10}
        selection={selection}
        content="mythweaver"
        fkey={FragmentKey.F188}
      />
      <Gift
        row={2}
        col={2}
        len={4}
        content="soda"
        fkey={FragmentKey.F189}
        selection={selection}
      />
      <Gift
        row={2}
        col={3}
        len={6}
        content="celery"
        fkey={FragmentKey.F191}
        selection={selection}
      />
    </>
  );
}

const completionPoem = `
she gifts me a shield
     on which I deny the cosmos
`;
