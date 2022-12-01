import autoBind from "auto-bind";
import { CharPixelGridManager } from "../CharPixelLib/CharPixelGrid";
import { monomitter } from "../Utils/Monomitter";
import { ViewportManager } from "../Viewport/ViewportManager";
import { InputManager } from "./InputManager";

type SoundManager = {};

export class GameManager {
  public charPixelGridManager: CharPixelGridManager;
  public soundManager: SoundManager
  public inputManager: InputManager;
  public viewportManager: ViewportManager;

  public frame$ = monomitter<void>();
  private frameRequestId: ReturnType<typeof requestAnimationFrame>;

  constructor() {
    autoBind(this);
    this.charPixelGridManager = new CharPixelGridManager();
    this.viewportManager = new ViewportManager();
    this.inputManager = new InputManager();
  }

  private loop() {
    this.frame$.publish();
    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  public initialize(): () => void {
    const unbind = this.inputManager.bindListeners();
    this.loop();

    return () => {
      window.cancelAnimationFrame(this.frameRequestId);
      unbind();
    }
  }
}