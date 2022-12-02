import autoBind from "auto-bind";
import { monomitter, Monomitter, Subscription } from "../Utils/Monomitter";
import { Direction } from "../Utils/utils";

type KeyMap = Map<string, Monomitter<string>>;
export class InputManager {
  private keysDown$: KeyMap;
  private keysUp$: KeyMap;

  private keyIsDown: Map<string, boolean>;

  constructor() {
    autoBind(this);
    this.keysDown$ = new Map();
    this.keysUp$ = new Map();
    this.keyIsDown = new Map();
  }

  // map request utils
  private requestEmitter(map: KeyMap, key: string): void {
    if (!map.has(key)) map.set(key, monomitter<string>());
  }

  // public API
  public bindKeyDown(key: string, cb: (k: string) => void): Subscription {
    this.requestEmitter(this.keysDown$, key);
    return this.keysDown$.get(key).subscribe(cb);
  }
  public bindKeyUp(key: string, cb: (k: string) => void): Subscription {
    this.requestEmitter(this.keysUp$, key);
    return this.keysUp$.get(key).subscribe(cb);
  }

  public isKeyDown(key: string): boolean {
    return this.keyIsDown?.get(key) === true;
  }

  public bindListeners(): () => void {
    const onKeyDown = (e: KeyboardEvent) => {
      this.keyIsDown.set(e.key, true);

      this.requestEmitter(this.keysDown$, e.key);
      this.keysDown$.get(e.key).publish(e.key);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      this.keyIsDown.set(e.key, false);

      this.requestEmitter(this.keysUp$, e.key);
      this.keysUp$.get(e.key).publish(e.key);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }

  // direction utils
  public resolveVertDirection(): number {
    const downHeld = this.isKeyDown(KEYS.Down);
    const upHeld = this.isKeyDown(KEYS.Up);

    return (downHeld ? 1 : 0) + (upHeld ? -1 : 0);
  }
  public resolveHozDirection(): number {
    const leftHeld = this.isKeyDown(KEYS.Left);
    const rightHeld = this.isKeyDown(KEYS.Right);

    return (rightHeld ? 1 : 0) + (leftHeld ? -1 : 0);
  }
  public getSingleDirection(): Direction | undefined {
    // if a single direction is pressed, return it, otherwise return undefined
    const hoz = this.resolveHozDirection();
    const vert = this.resolveVertDirection();

    if (Math.abs(hoz) + Math.abs(vert) !== 1) return undefined;

    if (hoz === 1) return Direction.Right;
    else if (hoz === -1) return Direction.Left;
    else if (vert === 1) return Direction.Down;
    else if (vert === -1) return Direction.Up;
  }
}

export enum KEYS {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}
