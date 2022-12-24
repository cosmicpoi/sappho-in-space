import autoBind from "auto-bind";
import {
  ColorData,
  defaultColorData,
  Environment,
  getZoneData,
} from "../Utils/colors";
import { Monomitter, monomitter } from "../Utils/Monomitter";
import { Position } from "../Utils/types";
import { GameManager } from "./GameManager";

export const ellipseHalfWidth = 430 / 2;
export const ellipseHalfHeight = 280 / 2;
export const dayNightMargin = 40;

export type ColorZone = Position & {
  radius: number;
  data: ColorData;
};

export class ColorManager {
  private gameManager: GameManager;

  public colorData$: Monomitter<ColorData>;

  private zones: Set<ColorZone>;

  private environment = Environment.DEFAULT;
  private zone: ColorZone | undefined = undefined;

  constructor(gameManager: GameManager) {
    autoBind(this);
    this.gameManager = gameManager;
    this.colorData$ = monomitter<ColorData>(true);
    this.colorData$.publish(defaultColorData);
    this.zones = new Set();
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
      if (pos.x <= cx && pos.y <= cy) env = Environment.Winter;
      else if (pos.x > cx && pos.y <= cy) env = Environment.Spring;
      else if (pos.x > cx && pos.y > cy) env = Environment.Summer;
      else if (pos.x <= cx && pos.y > cy) env = Environment.Autumn;
    }

    return env;
  }

  public registerZone(zone: ColorZone): () => void {
    this.zones.add(zone);
    return () => this.zones.delete(zone);
  }

  private getZone(pos: Position): ColorZone | undefined {
    for (const zone of this.zones) {
      const r = Math.sqrt((pos.x - zone.x) ** 2 + (pos.y - zone.y) ** 2);
      if (r <= zone.radius) return zone;
    }
    return undefined;
  }

  public requestColors(pos: Position) {
    // see if environment updated
    const env = this.getEnvironment(pos);

    let didUpdate = false;

    if (env !== this.environment) {
      this.environment = env;
      didUpdate = true;
    }

    // see if zone updated
    const zone = this.getZone(pos);

    if (zone !== this.zone) {
      this.zone = zone;
      didUpdate = true;
    }

    // update color values if either zone or environment updated
    if (didUpdate) {
      if (this.zone) this.colorData$.publish(this.zone.data);
      else this.colorData$.publish(getZoneData(this.environment));
    }
  }
}
