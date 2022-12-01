import autoBind from "auto-bind";
import { CharPixelGridManager } from "./CharPixelLib/CharPixelGrid";
import { ViewportManager } from "./Viewport/ViewportManager";

type SoundManager = {};
type InputManager = {};

export class GameManager {
  public charPixelGridManager: CharPixelGridManager;
  public soundManager: SoundManager
  public inputManager: InputManager;
  public viewportManager: ViewportManager;

  constructor() {
    autoBind(this);
    this.charPixelGridManager = new CharPixelGridManager();
    this.viewportManager = new ViewportManager();
  }
}