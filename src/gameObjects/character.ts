import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container } from "pixi.js";

export class Character extends Container {
  spine!: Spine;
  constructor(public scene: Container) {
    super();

    this.init();
    this.scene.addChild(this);
  }

  init() {
    this.interactive = false;
    this.interactiveChildren = false;

    this.spine = Spine.from({
      skeleton: "spineSkeleton",
      atlas: "spineAtlas",
    });

    this.spine.state.setAnimation(0, "Idle", true);
    this.spine.scale = 0.5;
    this.addChild(this.spine);
  }

  jump(direction: "left" | "right" | "center", height: 0 | 1 | 2) {
    this.scale.x = direction === "right" ? -1 : 1;

    let animationName =
      direction === "left" || direction === "right" ? "Side_" : "Center_";

    animationName += height;

    this.spine.state.setAnimation(0, animationName, false);
  }

  reset() {
    this.spine.state.setAnimation(0, "Idle", true);
  }
}
