import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container } from "pixi.js";

// Class for handling the character Spine and its animations.
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
    // this.scale._x = -1;

    this.addChild(this.spine);
  }

  jump(direction: "left" | "right", position: 0 | 1 | 2, side: boolean) {
    this.scale.x = direction === "right" ? -1 : 1;

    let aniamtionName = side ? "Side_" : "Center_";
    aniamtionName += position;

    this.spine.state.setAnimation(0, aniamtionName, false);
  }
}
