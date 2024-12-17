import { Ball } from "..";
import gsap from "gsap";

export class ScaleManager {
  constructor(public ball: Ball) {}

  increaseScaleForShoot() {
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.3,
      x: 1.4,
      y: 1.4,
      ease: "power4.out",
    });
  }

  startScaleAnimationDuringShoot() {
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.3,
      x: 0.5,
      y: 0.9,
      ease: "power2",
      onComplete: () => {
        gsap.to(this.ball.ballGraphic.container.scale, {
          duration: 0.1,
          x: 0.9,
          y: 0.9,
          ease: "power2",
        });
      },
    });
  }
}
