import { CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_WIDTH } from "../Utils/consts";
import { Position } from "../Utils/types";
import { clamp } from "../Utils/utils";

export const unit_wToS = (w: number) => w * PIXEL_WIDTH;
export const unit_sToW = (w: number) => w / PIXEL_WIDTH;

export class ViewportManager {
  private width: number = CANVAS_WIDTH;
  private height: number = CANVAS_HEIGHT;
  private container: HTMLDivElement;


  // setup
  public setContainer(container: HTMLDivElement): void {
    this.container = container;
  }

  // basic getters
  public getWidth(): number {
    return this.width;
  }
  public getHeight(): number {
    return this.height;
  }

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
    const maxScrollX_w = Math.ceil(
      this.width - 1 - unit_sToW(window.innerWidth)
    );
    const maxScrollY_w = Math.ceil(
      this.height - 1 - unit_sToW(window.innerHeight)
    );

    return { x: unit_wToS(maxScrollX_w), y: unit_wToS(maxScrollY_w) };
    // return { x: Infinity, y: Infinity };
  }

  // math
  public worldToScreen(pos: Position): Position {
    return {
      x: unit_wToS(pos.x) - this.scrollX(),
      y: unit_wToS(pos.y) - this.scrollY(),
    };
  }

  // scroll fns
  public scroll(x: number, y: number) {
    if (!this.container) return;
    const { x: maxX, y: maxY } = this.scrollMax();
    this.container.scroll(clamp(x, 0, maxX), clamp(y, 0, maxY));
  }

  public scrollWorld(x: number, y: number) {
    this.scroll(
      unit_wToS(x) - window.innerWidth / 2,
      unit_wToS(y) - window.innerHeight / 2
    );
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
    const marginX = 0.4,
      marginY = 0.4;
    const screen = this.worldToScreen(pos);
    let delX = 0,
      delY = 0;

    const mLeft = window.innerWidth * marginX;
    const mRight = window.innerWidth * (1 - marginX);
    if (screen.x < mLeft) {
      delX = -Math.ceil(unit_sToW(mLeft - screen.x));
    } else if (screen.x > mRight) {
      delX = Math.ceil(unit_sToW(screen.x - mRight));
    }

    const mTop = window.innerHeight * marginY;
    const mBottom = window.innerHeight * (1 - marginY);
    if (screen.y < mTop) {
      delY = -Math.ceil(unit_sToW(mTop - screen.y));
    } else if (screen.y > mBottom) {
      delY = Math.ceil(unit_sToW(screen.y - mBottom));
    }

    this.scrollDeltaWorld(delX, delY);
  }
}
