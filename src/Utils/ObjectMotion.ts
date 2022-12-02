import { Position } from "./Position";
import { clamp } from "./utils";

export class ObjectMotion {
  private rx = 0;
  private ry = 0;

  private x;
  private y;

  private vx = 0;
  private vy = 0;
  private ax = 0;
  private ay = 0;

  private termV = 2 / 60; // 2 units per second

  private collides;

  // initializes with starting coordinates
  constructor(x: number, y: number, collides = false) {
    this.x = x;
    this.y = y;

    this.collides = collides;
  }

  // basic getters and setters
  public setAcceleration(ax: number, ay: number): void {
    this.ay = ay;
    this.ax = ax;
  }

  // move / collision logic
  private checkSolids(): void {

  }

  public move(dx: number, dy: number) {
    // move X
    this.rx += dx;
    var moveX = Math.round(this.rx);

    if (moveX != 0) {
      this.rx -= moveX;

      if (!this.collides) {
        this.x += moveX;
      } else {
        var sgn = Math.sign(moveX);

        for (var i = 0; i < Math.abs(moveX); i++) {
          this.x += sgn;
          this.checkSolids();
        }
      }
    }

    // move Y
    this.ry += dy;
    var moveY = Math.round(this.ry);

    if (moveX != 0) {
      this.ry -= moveY;

      if (!this.collides) {
        this.y += moveY;
      } else {
        var sgn = Math.sign(moveY);

        for (var i = 0; i < Math.abs(moveY); i++) {
          this.y += sgn;
          this.checkSolids();
        }
      }
    }
  }

  // handlers and callbacks
  public onFrame(): Position {
    this.vx += this.ax;
    this.vy += this.ay;

    const tv = this.termV;

    this.vx = clamp(this.vx, -tv, tv);
    this.vy = clamp(this.vy, -tv, tv);

    this.move(this.vx, this.vy);

    return { x: this.x, y: this.y };
  }
}