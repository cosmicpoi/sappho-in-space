import { GameManager } from "./GameManager";
import { CollisionGroup, Hitbox, Position } from "../Utils/types";
import { SolidData } from "./CollisionManager";

export type ActorProps = {
  termV?: number;
  hitbox?: Hitbox;
  solidCollision?: boolean;
  collisionGroup?: CollisionGroup;
  onSolidCollide?: () => void;
};
export class ActorData {
  private gameManager: GameManager;

  // movement variables
  private rx = 0;
  private ry = 0;

  private x;
  private y;

  private vx = 0;
  private vy = 0;

  private ax = 0;
  private ay = 0;

  // props
  private termV: number | undefined;
  private hitbox: Hitbox | undefined;
  public collisionGroup: CollisionGroup | undefined;
  private solidCollision: boolean;

  // collision
  private onSolidCollide: () => void = () => {};

  // initializes with starting coordinates
  constructor(
    gameManager: GameManager,
    { x, y }: Position,
    props?: ActorProps
  ) {
    this.gameManager = gameManager;
    this.x = x;
    this.y = y;

    if (props) {
      const { hitbox, termV, solidCollision, collisionGroup, onSolidCollide } =
        props;
      this.hitbox = hitbox;
      this.termV = termV;
      this.collisionGroup = collisionGroup;
      this.solidCollision = !!solidCollision;

      if (onSolidCollide) this.onSolidCollide = onSolidCollide;

      if (this.hitbox) this.checkTriggers({ x: 0, y: 0 });
    }
  }

  // basic getters and setters
  public setAcceleration({ x: ax, y: ay }: Position): void {
    this.ay = ay;
    this.ax = ax;
  }

  public setPosition({ x, y }: Position) {
    this.x = x;
    this.y = y;
  }

  public getPosition(): Position {
    return { x: this.x, y: this.y };
  }
  public setVelocity({ x: vx, y: vy }: Position) {
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
    return !!this.solidCollision;
  }

  // move / collision logic
  private checkSolids(delPos: Position): SolidData {
    const cM = this.gameManager.collisionManager;
    const box = this.hitboxAt(delPos);
    const solid = cM.collidesSolid(box);
    return solid;
  }
  private checkTriggers(delPos: Position): boolean {
    const cM = this.gameManager.collisionManager;
    const box = this.hitboxAt(delPos);
    const trigger = cM.collidesTrigger(box, this);
    return !!trigger;
  }

  public move(move: Position) {
    const { x: dx, y: dy } = move;
    // move X
    this.rx += dx;
    const moveX = Math.round(this.rx);

    if (moveX !== 0) {
      this.rx -= moveX;

      if (!this.shouldCollide()) {
        this.x += moveX;
      } else {
        const sgn = Math.sign(moveX);

        for (let i = 0; i < Math.abs(moveX); i++) {
          const solid = this.checkSolids({ x: sgn, y: 0 });
          if (solid) {
            if (solid.callback) solid.callback(this);
            this.onSolidCollide();
            break;
          }
          this.x += sgn;
        }
      }
    }

    // move Y
    this.ry += dy;
    const moveY = Math.round(this.ry);

    if (moveY !== 0) {
      this.ry -= moveY;

      if (!this.shouldCollide()) {
        this.y += moveY;
      } else {
        const sgn = Math.sign(moveY);

        for (let i = 0; i < Math.abs(moveY); i++) {
          const solid = this.checkSolids({ x: 0, y: sgn });
          if (solid) {
            if (solid.callback) solid.callback(this);
            this.onSolidCollide();
            break;
          }
          this.y += sgn;
        }
      }
    }

    // finally, check for collisions
    if (this.hitbox) this.checkTriggers({ x: 0, y: 0 });
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
