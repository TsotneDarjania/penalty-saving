import { Container, Sprite, Texture } from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import { getRandomFloat } from "../helper";
import gsap from "gsap";

export class Spectators {
  count = 220;
  spectators: Sprite[] = [];

  minY!: number;
  maxY!: number;

  minScale = 0.2;
  maxScale = 1.1;

  minDuration = 0.6;
  maxDuration = 1.2;

  constructor(
    public scene: Container,
    public scaledBackgroundgWidth: number,
    public scaledBackgroundgHeight: number,
    public backgroundScale: number,
    public stadiumBck: Sprite
  ) {
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
      spectator.x =
        this.stadiumBck.x -
        this.scaledBackgroundgWidth / 2 +
        getRandomFloat(-0.9, 1.9) * this.scaledBackgroundgWidth;
      spectator.y =
        this.stadiumBck.y -
        this.scaledBackgroundgHeight / 2 +
        getRandomFloat(this.minY, this.maxY) * this.scaledBackgroundgHeight;

      spectator.scale.set(
        this.backgroundScale * getRandomFloat(this.minScale, this.maxScale)
      );

      this.spectators.push(spectator);
      this.scene.addChild(spectator);
    }
  }

  startAnimations() {
    this.spectators.forEach((spectator) => {
      gsap.to(spectator, {
        delay: getRandomFloat(0, 0.7),
        duration: getRandomFloat(this.minDuration, this.maxDuration),
        ease: "power1.inOut",
        alpha: 1,
        onComplete: () => {
          gsap.to(spectator, {
            duration: getRandomFloat(this.minDuration, this.maxDuration),
            ease: "power1.inOut",
            alpha: 0,
            onComplete: () => {
              this.doAnimationAgain(spectator);
            },
          });
        },
      });
    });
  }

  doAnimationAgain(spectator: Sprite) {
    spectator.x =
      this.stadiumBck.x -
      this.scaledBackgroundgWidth / 2 +
      getRandomFloat(-0.4, 1.4) * this.scaledBackgroundgWidth;
    spectator.y =
      this.stadiumBck.y -
      this.scaledBackgroundgHeight / 2 +
      getRandomFloat(this.minY, this.maxY) * this.scaledBackgroundgHeight;
    spectator.alpha = 0;

    gsap.to(spectator, {
      duration: getRandomFloat(this.minDuration, this.maxDuration),
      ease: "power1.inOut",
      alpha: 1,
      onComplete: () => {
        gsap.to(spectator, {
          duration: getRandomFloat(this.minDuration, this.maxDuration),
          ease: "power1.inOut",
          alpha: 0,
          onComplete: () => {
            this.doAnimationAgain(spectator);
          },
        });
      },
    });
  }
}
