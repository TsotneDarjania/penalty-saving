import { Game } from "..";
import { createKey, getRandomIntInRange } from "../../helper";

export class GameManager {
  isBallSelectedForShoot = false;
  shootIsPossible = false;

  possibleToShowTargets = true;

  constructor(public game: Game) {
    this.listenUserEvents();
  }

  shoot() {
    if (!this.shootIsPossible) {
      return;
    }

    this.game.dorTargetpoints.lightoffTargets();

    let targetKey = createKey([
      getRandomIntInRange(0, 2),
      getRandomIntInRange(0, 2),
    ]);

    if (this.game.dorTargetpoints.isSelectedPoint) {
      const keyArray = this.game.dorTargetpoints.selectedPoint
        .split(",")
        .map(Number);

      targetKey = createKey(keyArray as [number, number]);
    }

    const x = this.game.dorTargetpoints.points.get(targetKey)!.x;
    const y = this.game.dorTargetpoints.points.get(targetKey)!.y;

    this.game.gameObjects.ball!.shoot({
      x,
      y,
    });
  }

  shootCommand() {
    this.shoot();
  }

  selectBallForShoot() {
    this.possibleToShowTargets && this.showTargetsOnDor();
    this.possibleToShowTargets = false;

    this.isBallSelectedForShoot = true;
    this.game.gameObjects.ball!.selectForShoot();

    // document.body.style.cursor = "pointer";
  }

  showTargetsOnDor() {
    this.game.dorTargetpoints.lightOnnTargets();
  }

  listenUserEvents() {
    // Select Ball
    this.game.eventManager.evenetEmitter.on("SelectBallForShoot", () => {
      this.selectBallForShoot();
    });

    //MouseUp
    this.game.eventManager.evenetEmitter.on("MouseUp", () => {
      if (this.isBallSelectedForShoot) {
        this.shootIsPossible = true;
        this.shootCommand();
      }
    });

    //Football Dor
    this.game.eventManager.evenetEmitter.on("MouseIsOverDor", () => {
      this.possibleToShowTargets && this.showTargetsOnDor();
      this.possibleToShowTargets = false;
    });

    // Dor Targets
    this.game.dorTargetpoints.eventEmitter.on(
      "SelectetShootTargetByClick",
      () => {
        this.selectBallForShoot();

        setTimeout(() => {
          // this.shoot();
        }, 1000);
      }
    );

    // Ball
    this.game.gameObjects.ball?.eventEmitter.on("IsReadyForShoot", () => {
      this.isBallSelectedForShoot && this.shoot();
    });
  }
}
