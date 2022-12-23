import autoBind from "auto-bind";
import { monomitter, Monomitter } from "../Utils/Monomitter";

export enum FragmentKey {
  F1 = "1",
  F2 = "2",
  F20 = "20",
  F26 = "26",
  F169A = "169A",
  F112 = "112",
  F83 = "83",
}

export enum FragmentStatus {
  Normal,
  Unsolved,
  Solved,
}

const puzzleList: FragmentKey[] = [
  FragmentKey.F2,
  FragmentKey.F20,
  FragmentKey.F26,
  FragmentKey.F169A,
  FragmentKey.F112,
  FragmentKey.F83,
];

export function parToPuzzleFrag(parNo: number): FragmentKey {
  if (parNo < 1 || parNo > 6) console.error("invalid paragraph number");
  return [
    FragmentKey.F2,
    FragmentKey.F20,
    FragmentKey.F83,
    FragmentKey.F26,
    FragmentKey.F169A,
    FragmentKey.F112,
  ][parNo - 1];
}

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
    this.puzzlesSolved = {} as Record<FragmentKey, boolean>;

    for (const key of puzzleList) {
      this.puzzlesSolved[key] = false;
    }
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
  }
}
