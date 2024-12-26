import { Ball } from "..";
import gsap from "gsap";

export class ScaleManager {
  constructor(public ball: Ball) {}

  increaseScaleForShoot() {
    // For Selector
    gsap.to(this.ball.ballGraphic.ballSelector.scale, {
      duration: 0.2,
      x: this.ball.scale.x + 0.8,
      y: this.ball.scale.y + 0.8,
      ease: "power2",
    });

    // For Ball
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.2,
      x: this.ball.ballGraphic.container.scale.x + 0.1,
      y: this.ball.ballGraphic.container.scale.y + 0.1,
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
      duration: 0.2,
      x: this.ball.ballGraphic.shadow.scale.x - 0.2,
      y: this.ball.ballGraphic.shadow.scale.y - 0.2,
      ease: "power2",
    });
    gsap.to(this.ball.ballGraphic.shadow, {
      duration: 0.2,
      alpha: 0,
      ease: "power2",
      onComplete: () => {
        this.ball.ballGraphic.shadow.alpha = 1;
        gsap.to(this.ball.ballGraphic.shadow.scale, {
          duration: 0.5,
          x: this.ball.backgroundScale * 0.4,
          y: this.ball.backgroundScale * 0.4,
          ease: "bounce.out",
        });
      },
    });

    // For Ball
    gsap.to(this.ball.ballGraphic.container.scale, {
      duration: 0.1,
      x: 1.3,
      y: 1.5,
      ease: "power2",
      onComplete: () => {
        gsap.to(this.ball.ballGraphic.container.scale, {
          duration: 0.06,
          x: 1,
          y: 1.2,
          ease: "power2",
          onComplete: () => {
            gsap.to(this.ball.ballGraphic.container.scale, {
              duration: 0.06,
              x: 0.3,
              y: 0.7,
              ease: "power2",
              onComplete: () => {
                gsap.to(this.ball.ballGraphic.container.scale, {
                  duration: 0.06,
                  x: this.ball.isGoal ? 0.26 : 0.35,
                  y: this.ball.isGoal ? 0.26 : 0.35,
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
