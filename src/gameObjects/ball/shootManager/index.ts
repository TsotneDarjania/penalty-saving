import { Ball } from "..";
import gsap from "gsap";
export class ShootManager {
  isReadyForShoot = true;
  constructor(public ball: Ball) {}

  shoot(targetLocation: { x: number; y: number }) {
    gsap.to(this.ball, {
      duration: 0.4,
      x: targetLocation.x,
      y: targetLocation.y,
      ease: "power2.in",
      onComplete: () => {
        this.ball.eventEmitter.emit("FinishShoot");
      },
    });
  }
}
