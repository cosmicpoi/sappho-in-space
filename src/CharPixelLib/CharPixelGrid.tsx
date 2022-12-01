import autoBind from "auto-bind";
import * as React from "react";
import { getPositionKey, Position } from "../Utils/Position";

type SetHidden = (b: boolean) => void;
type PixelZData = {
  z: number;
  setHidden: SetHidden;
};

type PixelsAtPos = Set<PixelZData>;

export class CharPixelGridManager {
  pixelMap: Map<string, PixelsAtPos | undefined>;

  constructor() {
    autoBind(this);
    this.pixelMap = new Map();
  }

  private renderPixel(posKey: string) {
    if (!this.pixelMap.has(posKey)) console.error("set doesn't exist!");

    const fragments = this.pixelMap.get(posKey);

    var max: number = -Infinity;
    var data: PixelZData | undefined;
    fragments.forEach((zData) => {
      if (zData.z > max) {
        max = zData.z;
        data = zData;
      }
    });

    if (data != undefined) data.setHidden(false);
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
  public registerPixel(
    pos: Position,
    z: number,
    setHidden: SetHidden
  ): () => void {
    const key = getPositionKey(pos);

    if (!this.pixelMap.has(key)) this.pixelMap.set(key, new Set());
    const posData = this.pixelMap.get(key);

    const myData: PixelZData = { z, setHidden };
    posData.add(myData);

    this.renderPixel(key);

    return () => {
      posData.delete(myData);
      this.renderPixel(key);
    };
  }

  // has more than one entry
  public isOccupied(pos: Position) {
    const key = getPositionKey(pos);
    return this.pixelMap.get(key)?.size > 1;

    // if (!this.pixelMap.has(key)) return true;
    // return this.pixelMap.get(key).size == 0;
  }
}
