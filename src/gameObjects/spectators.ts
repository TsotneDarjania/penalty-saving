import { Container, Sprite, Texture } from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import { getRandomFloat } from "../helper";
import gsap from "gsap";

export class Spectators {
  count = 170;
  spectators: Sprite[] = [];

  minY!: number;
  maxY!: number;

  minScale = 0.4;
  maxScale = 1.2;

  minX = -1;
  maxX = 2;

  minDuration = 0.2;
  maxDuration = 0.3;

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
        getRandomFloat(this.minX, this.maxX) * this.scaledBackgroundgWidth;
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
    let delay = 0;
    this.spectators.forEach((spectator) => {
      delay += getRandomFloat(0, 0.1);
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
    spectator.x =
      this.stadiumBck.x -
      this.scaledBackgroundgWidth / 2 +
      getRandomFloat(this.minX, this.maxX) * this.scaledBackgroundgWidth;
    spectator.y =
      this.stadiumBck.y -
      this.scaledBackgroundgHeight / 2 +
      getRandomFloat(this.minY, this.maxY) * this.scaledBackgroundgHeight;
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
