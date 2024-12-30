import { BlurFilter, Container, Sprite, Texture } from "pixi.js";
import { Ball } from "..";
import { GameObjectEnums } from "../../../enums/gameObjectEnums";
import gsap from "gsap";

export class BallSelector extends Container {
  greenShadow!: Sprite;
  arrows!: Sprite;

  constructor(public ball: Ball) {
    super();

    this.addGreenShadow();
    this.addArrows();

    this.startArrowSpinAnimation();
    this.ball.addChild(this);
  }

  addGreenShadow() {
    this.greenShadow = new Sprite(
      Texture.from(GameObjectEnums.greenShadowCircle)
    );

    this.greenShadow.anchor = 0.5;
    this.greenShadow.width = 90;
    this.greenShadow.height = 90;

    this.addChild(this.greenShadow);
  }

  addArrows() {
    const blurFilter = new BlurFilter({
      strength: 1,
    });

    this.arrows = new Sprite(Texture.from(GameObjectEnums.ballCircleArrows));
    this.arrows.anchor = 0.5;

    this.arrows.filters = [blurFilter];

    this.arrows.width = 110;
    this.arrows.height = 110;
    this.addChild(this.arrows);
  }

  startArrowSpinAnimation() {
    gsap.to(this.arrows, {
      duration: 12,
      rotation: 3.14159,
      ease: "none",
      onComplete: () => {
        gsap.to(this.arrows, {
          duration: 12,
          rotation: 0,
          ease: "none",
          onComplete: () => {
            this.startArrowSpinAnimation();
          },
        });
      },
    });

    gsap.to(this.arrows.scale, {
      duration: 0.4,
      yoyo: true,
      x: this.arrows.scale.x + 0.005,
      y: this.arrows.scale.y + 0.005,
      repeat: -1,
      ease: "none",
    });
  }

  removeSelector() {
    gsap.to(this, {
      duration: 0.2,
      alpha: 0,
    });
  }

  reset() {
    this.scale.x = this.scale.x - 0.26;
    this.scale.y = this.scale.y - 0.26;

    this.addSelector();
  }

  addSelector() {
    gsap.to(this, {
      duration: 0.2,
      alpha: 1,
    });
  }
}
