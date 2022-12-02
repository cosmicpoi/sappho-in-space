import { Position } from "./Position";

export type ObjectMotionProps = Position & {
  collides?: boolean;
  termV?: number;
};
export class ObjectMotion {
  private rx = 0;
  private ry = 0;

  private x;
  private y;

  private vx = 0;
  private vy = 0;

  private ax = 0;
  private ay = 0;

  private termV: number | undefined;

  private collides;

  // initializes with starting coordinates
  constructor({ x, y, collides, termV }: ObjectMotionProps) {
    this.x = x;
    this.y = y;

    this.collides = collides === true;
    this.termV = termV;
  }

  // basic getters and setters
  public setAcceleration({ x: ax, y: ay }: Position): void {
    this.ay = ay;
    this.ax = ax;
  }

  public getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  // move / collision logic
  private checkSolids(): void {
    return;
  }

  public move(move60: Position) {
    const { x: dx60, y: dy60 } = move60;
    // move X
    this.rx += dx60 / 60;
    const moveX = Math.round(this.rx);

    if (moveX !== 0) {
      this.rx -= moveX;

      if (!this.collides) {
        this.x += moveX;
      } else {
        const sgn = Math.sign(moveX);

        for (let i = 0; i < Math.abs(moveX); i++) {
          this.x += sgn;
          this.checkSolids();
        }
      }
    }

    // move Y
    this.ry += dy60 / 60;
    const moveY = Math.round(this.ry);

    if (moveY !== 0) {
      this.ry -= moveY;

      if (!this.collides) {
        this.y += moveY;
      } else {
        const sgn = Math.sign(moveY);

        for (let i = 0; i < Math.abs(moveY); i++) {
          this.y += sgn;
          this.checkSolids();
        }
      }
    }
  }

  // handlers and callbacks
  public onFrame(dampen = false) {
    // dampen, then accelerate, then normalize
    if (dampen) {
      this.vy *= 0.98;
      this.vx *= 0.98;
    }

    this.vx += this.ax;
    this.vy += this.ay;

    if (this.termV !== undefined) {
      const tv = this.termV;

      const norm = Math.sqrt(this.vx ** 2 + this.vy ** 2);
      if (norm > tv) {
        this.vx *= tv / norm;
        this.vy *= tv / norm;
      }
    }
    this.move({ x: this.vx, y: this.vy });
  }
}
