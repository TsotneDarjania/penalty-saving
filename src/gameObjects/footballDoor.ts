import { Container, Sprite } from "pixi.js";
import { BulgePinchFilter } from "pixi-filters";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export class FootballDoor extends Container {
  bulgeGilterEffect!: BulgePinchFilter;
  door!: Container;
  topGrid!: Sprite;
  leftGrid!: Sprite;
  baseGrid!: Sprite;
  RightGrid!: Sprite;

  spine!: Spine;

  gridContainer: Container = new Container();

  constructor() {
    super();

    this.addDoor();
    this.createBulgeFilter();
  }

  private createBulgeFilter() {
    this.bulgeGilterEffect = new BulgePinchFilter({
      strength: -0.6,
      radius: 80,
    });
  }

  private addDoor() {
    this.door = new Container();

    this.spine = Spine.from({
      skeleton: "FootballDoorSkeleton",
      atlas: "FootballDoorAtlas",
    });

    this.spine.y = this.y + 97;
    this.spine.scale = 0.5;

    this.door.addChild(this.spine);

    this.spine.state.setAnimation(0, "Idle", true);

    this.addChild(this.door);
  }

  playGridAnimation(point: [number, number]) {
    if (point[1] > 1) point[1] = 1;
    const animationName = `${point[0]}_${point[1]}`;
    this.spine.state.setAnimation(0, animationName, false);
  }

  playIdleAnimation() {
    this.spine.state.setAnimation(0, "Idle", true);
  }
}
