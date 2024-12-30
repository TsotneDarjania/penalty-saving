import { Ball } from "..";
import gsap from "gsap";
import { ballTrail } from "../../../config/runtimeHelper";
import { Container, Point } from "pixi.js";
export class ShootManager {
  parentContainer!: Container;

  constructor(public ball: Ball) {
    this.parentContainer = ball;
  }

  shoot(targetLocation: { x: number; y: number }) {
    const localTarget = this.ball.toLocal(
      new Point(targetLocation.x, targetLocation.y)
    );

    gsap.to(this.ball.ballGraphic.container, {
      duration: 0.2,
      x: localTarget.x,
      y: localTarget.y,
      ease: "power2.in",
      onUpdate: () => {
        const localTarget = this.ball.toGlobal(
          new Point(
            this.ball.ballGraphic.container.x,
            this.ball.ballGraphic.container.y
          )
        );

        ballTrail.drawParticles(localTarget.x, localTarget.y);
      },
      onComplete: () => {
        this.ball.eventEmitter.emit("FinishShoot");
      },
    });
  }
}
