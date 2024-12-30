import { Sprite, Texture } from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import { getRandomFloat } from "../helper";
import gsap from "gsap";
import { Scene } from "../game/core/scene";
import { getScaleX, getX, getY } from "../config/runtimeHelper";

export class Spectators {
  count = 15;
  spectators: Sprite[] = [];

  minY!: number;
  maxY!: number;

  minScale = 0.4;
  maxScale = 1.2;

  minX = 0;
  maxX = 1;

  minDuration = 0.2;
  maxDuration = 0.3;

  constructor(public scene: Scene) {
    this.minY = 0.35;
    this.maxY = 0.47;

    this.init();
    this.startAnimations();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      const spectator = new Sprite(Texture.from(GameObjectEnums.spectator));
      spectator.anchor = 0.5;
      spectator.zIndex = -2;
      spectator.alpha = 0;
      spectator.x = getX(getRandomFloat(this.minX, this.maxX));
      spectator.y = getY(getRandomFloat(this.minY, this.maxY));

      spectator.scale.set(getScaleX(0.5));

      this.spectators.push(spectator);
      this.scene.add(spectator);
    }
  }

  startAnimations() {
    let delay = 0;
    this.spectators.forEach((spectator) => {
      delay += getRandomFloat(0, 0.04);
      gsap.to(spectator, {
        delay: delay,
        duration: getRandomFloat(this.minDuration, this.maxDuration),
        ease: "none",
        alpha: 1,
        onComplete: () => {
          gsap.to(spectator, {
            duration: getRandomFloat(this.minDuration, this.maxDuration),
            ease: "none",
            alpha: 0,
            onComplete: () => {
              this.doAnimationAgain(spectator, delay);
            },
          });
        },
      });
    });
  }

  doAnimationAgain(spectator: Sprite, delay: number) {
    spectator.x = getX(getRandomFloat(this.minX, this.maxX));
    spectator.y = getY(getRandomFloat(this.minY, this.maxY));
    spectator.alpha = 0;

    gsap.to(spectator, {
      delay,
      duration: getRandomFloat(this.minDuration, this.maxDuration),
      ease: "power1.inOut",
      alpha: 1,
      onComplete: () => {
        gsap.to(spectator, {
          duration: getRandomFloat(this.minDuration, this.maxDuration),
          ease: "power1.inOut",
          alpha: 0,
          onComplete: () => {
            this.doAnimationAgain(spectator, delay);
          },
        });
      },
    });
  }
}
