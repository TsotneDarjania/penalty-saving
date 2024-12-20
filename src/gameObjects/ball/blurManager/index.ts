import { BlurFilter } from "pixi.js";
import { Ball } from "..";
import gsap from "gsap";

export class BlurManager {
  blurFilter!: BlurFilter;
  constructor(public ball: Ball) {
    this.addBlurFilter();
  }

  private addBlurFilter() {
    this.blurFilter = new BlurFilter({
      strength: 0.2,
    });
    this.ball.filters = [this.blurFilter];
  }

  public makeItBlur() {
    gsap.to(this.blurFilter, {
      duration: 0.3,
      strength: 0.7,
      ease: "power4.out",
      onUpdate: () => {
        this.ball.filters = [this.blurFilter];
      },
    });
  }

  public removeBlurEffect() {
    gsap.to(this.blurFilter, {
      duration: 0.3,
      strength: 0.1,
      ease: "power4.out",
      onUpdate: () => {
        this.ball.filters = [this.blurFilter];
      },
    });
  }
}
