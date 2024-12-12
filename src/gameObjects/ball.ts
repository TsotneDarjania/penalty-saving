import { BlurFilter, Container, Graphics, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { gameConfig } from "../config/gameConfig";

export class Ball extends Container {
  spriteContainer: Container = new Container();
  maskContainer!: Container;
  blurFilter!: BlurFilter;

  private isLastRotation = false;
  private isReadyForPreperation = true;
  private isReadyForShoot = false;
  private isShootCommand = false;

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
      strength: 1.1,
    });

    let border = new Graphics({
      alpha: 1,
      filters: blurFilter,
    })
      .circle(this.x, this.y, gameConfig.desktop.ball.radius)
      .stroke({
        color: "black",
        width: 2.4,
      });

    this.addChild(border);
  }

  private addSprites() {
    for (let i = 0; i < 2; i++) {
      const sprite = new Sprite(this.ballTexture);
      sprite.anchor = 0.5;
      sprite.scale = 0.24;
      sprite.y = -i * sprite.height;

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
  }

  private startRotation(): void {
    const firstElement = this.spriteContainer.getChildAt(0) as Sprite;
    const lastY = firstElement.y + firstElement.height;
    const startY = firstElement.y - firstElement.height;

    for (const element of this.spriteContainer.children) {
      gsap.to(element, {
        duration: 0.4,
        y: (element as Sprite).y + (element as Sprite).height,
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
      duration: 0.15,
      y: sprite.y + sprite.height,
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
      duration: this.isLastRotation ? 0.4 : 0.15,
      y: sprite.y + sprite.height,
      ease: "power4.out",
      onComplete: () => {
        if (sprite.y === lastY) {
          sprite.y = startY;
        }
        this.isLastRotation = false;
        this.isReadyForPreperation = true;
      },
    });
  }

  private increaseScale() {
    this.blurFilter = new BlurFilter({
      strength: 0,
    });
    this.filters = [this.blurFilter];
    gsap.to(this.blurFilter, {
      duration: 0.3,
      strength: 1, // Final blur strength
      ease: "power4.out",
      onUpdate: () => {
        // Reapply the filter on each update to ensure the animation reflects
        this.filters = [this.blurFilter];
      },
      onComplete: () => {
        this.isReadyForShoot = true;
        this.isShootCommand && this.shoot();
      },
    });
    gsap.to(this.scale, {
      duration: 0.3,
      x: 1.3,
      y: 1.3,
      ease: "power4.out",
    });
  }

  private stopRotation(): void {
    this.isLastRotation = true;
  }

  public shoot() {
    this.isShootCommand = true;
    if (!this.isReadyForShoot) return;
    gsap.to(this, {
      duration: 0.4,
      x: 650,
      y: 320,
      ease: "power2",
    });
    // Scale Aniamtion
    gsap.to(this.scale, {
      duration: 0.3,
      x: 0.4,
      y: 0.8,
      ease: "power2",
      onComplete: () => {
        gsap.to(this.scale, {
          duration: 0.1,
          x: 0.5,
          y: 0.5,
          ease: "power2",
          onComplete: () => {
            this.stopRotation();
            this.blurFilter.strength = 1;
          },
        });
      },
    });
  }

  public startPrepare(): void {
    if (!this.isReadyForPreperation) {
      return;
    }
    this.isReadyForPreperation = false;

    this.startRotation();
    this.increaseScale();
  }
}
