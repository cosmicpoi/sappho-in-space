import autoBind from "auto-bind";
import { CharPixelGridManager } from "../CharPixelLib/CharPixelGridManager";
import { DataManager } from "../Data/FragmentData";
import { monomitter } from "../Utils/Monomitter";
import { ViewportManager } from "../Viewport/ViewportManager";
import { CollisionManager } from "./CollisionManager";
import { ColorManager } from "./ColorManager";
import { InputManager } from "./InputManager";

export class GameManager {
  public charPixelGridManager: CharPixelGridManager;
  public inputManager: InputManager;
  public viewportManager: ViewportManager;
  public collisionManager: CollisionManager;
  public dataManager: DataManager;
  public colorManager: ColorManager;

  private frameCount = 0;
  public frame$ = monomitter<number>();
  private frameRequestId: ReturnType<typeof requestAnimationFrame>;

  constructor() {
    autoBind(this);
    this.charPixelGridManager = new CharPixelGridManager();
    this.inputManager = new InputManager();
    this.viewportManager = new ViewportManager();
    this.collisionManager = new CollisionManager();
    this.dataManager = new DataManager();
    this.colorManager = new ColorManager(this);
  }

  private loop() {
    this.frame$.publish(this.frameCount++);
    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  public initialize(): () => void {
    const unbind = this.inputManager.bindListeners();
    this.loop();

    return () => {
      window.cancelAnimationFrame(this.frameRequestId);
      unbind();
    };
  }
}
