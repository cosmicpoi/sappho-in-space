import { FragmentKey } from "../../../Data/FragmentData";
import { FragmentN } from "../Fragments";
import {
  fragment1text,
  fragment2text,
  fragment3text,
  fragment4text,
  fragment5text,
  fragment6text,
  fragment7text,
  fragment8text,
  fragment9text,
} from "../FragmentText/FragmentText1to9";

export const Fragment1 = FragmentN(FragmentKey.F1, fragment1text);
export const Fragment2 = FragmentN(FragmentKey.F2, fragment2text);
export const Fragment3 = FragmentN(FragmentKey.F3, fragment3text, 3);
export const Fragment4 = FragmentN(FragmentKey.F4, fragment4text, 3);
export const Fragment5 = FragmentN(FragmentKey.F5, fragment5text);
export const Fragment6 = FragmentN(FragmentKey.F6, fragment6text);
export const Fragment7 = FragmentN(FragmentKey.F7, fragment7text);
export const Fragment8 = FragmentN(FragmentKey.F8, fragment8text, 4);
export const Fragment9 = FragmentN(FragmentKey.F9, fragment9text);
