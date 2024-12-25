import { Ball } from "..";
import gsap from "gsap";
export class ShootManager {
  constructor(public ball: Ball) {}

  shoot(targetLocation: { x: number; y: number }) {
    this.ball.ballGraphic.removeSelector();

    gsap.to(this.ball, {
      duration: 0.2,
      x: targetLocation.x,
      y: targetLocation.y,
      ease: "power2.in",
      onComplete: () => {
        this.ball.eventEmitter.emit("FinishShoot");
      },
    });
  }
}
