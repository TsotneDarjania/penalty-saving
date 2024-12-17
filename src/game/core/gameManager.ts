import { Game } from "..";
import { createKey, getRandomIntInRange } from "../../helper";

export class GameManager {
  isBallSelectedForShoot = false;
  shootIsPossible = false;
  shootCommandIsPossible = true;

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
    if (!this.shootCommandIsPossible) return;
    this.shootCommandIsPossible = false;
    this.shoot();
  }

  selectBallForShoot() {
    if (!this.shootCommandIsPossible) return;

    this.possibleToShowTargets && this.showTargetsOnDor();
    this.possibleToShowTargets = false;

    this.isBallSelectedForShoot = true;
    this.game.gameObjects.ball!.selectForShoot();

    // document.body.style.cursor = "pointer";
  }

  showTargetsOnDor() {
    this.game.dorTargetpoints.lightOnnTargets();
  }

  getResult(){

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
        this.game.dorTargetpoints.isSelectPossible = false;
        this.selectBallForShoot();
      }
    );

    // Ball
    this.game.gameObjects.ball?.eventEmitter.on("IsReadyForShoot", () => {
      this.isBallSelectedForShoot && this.shoot();
    });
    this.game.gameObjects.ball?.eventEmitter.on("Shoot", () => {
      setTimeout(() => {
        const randomDirection =
          getRandomIntInRange(0, 1) === 0 ? "left" : "right";
        const randomheight = getRandomIntInRange(0, 2) as 0 | 1 | 2;
        const side = getRandomIntInRange(0, 1) ? true : false;

        this.game.character.jump(randomDirection, randomheight, side);
      }, 200);
      this.shootIsPossible = false;
    });
  }

  jumpGoalKeeper(){
    
  }
}
