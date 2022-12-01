import autoBind from "auto-bind";
import { CharPixelGridManager } from "./CharPixelLib/CharPixelGrid";

type SoundManager = {};
type InputManager = {};
type ViewportManager = {};

export class GameManager {
  public charPixelGridManager: CharPixelGridManager;
  public soundManager: SoundManager
  public inputManager: InputManager;
  public viewportManager: ViewportManager;

  constructor() {
    autoBind(this);
    this.charPixelGridManager = new CharPixelGridManager();
  }
}