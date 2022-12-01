import autoBind from "auto-bind";
import { monomitter, Monomitter, Subscription } from "../Utils/Monomitter";

type KeyMap = Map<string, Monomitter<void>>;
export class InputManager {
  private keysDown$: KeyMap;

  private keyIsDown: Map<string, boolean>;

  constructor() {
    autoBind(this);
    this.keysDown$ = new Map();
    this.keyIsDown = new Map();
  }

  // map request utils
  private requestEmitter(map: KeyMap, key: string): void {
    if (!map.has(key)) map.set(key, monomitter<void>());
  }

  // public API
  public bindKeyDown(key: string, cb: () => void): Subscription {
    this.requestEmitter(this.keysDown$, key);
    return this.keysDown$.get(key).subscribe(cb);
  }

  public isKeyDown(key: string): boolean {
    return this.keyIsDown?.get(key) === true;
  }

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



  public bindListeners(): () => void {
    const onKeyDown = (e: KeyboardEvent) => {
      this.requestEmitter(this.keysDown$, e.key);
      this.keysDown$.get(e.key).publish();

      this.keyIsDown.set(e.key, true);
    }

    const onKeyUp = (e: KeyboardEvent) => {
      this.keyIsDown.set(e.key, false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }
}

export enum KEYS {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}