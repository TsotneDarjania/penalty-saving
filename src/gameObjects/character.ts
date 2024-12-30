import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container } from "pixi.js";
import { Scene } from "../game/core/scene";
import { getScaleX } from "../config/runtimeHelper";

export class Character extends Container {
  spine!: Spine;
  constructor(public scene: Scene, initX: number, initY: number) {
    super();

    this.x = initX;
    this.y = initY;

    this.init();
    this.scene.add(this);
  }

  init() {
    this.interactive = false;
    this.interactiveChildren = false;

    this.spine = Spine.from({
      skeleton: "CharacterSkeleton",
      atlas: "CharacterAtlas",
    });

    this.spine.scale = getScaleX(2.5);

    this.spine.state.setAnimation(0, "Idle", true);
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
