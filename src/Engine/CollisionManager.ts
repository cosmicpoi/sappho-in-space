import { Hitbox } from "../Utils/types";
import { ActorData } from "./Actor";

export type SolidData = Hitbox;

export type TriggerData = Hitbox & {
  callback?: (a: ActorData) => void;
};

function collides(box1: Hitbox, box2: Hitbox): boolean {
  const xmax1 = box1.x + box1.width;
  const xmax2 = box2.x + box2.width;
  const ymax1 = box1.y + box1.height;
  const ymax2 = box2.y + box2.height;

  const overlapX: boolean = xmax1 > box2.x && xmax2 > box1.x;
  const overlapY: boolean = ymax1 > box2.y && ymax2 > box1.y;

  return overlapX && overlapY;
}

export class CollisionManager {
  private solids: Set<SolidData>;
  private triggers: Set<TriggerData>;

  constructor() {
    this.solids = new Set();
    this.triggers = new Set();
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

  public collidesSolid(hitbox: Hitbox): SolidData | undefined {
    for (const solid of this.solids) {
      if (collides(hitbox, solid)) return solid;
    }

    return undefined;
  }

  public collidesTrigger(
    hitbox: Hitbox,
    actor: ActorData
  ): TriggerData | undefined {
    for (const trigger of this.triggers) {
      if (collides(hitbox, trigger)) {
        if (trigger.callback) trigger.callback(actor);
        return trigger;
      }
    }

    return undefined;
  }
}
