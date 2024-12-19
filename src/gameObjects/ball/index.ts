import { Container, EventEmitter } from "pixi.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { BallGraphic } from "./ballGraphic";
import { SpinManager } from "./spinManager";
import { ShootManager } from "./shootManager";
import { adjustSVGPath } from "../../helper";
import { ScaleManager } from "./scaleManager";
import { BlurManager } from "./blurManager";
import { RopeEffect } from "../ropeEffect";
import gsap from "gsap";
import { GameEventEnums } from "../../enums/gameEvenetEnums";
import { gameConfig } from "../../config/gameConfig";
gsap.registerPlugin(MotionPathPlugin);

export class Ball extends Container {
  ballGraphic!: BallGraphic;
  spinManager!: SpinManager;
  shootManager!: ShootManager;
  scaleManager!: ScaleManager;
  blurManager!: BlurManager;
  ropeEffect!: RopeEffect;
  eventEmitter!: EventEmitter;

  isGoal = false;

  ballFallinDownRawPathData!: {
    path: string;
    offsetX: number;
    offsetY: number;
  };

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
    if (!this.ropeEffect.effectIsOnn) this.adctivateRopeEffect();

    this.shootManager.shoot({
      x: points.x,
      y: points.y,
    });
    this.scaleManager.startScaleAnimationDuringShoot();

    setTimeout(() => {
      this.eventEmitter.emit(GameEventEnums.isTimeToJumpGoalKeeper);
    }, 200);
  }

  public selectForShoot(): void {
    this.spinManager.startSpin();
    this.scaleManager.increaseScaleForShoot();
    this.blurManager.makeItBlur();
  }

  private fallDown() {
    // Adjust the path relative to the target's current position
    const scale: number = 2; // Define the scale factor
    const scaledAndOffsetPath: string = adjustSVGPath(
      this.ballFallinDownRawPathData.path,
      this.x + this.ballFallinDownRawPathData.offsetX,
      this.y + this.ballFallinDownRawPathData.offsetY,
      scale
    );

    gsap.to(this, {
      duration: 0.7,
      motionPath: {
        path: scaledAndOffsetPath,
        curviness: 1.5, // Controls the smoothness of the curve
      },
      ease: "bounce.out",
      onComplete: () => {
        this.eventEmitter.emit(GameEventEnums.finishFallingOfBall);
      },
    });
  }

  set setRopeEffect(ropeEffect: RopeEffect) {
    this.ropeEffect = ropeEffect;
  }

  private adctivateRopeEffect() {
    this.ropeEffect.effectOnn();
  }

  private deactivateRopeEffect() {
    this.ropeEffect.effectoff();
  }

  public reset() {
    this.isGoal = false;

    this.deactivateRopeEffect();
    this.x = window.innerWidth / 2;
    this.y = -window.innerHeight - 100;

    gsap.to(this.ballGraphic.container.scale, {
      duration: 0.1,
      x: 1,
      y: 1,
      ease: "power2",
    });

    gsap.to(this, {
      duration: 0.8,
      y: gameConfig.desktop.ball.positionY,
      ease: "bounce.out",
      onComplete: () => {
        this.adctivateRopeEffect();
      },
    });
  }
}
