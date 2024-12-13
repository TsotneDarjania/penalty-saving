import { Sprite } from "pixi.js";
import gsap from "gsap";

export class SpinManager {
  isLastRotation = false;

  constructor(public sprites: Sprite[]) {}

  public startSpin() {
    const firstElement = this.sprites[0];
    const lastY = firstElement.y + firstElement.height;
    const startY = firstElement.y - firstElement.height;

    for (const sprite of this.sprites) {
      gsap.to(sprite, {
        duration: 0.4,
        y: sprite.y + sprite.height,
        ease: "power3.in",
        onComplete: () => {
          if (sprite.y === lastY) {
            sprite.y = startY;
          }
          this.moveDown(sprite, lastY, startY);
        },
      });
    }
  }

  private moveDown(sprite: Sprite, lastY: number, startY: number) {
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

  private lastMoveDown(sprite: Sprite, lastY: number, startY: number) {
    gsap.to(sprite, {
      duration: this.isLastRotation ? 0.4 : 0.15,
      y: sprite.y + sprite.height,
      ease: "power4.out",
      onComplete: () => {
        if (sprite.y === lastY) {
          sprite.y = startY;
        }
        this.reset();
      },
    });
  }

  stopRotation() {
    this.isLastRotation = true;
  }

  reset() {
    this.isLastRotation = false;
  }
}
