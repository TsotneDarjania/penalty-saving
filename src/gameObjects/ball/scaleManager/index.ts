import { Ball } from "..";
import gsap from "gsap";

export class ScaleManager {
  constructor(public ball: Ball) {}

  increaseScaleForShoot() {
    // For Ball
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.2,
      x: 1.2,
      y: 1.2,
      ease: "power4.out",
    });

    // For Shadow
    gsap.to(this.ball.ballGraphic.shadow.scale, {
      duration: 0.2,
      x: this.ball.ballGraphic.shadow.scale.x + 0.06,
      y: this.ball.ballGraphic.shadow.scale.y + 0.06,
      ease: "power2",
    });
  }

  startScaleAnimationDuringShoot() {
    // For Shadow
    gsap.to(this.ball.ballGraphic.shadow.scale, {
      duration: 0.3,
      x: this.ball.ballGraphic.shadow.scale.x - 0.2,
      y: this.ball.ballGraphic.shadow.scale.y - 0.2,
      ease: "power2",
    });
    gsap.to(this.ball.ballGraphic.shadow, {
      duration: 0.4,
      alpha: 0,
      ease: "power2",
    });

    // For Ball
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.15,
      x: 1.3,
      y: 1.5,
      ease: "power2",
      onComplete: () => {
        gsap.to(this.ball.ballGraphic.container.scale, {
          duration: 0.1,
          x: 1,
          y: 1.2,
          ease: "power2",
          onComplete: () => {
            gsap.to(this.ball.ballGraphic.container.scale, {
              duration: 0.1,
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
          },
        });
      },
    });
  }
}
