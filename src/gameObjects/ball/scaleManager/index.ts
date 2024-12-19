import { Ball } from "..";
import gsap from "gsap";

export class ScaleManager {
  constructor(public ball: Ball) {}

  increaseScaleForShoot() {
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.3,
      x: 1.2,
      y: 1.2,
      ease: "power4.out",
    });
  }

  startScaleAnimationDuringShoot() {
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.3,
      x: 0.3,
      y: 0.7,
      ease: "power2",
      onComplete: () => {
        gsap.to(this.ball.ballGraphic.container.scale, {
          duration: 0.1,
          x: this.ball.isGoal ? 0.3 : 0.45,
          y: this.ball.isGoal ? 0.3 : 0.45,
          ease: "power2",
        });
      },
    });
  }
}
