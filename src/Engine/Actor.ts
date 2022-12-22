import { GameManager } from "./GameManager";
import { Hitbox, Position } from "../Utils/types";

export type ActorProps = Position & {
  termV?: number;
  hitbox?: Hitbox;
};
export class ActorData {
  private gameManager: GameManager;

  private rx = 0;
  private ry = 0;

  private x;
  private y;

  private vx = 0;
  private vy = 0;

  private ax = 0;
  private ay = 0;

  private termV: number | undefined;
  private hitbox: Hitbox | undefined;

  // initializes with starting coordinates
  constructor(gameManager: GameManager, { x, y, hitbox, termV }: ActorProps) {
    this.gameManager = gameManager;
    this.x = x;
    this.y = y;

    this.hitbox = hitbox;
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
  public setVelocity({x: vx, y: vy}: Position) {
    this.vx = vx;
    this.vy = vy;
  }

  public hitboxAt({ x, y }: Position): Hitbox {
    return {
      x: this.x + x + this.hitbox.x,
      y: this.y + y + this.hitbox.y,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  private shouldCollide(): boolean {
    return !!this.hitbox;
  }

  // move / collision logic
  private checkSolids(delPos: Position): boolean {
    const cM = this.gameManager.collisionManager;
    const box = this.hitboxAt(delPos);
    const solid = cM.collides(box, this);
    // onCollide...
    return !!solid;
  }

  public move(move60: Position) {
    const { x: dx60, y: dy60 } = move60;
    // move X
    this.rx += dx60 / 60;
    const moveX = Math.round(this.rx);

    if (moveX !== 0) {
      this.rx -= moveX;

      if (!this.shouldCollide()) {
        this.x += moveX;
      } else {
        const sgn = Math.sign(moveX);

        for (let i = 0; i < Math.abs(moveX); i++) {
          if (this.checkSolids({ x: sgn, y: 0 })) break;
          this.x += sgn;
        }
      }
    }

    // move Y
    this.ry += dy60 / 60;
    const moveY = Math.round(this.ry);

    if (moveY !== 0) {
      this.ry -= moveY;

      if (!this.shouldCollide()) {
        this.y += moveY;
      } else {
        const sgn = Math.sign(moveY);

        for (let i = 0; i < Math.abs(moveY); i++) {
          if (this.checkSolids({ x: 0, y: sgn })) break;
          this.y += sgn;
        }
      }
    }
  }

  // handlers and callbacks
  // output: did position update?
  public onFrame(dampen = false): boolean {
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

    const oldX = this.x;
    const oldY = this.y;

    this.move({ x: this.vx, y: this.vy });

    return oldX !== this.x || oldY !== this.y;
  }
}
