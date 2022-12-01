import autoBind from "auto-bind";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIXEL_WIDTH } from "../Utils/consts";
import { Position } from "../Utils/Position";

export const wToS = (w: number) => w * PIXEL_WIDTH;

export class ViewportManager {
  private width: number = CANVAS_WIDTH;
  private height: number = CANVAS_HEIGHT;

  private container: HTMLDivElement;

  constructor() {
    autoBind(this);
  }

  public setContainer(container: HTMLDivElement): void {
    this.container = container;
  }

  public scrollToCenter() {
    const { x, y } = this.getCenter();

    this.container.scroll(
      wToS(x) - window.innerWidth / 2,
      wToS(y) - window.innerHeight / 2
    );
  }
  public scrollDelta({ x, y }: Position) {
    this.container.scroll(this.container.scrollLeft + x, this.container.scrollTop + y)
  }


  public getWidth(): number { return this.width; }
  public getHeight(): number { return this.height; }

  public getCenter(): Position {
    return { x: this.width / 2, y: this.height / 2 };
  }

  public follow(pos: Position) {
    // if ()
  }
}