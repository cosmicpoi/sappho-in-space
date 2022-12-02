import { Hitbox } from "../Utils/types";
import { ActorData } from "./Actor";

type SolidData = Hitbox & {
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
  constructor() {
    this.solids = new Set();
  }

  // returns callback to deregister the hitbox
  public registerHitbox(wall: SolidData): () => void {
    this.solids.add(wall);

    return () => {
      this.solids.delete(wall);
    };
  }

  public collides(hitbox: Hitbox, actor: ActorData): SolidData | undefined {
    for (const solid of this.solids) {
      if (collides(hitbox, solid)) {
        if (solid.callback) solid.callback(actor);
        return solid;
      }
    }

    return undefined;
  }
}
