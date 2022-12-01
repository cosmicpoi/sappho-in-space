import autoBind from "auto-bind";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_WIDTH } from "../Utils/consts";
import { Position } from "../Utils/Position";
import { clamp } from "../Utils/utils";

export const unit_wToS = (w: number) => w * PIXEL_WIDTH;
export const unit_sToW = (w: number) => w / PIXEL_WIDTH;

export class ViewportManager {
  private width: number = CANVAS_WIDTH;
  private height: number = CANVAS_HEIGHT;

  private container: HTMLDivElement;

  // constructor and setup
  constructor() {
    autoBind(this);
  }

  public setContainer(container: HTMLDivElement): void {
    this.container = container;
  }


  // basic getters
  public getWidth(): number { return this.width; }
  public getHeight(): number { return this.height; }

  public getCenter(): Position {
    return { x: this.width / 2, y: this.height / 2 };
  }

  private scrollX(): number {
    return this.container ? this.container.scrollLeft : 0;
  }
  private scrollY(): number {
    return this.container ? this.container.scrollTop : 0;
  }

  private scrollMax(): Position {
    const maxScrollX_w = Math.ceil(this.width - unit_sToW(window.innerWidth));
    const maxScrollY_w = Math.ceil(this.height - unit_sToW(window.innerHeight));


    return { x: unit_wToS(maxScrollX_w), y: unit_wToS(maxScrollY_w) }
    // return { x: Infinity, y: Infinity };
  }

  // math
  public worldToScreen(pos: Position): Position {
    return {
      x: unit_wToS(pos.x) - this.scrollX(),
      y: unit_wToS(pos.y) - this.scrollY(),
    }
  }

  // scroll fns
  public scroll(x: number, y: number) {
    if (!this.container) return;
    const { x: maxX, y: maxY } = this.scrollMax();
    this.container.scroll(clamp(x, 0, maxX), clamp(y, 0, maxY));
  }

  public scrollToCenter() {
    const { x, y } = this.getCenter();

    this.scroll(
      unit_wToS(x) - window.innerWidth / 2,
      unit_wToS(y) - window.innerHeight / 2
    );
  }
  public scrollDeltaWorld(x: number, y: number) {
    this.scroll(this.scrollX() + unit_wToS(x), this.scrollY() + unit_wToS(y));
  }

  // follow logic (for following spaceship)
  public follow(pos: Position) {
    const marginX = 0.4, marginY = 0.4;
    const screen = this.worldToScreen(pos);
    var delX = 0, delY = 0;

    if (screen.x < window.innerWidth * marginX) {
      delX = -1;
    } else if (screen.x > window.innerWidth * (1 - marginX)) {
      delX = 1;
    }
    if (screen.y < window.innerHeight * marginY) {
      delY = -1;
    } else if (screen.y > window.innerHeight * (1 - marginY)) {
      delY = 1;
    }

    this.scrollDeltaWorld(delX, delY);
  }
}