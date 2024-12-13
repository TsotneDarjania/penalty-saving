import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container } from "pixi.js";

// Class for handling the character Spine and its animations.
export class SpineBoy extends Container {
  constructor() {
    super();

    this.init();
  }

  init() {
    const spine = Spine.from({
      skeleton: "spineSkeleton",
      atlas: "spineAtlas",
    });

    console.log(spine);
    spine.state.setAnimation(0, "Idle", true);
    // this.scale._x = -1;

    this.addChild(spine);
  }
}
