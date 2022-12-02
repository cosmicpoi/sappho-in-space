import autoBind from "auto-bind";
import { monomitter, Monomitter } from "../Utils/Monomitter";
import { Position } from "../Utils/types";
import { getPositionKey } from "../Utils/utils";

type SetHidden = (b: boolean) => void;
type PixelZData = {
  z: number;
  setHidden: SetHidden;
  isWall: boolean;
  char: string | undefined;
};

type PixelsAtPos = Set<PixelZData>;

export class CharPixelGridManager {
  pixelMap: Map<string, PixelsAtPos | undefined>;
  pixelUpdated$: Map<string, Monomitter<void>>;

  constructor() {
    autoBind(this);
    this.pixelMap = new Map();
    this.pixelUpdated$ = new Map();
  }

  private requestPixelUpdated(key: string) {
    if (!this.pixelUpdated$.has(key))
      this.pixelUpdated$.set(key, monomitter<void>());
  }

  // display the tallest non-undefined character
  private renderPixel(posKey: string) {
    if (!this.pixelMap.has(posKey)) console.error("set doesn't exist!");

    const fragments = this.pixelMap.get(posKey);

    let max = -Infinity;
    let data: PixelZData | undefined;
    fragments.forEach((zData) => {
      if (zData.z > max && zData.char !== undefined) {
        max = zData.z;
        data = zData;
      }
    });

    if (data !== undefined) data.setHidden(false);
    fragments.forEach((zData) => {
      if (zData !== data) zData.setHidden(true);
    });
  }

  // when a pixel updates its position:
  // - update the pixel it just left
  // - update the pixel it just entered
  //    - if z is >= the max height at that position,
  //      it boots off the last pixel at that position

  // registers a pixel at a particular position in the map
  // returns a callback that unregisters it from the map
  public registerPixel(pos: Position, zData: PixelZData): () => void {
    const key = getPositionKey(pos);
    if (!this.pixelMap.has(key)) this.pixelMap.set(key, new Set());
    const posData = this.pixelMap.get(key);

    posData.add(zData);

    this.renderPixel(key);
    this.requestPixelUpdated(key);
    this.pixelUpdated$.get(key)?.publish();

    return () => {
      posData.delete(zData);
      this.renderPixel(key);
    };
  }

  public onPixelUpdate({ x, y }: Position, cb: () => void) {
    const key = getPositionKey({ x, y });
    this.requestPixelUpdated(key);

    return this.pixelUpdated$.get(key).subscribe(cb);
  }

  // has more than one entry
  public isOccupied(pos: Position) {
    const key = getPositionKey(pos);
    let notWalls = 0;
    this.pixelMap.get(key)?.forEach((data) => {
      if (!data.isWall) notWalls++;
    });

    return notWalls > 1;

    // if (!this.pixelMap.has(key)) return true;
    // return this.pixelMap.get(key).size == 0;
  }
}
