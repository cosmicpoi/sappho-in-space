import autoBind from "auto-bind";
import { DEBUG_NOSAVE } from "../Utils/debug";
import { monomitter, Monomitter } from "../Utils/Monomitter";

export enum FragmentKey {
  // completion
  F1 = "1",

  // puzzles
  F20 = "20",
  F26 = "26",
  F169A = "169A",
  F132 = "132",
  F112 = "112",
  F83 = "83",

  // gifts
  F171 = "171",
  F172 = "172",
  F174 = "174",
  F175 = "175",
  F176 = "176",
  F177 = "177",
  F182 = "182",
  F184 = "184",
  F185 = "185",
  F188 = "188",
  F191 = "191",
  F189 = "189",

  // others
  F2 = "2",
  F3 = "3",
  F4 = "4",
  F5 = "5",
  F6 = "6",
  F7 = "7",
  F8 = "8",
  F9 = "9",

  F12 = "12",
  F15A = "15A",
  F15B = "15B",
  F16 = "16",
  F17 = "17",
  F18 = "18",
  F19 = "19",

  F21 = "21",
  F22 = "22",
  F23 = "23",
  F24A = "24A",
  F24C = "24C",
  F24D = "24D",
  F25 = "25",
  F27 = "27",
  F29A = "29A",
  F29B = "29B",
  F29C = "29C",
  F29H = "29H",
}

export enum FragmentStatus {
  Normal,
  Unsolved,
  Solved,
}

const puzzleList: FragmentKey[] = [
  FragmentKey.F132,
  FragmentKey.F20,
  FragmentKey.F26,
  FragmentKey.F169A,
  FragmentKey.F112,
  FragmentKey.F83,
];

export function parToPuzzleFrag(parNo: number): FragmentKey {
  if (parNo < 1 || parNo > 6) console.error("invalid paragraph number");
  return [
    FragmentKey.F132,
    FragmentKey.F20,
    FragmentKey.F83,
    FragmentKey.F26,
    FragmentKey.F169A,
    FragmentKey.F112,
  ][parNo - 1];
}

export const VERSION = "1";
export const storageKey = () => "data" + VERSION;

export const isPuzzle = (fkey: FragmentKey): boolean =>
  puzzleList.includes(fkey);

export class DataManager {
  private puzzlesSolved: Record<FragmentKey, boolean>;
  dataUpdated$: Monomitter<void>;

  constructor() {
    autoBind(this);
    this.loadPuzzlesSolved();
    this.dataUpdated$ = monomitter();
  }

  private loadPuzzlesSolved() {
    const item = localStorage.getItem(storageKey());
    if (item === null || DEBUG_NOSAVE) {
      this.puzzlesSolved = {} as Record<FragmentKey, boolean>;

      for (const key of puzzleList) {
        this.puzzlesSolved[key] = false;
      }
    } else this.puzzlesSolved = JSON.parse(item);
  }
  private saveData() {
    localStorage.setItem(storageKey(), JSON.stringify(this.puzzlesSolved));
  }

  public getFragmentStatus(k: FragmentKey): FragmentStatus {
    if (!isPuzzle(k)) return FragmentStatus.Normal;

    return this.puzzlesSolved[k]
      ? FragmentStatus.Solved
      : FragmentStatus.Unsolved;
  }

  public solvePuzzle(k: FragmentKey): void {
    if (!isPuzzle(k)) console.error("not a puzzle!");

    this.puzzlesSolved[k] = true;
    this.dataUpdated$.publish();

    this.saveData();
  }
}
