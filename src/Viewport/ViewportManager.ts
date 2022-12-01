import autoBind from "auto-bind";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_WIDTH } from "../Utils/consts";
import { Position } from "../Utils/Position";

export const wToS = (w: number) => w * PIXEL_WIDTH;

export class ViewportManager {
  private width: number = CANVAS_WIDTH;
  private height: number = CANVAS_HEIGHT;

  constructor() {
    autoBind(this);
  }


  public getWidth(): number { return this.width; }
  public getHeight(): number { return this.height; }

  public getCenter(): Position {
    return { x: this.width / 2, y: this.height / 2 };
  }
}