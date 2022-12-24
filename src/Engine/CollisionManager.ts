import { Circle, Hitbox } from "../Utils/types";
import { ActorData } from "./Actor";

export type SolidData = Hitbox;

export type TriggerCB = {
  callback?: (a: ActorData) => void;
};
export type TriggerData = Hitbox & TriggerCB;
export type CircleTriggerData = Circle & TriggerCB;

function collides(box1: Hitbox, box2: Hitbox): boolean {
  const xmax1 = box1.x + box1.width;
  const xmax2 = box2.x + box2.width;
  const ymax1 = box1.y + box1.height;
  const ymax2 = box2.y + box2.height;

  const overlapX: boolean = xmax1 > box2.x && xmax2 > box1.x;
  const overlapY: boolean = ymax1 > box2.y && ymax2 > box1.y;

  return overlapX && overlapY;
}

function circleCollides(circle: Circle, box: Hitbox): boolean {
  const bcx = box.x + box.width / 2;
  const bcy = box.y + box.height / 2;

  const dx = bcx - circle.x;
  const dy = bcy - circle.y;

  const r = Math.sqrt(dx ** 2 + dy ** 2);
  return r <= circle.radius;
}

export class CollisionManager {
  private solids: Set<SolidData>;
  private triggers: Set<TriggerData>;
  private circleTriggers: Set<CircleTriggerData>;

  constructor() {
    this.solids = new Set();
    this.triggers = new Set();
    this.circleTriggers = new Set();
  }

  // returns callback to deregister the hitbox
  public registerSolid(solid: SolidData): () => void {
    this.solids.add(solid);
    return () => this.solids.delete(solid);
  }
  public registerTrigger(trigger: TriggerData): () => void {
    this.triggers.add(trigger);
    return () => this.triggers.delete(trigger);
  }
  public registerCircleTrigger(trigger: CircleTriggerData): () => void {
    this.circleTriggers.add(trigger);
    return () => this.circleTriggers.delete(trigger);
  }

  public collidesSolid(hitbox: Hitbox): SolidData | undefined {
    for (const solid of this.solids) {
      if (collides(hitbox, solid)) return solid;
    }

    return undefined;
  }

  public collidesTrigger(
    hitbox: Hitbox,
    actor: ActorData
  ): TriggerCB | undefined {
    for (const trigger of this.triggers) {
      if (collides(trigger, hitbox)) {
        if (trigger.callback) trigger.callback(actor);
        return trigger;
      }
    }

    for (const trigger of this.circleTriggers) {
      if (circleCollides(trigger, hitbox)) {
        if (trigger.callback) trigger.callback(actor);
        return trigger;
      }
    }

    return undefined;
  }
}
