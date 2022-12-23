import autoBind from "auto-bind";
import {
  ColorData,
  defaultColorData,
  Environment,
  environmentBackground,
  environmentColor,
} from "../Utils/colors";
import { Monomitter, monomitter } from "../Utils/Monomitter";
import { Position } from "../Utils/types";
import { GameManager } from "./GameManager";

export const ellipseHalfWidth = 750 / 2;
export const ellipseHalfHeight = 500 / 2;
export const dayNightMargin = 90;

export type ColorZone = Position & {
  radius: number;
};

export class ColorManager {
  private gameManager: GameManager;
  public colorData$: Monomitter<ColorData>;

  public environment = Environment.DEFAULT;
  constructor(gameManager: GameManager) {
    autoBind(this);
    this.gameManager = gameManager;
    this.colorData$ = monomitter<ColorData>(true);
    this.colorData$.publish(defaultColorData);
  }

  public getEnvironment(pos: Position) {
    let env = -1;
    const { x: cx, y: cy } = this.gameManager.viewportManager.getCenter();

    const delX = pos.x - cx;
    const delY = pos.y - cy;
    if ((delX / ellipseHalfWidth) ** 2 + (delY / ellipseHalfHeight) ** 2 < 1) {
      if (delX < dayNightMargin) env = Environment.Night;
      else env = Environment.Day;
    } else {
      if (pos.x < cx && pos.y < cy) env = Environment.Winter;
      else if (pos.x > cx && pos.y < cy) env = Environment.Spring;
      else if (pos.x > cx && pos.y > cy) env = Environment.Summer;
      else if (pos.x < cx && pos.y > cy) env = Environment.Autumn;
    }

    return env;
  }

  public requestColors(pos: Position) {
    const env = this.getEnvironment(pos);

    if (env !== this.environment) {
      this.environment = env;
      this.colorData$.publish({
        bg: environmentBackground[this.environment],
        text: environmentColor[this.environment],
      });
    }
  }
}
