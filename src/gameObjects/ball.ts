import { BlurFilter, Container, Graphics, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { gameConfig } from "../config/gameConfig";

export class Ball extends Container {
  spriteContainer: Container = new Container();
  maskContainer!: Container;
  blurFilter!: BlurFilter;

  private isLastRotation = false;
  private isReadyForShoot = true;

  constructor(public ballTexture: Texture, public ballBorderTexture: Texture) {
    super();
    this.init();
  }

  private init() {
    this.addSprites();
    this.addMask();
    this.addBallBorder();
  }

  private addBallBorder() {
    const blurFilter = new BlurFilter({
      strength: 1.8,
    });

    let border = new Graphics({
      alpha: 1,
      filters: blurFilter,
    })
      .circle(this.x, this.y, gameConfig.desktop.ball.radius)
      .stroke({
        width: 4,
      });

    this.addChild(border);
  }

  private addSprites() {
    for (let i = 0; i < 2; i++) {
      const sprite = new Sprite(this.ballTexture);
      sprite.anchor = 0.5;
      sprite.scale = 0.5;
      sprite.y = (-i * sprite.texture.frame.height) / 2;

      this.spriteContainer.addChild(sprite);
    }

    this.addChild(this.spriteContainer);
  }

  private addMask() {
    let mask = new Graphics()
      .circle(this.x, this.y, gameConfig.desktop.ball.radius)
      .fill();

    this.spriteContainer.mask = mask;
    this.maskContainer = new Container();
    this.maskContainer.addChild(mask);

    this.addChild(this.maskContainer);

    this.blurFilter = new BlurFilter({
      strength: 1,
    });

    this.spriteContainer.filters = [this.blurFilter];
  }

  private startRotation(): void {
    const firstElement = this.spriteContainer.getChildAt(0) as Sprite;
    const lastY = firstElement.y + firstElement.texture.frame.height / 2;
    const startY = firstElement.y - firstElement.texture.frame.height / 2;

    console.log(startY);
    console.log(lastY);

    for (const element of this.spriteContainer.children) {
      gsap.to(element, {
        duration: 0.7,
        y: (element as Sprite).y + (element as Sprite).texture.frame.height / 2,
        ease: "power3.in",
        onComplete: () => {
          if (element.y === lastY) {
            element.y = startY;
          }
          this.moveDown(element as Sprite, lastY, startY);
        },
      });
    }
  }

  moveDown(sprite: Sprite, lastY: number, startY: number) {
    gsap.to(sprite, {
      duration: 0.25,
      y: sprite.y + sprite.texture.frame.height / 2,
      ease: "none",
      onComplete: () => {
        if (sprite.y === lastY) {
          sprite.y = startY;
        }

        this.isLastRotation
          ? this.lastMoveDown(sprite, lastY, startY)
          : this.moveDown(sprite, lastY, startY);
      },
    });
  }

  lastMoveDown(sprite: Sprite, lastY: number, startY: number) {
    gsap.to(sprite, {
      duration: this.isLastRotation ? 0.8 : 0.25,
      y: sprite.y + sprite.texture.frame.height / 2,
      ease: "power4.out",
      onComplete: () => {
        if (sprite.y === lastY) {
          sprite.y = startY;
        }
        this.isLastRotation = false;
        this.isReadyForShoot = true;
      },
    });
  }

  private increaseScale() {
    const blurFilter = new BlurFilter({
      strength: 0,
    });

    this.filters = [blurFilter];

    gsap.to(blurFilter, {
      duration: 1.5,
      strength: 3, // Final blur strength
      ease: "power4.out",
      onUpdate: () => {
        // Reapply the filter on each update to ensure the animation reflects
        this.filters = [blurFilter];
      },
    });

    gsap.to(this.scale, {
      duration: 1.5,
      x: 1.3,
      y: 1.3,
      ease: "power4.out",
    });
  }

  private stopRotation(): void {
    this.isLastRotation = true;
  }

  public startPrepare(): void {
    if (!this.isReadyForShoot) {
      return;
    }
    this.isReadyForShoot = false;

    this.startRotation();
    this.increaseScale();

    // setTimeout(() => {
    //   this.stopRotation();
    // }, 2000);
  }
}
