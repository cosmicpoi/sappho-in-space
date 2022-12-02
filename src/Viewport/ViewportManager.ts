import autoBind from "auto-bind";
import { Environment } from "../Utils/colors";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_WIDTH } from "../Utils/consts";
import { monomitter, Monomitter } from "../Utils/Monomitter";
import { Position } from "../Utils/types";
import { clamp } from "../Utils/utils";

export const unit_wToS = (w: number) => w * PIXEL_WIDTH;
export const unit_sToW = (w: number) => w / PIXEL_WIDTH;

const ellipseWidth = Math.floor(0.5 * 0.7 * CANVAS_WIDTH);
const ellipseHeight = Math.floor(0.5 * 0.4 * CANVAS_HEIGHT);

export class ViewportManager {
  private width: number = CANVAS_WIDTH;
  private height: number = CANVAS_HEIGHT;
  private container: HTMLDivElement;

  public colorChange$: Monomitter<Environment>;

  public environment = Environment.DEFAULT;

  // constructor and setup
  constructor() {
    autoBind(this);
    this.colorChange$ = monomitter<Environment>(true);
    this.colorChange$.publish(Environment.DEFAULT);

    // setInterval(() => {
    //   console.log("Publish");
    //   if (this.environment <= Environment.Autumn)
    //     this.colorChange$.publish(this.environment++);
    // }, 10000);
  }

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
  public requestColor(pos: Position) {
    let env = -1;
    const { x: cx, y: cy } = this.getCenter();

    const delX = pos.x - cx;
    const delY = pos.y - cy;
    if ((delX / ellipseWidth) ** 2 + (delY / ellipseHeight) ** 2 < 1) {
      if (delX < 25) env = Environment.Night;
      else env = Environment.Day;
    } else {
      if (pos.x < cx && pos.y < cy) env = Environment.Winter;
      else if (pos.x > cx && pos.y < cy) env = Environment.Spring;
      else if (pos.x > cx && pos.y > cy) env = Environment.Summer;
      else if (pos.x < cx && pos.y > cy) env = Environment.Autumn;
    }

    if (env !== this.environment) {
      console.log("new environment ");
      this.environment = env;
      this.colorChange$.publish(this.environment);
    }
  }
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
