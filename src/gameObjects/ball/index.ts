import { Container, EventEmitter } from "pixi.js";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { BallGraphic } from "./ballGraphic";
import { SpinManager } from "./spinManager";
import { ShootManager } from "./shootManager";
import { adjustSVGPath } from "../../helper";
import { ScaleManager } from "./scaleManager";
import { BlurManager } from "./blurManager";
import { RopeEffect } from "../ropeEffect";
gsap.registerPlugin(MotionPathPlugin);

export class Ball extends Container {
  ballGraphic!: BallGraphic;
  spinManager!: SpinManager;
  shootManager!: ShootManager;
  scaleManager!: ScaleManager;
  blurManager!: BlurManager;
  ropeEffect!: RopeEffect;

  eventEmitter!: EventEmitter;

  private isReadyForPreperation = true;
  isReadyForShoot = false;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.createGraphic();
    this.creatSpinManager();
    this.createShootManager();
    this.createScaleManager();
    this.createBlurManager();

    this.addEventEmitter();
    this.addEvenetListeners();
  }

  private addEvenetListeners() {
    this.eventEmitter.on("FinishShoot", () => {
      this.spinManager.stopRotation();
      this.blurManager.removeBlurEffect();
      this.fallDown();
    });

    this.eventEmitter.on("FinishMinSpin", () => {
      if (!this.isReadyForShoot) {
        this.isReadyForShoot = true;
        this.eventEmitter.emit("IsReadyForShoot");
      }
    });
  }

  private createGraphic() {
    this.ballGraphic = new BallGraphic(this);
    this.addChild(this.ballGraphic.container);
  }

  private creatSpinManager() {
    this.spinManager = new SpinManager(
      [
        this.ballGraphic.container.getChildAt(0),
        this.ballGraphic.container.getChildAt(1),
      ],
      this
    );
  }

  private createShootManager() {
    this.shootManager = new ShootManager(this);
  }

  private createScaleManager() {
    this.scaleManager = new ScaleManager(this);
  }

  private createBlurManager() {
    this.blurManager = new BlurManager(this);
  }

  private addEventEmitter() {
    this.eventEmitter = new EventEmitter();
  }

  public shoot(points: { x: number; y: number }) {
    if (!this.isReadyForShoot) return;
    if (!this.ropeEffect.effectIsOnn) this.adctivateRopeEffect();

    this.shootManager.shoot({
      x: points.x,
      y: points.y,
    });
    this.scaleManager.startScaleAnimationDuringShoot();
  }

  public selectForShoot(): void {
    if (!this.isReadyForPreperation) {
      return;
    }
    this.isReadyForPreperation = false;

    this.spinManager.startSpin();
    this.scaleManager.increaseScaleForShoot();
    this.blurManager.makeItBlur();
  }

  private fallDown() {
    const rawPath: string = "M 2 1 L -19 -9 L -41 -2 L -70 48 M -101 -24";

    // Adjust the path relative to the target's current position
    const scale: number = 2; // Define the scale factor
    const scaledAndOffsetPath: string = adjustSVGPath(
      rawPath,
      this.x,
      this.y,
      scale
    );

    gsap.to(this, {
      duration: 0.7,
      motionPath: {
        path: scaledAndOffsetPath,
        curviness: 1.5, // Controls the smoothness of the curve
      },
      ease: "bounce.out",
    });
  }

  set setRopeEffect(ropeEffect: RopeEffect) {
    this.ropeEffect = ropeEffect;
  }

  private adctivateRopeEffect() {
    this.ropeEffect.effectOnn();
  }
}
