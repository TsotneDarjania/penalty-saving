import { Game } from "..";
import { getResult } from "../../api";
import { GameEventEnums } from "../../enums/gameEvenetEnums";
import { createKey, getRandomIntInRange } from "../../helper";

export class GameManager {
  isShootCommand = false;
  isBallSelected = false;
  firstTimeSelectBall = true;

  userSelectedPoint!: [number, number];

  result!: {
    goalKeeperJumpPoint: [number, number];
    win: boolean;
    bonusFactor: number;
  };

  constructor(public game: Game) {
    this.listenUserEvents();
  }

  shoot(point: [number, number]) {
    this.game.dorTargetpoints.lightoffTargets();
    let targetKey = createKey(point);

    const x = this.game.dorTargetpoints.points.get(targetKey)!.x;
    const y = this.game.dorTargetpoints.points.get(targetKey)!.y;

    this.game.gameObjects.ball!.shoot({
      x,
      y,
    });
  }

  selectBallForShoot() {
    if (this.isBallSelected) return;
    this.isBallSelected = true;

    this.firstTimeSelectBall && this.game.dorTargetpoints.lightOnnTargets();
    this.firstTimeSelectBall = false;

    this.game.gameObjects.ball!.selectForShoot();
  }

  reset() {
    setTimeout(() => {
      this.game.gameObjects.footballDoor!.playIdleAnimation();

      this.game.character.reset();
      this.game.gameObjects.ball!.reset();

      this.isShootCommand = false;
      this.isBallSelected = false;
    }, 500);
  }

  async shootCommand() {
    if (this.isShootCommand) return;
    this.isShootCommand = true;

    this.userSelectedPoint = this.game.dorTargetpoints.selectedPoint
      ? (this.game.dorTargetpoints.selectedPoint!.split(",").map(Number) as [
          number,
          number
        ])
      : ([getRandomIntInRange(0, 2), getRandomIntInRange(0, 2)] as [
          number,
          number
        ]);

    this.result = await getResult(this.userSelectedPoint);
    // get ball falling path
    this.game.gameObjects.ball!.ballFallinDownRawPathData = {
      path: !this.result.win
        ? this.game.dorTargetpoints.points.get(
            createKey(this.result.goalKeeperJumpPoint)
          )!.ball.isSave.fallingDawnPath
        : this.game.dorTargetpoints.points.get(
            createKey(this.userSelectedPoint)
          )!.ball.isNotSave.fallingDawnPath,
      offsetX: !this.result.win
        ? this.game.dorTargetpoints.points.get(
            createKey(this.result.goalKeeperJumpPoint)
          )!.ball.fallingDawnPathData.offsetX
        : this.game.dorTargetpoints.points.get(
            createKey(this.userSelectedPoint)
          )!.ball.fallingDawnPathData.offsetX,
      offsetY: !this.result.win
        ? this.game.dorTargetpoints.points.get(
            createKey(this.result.goalKeeperJumpPoint)
          )!.ball.fallingDawnPathData.offsetY
        : this.game.dorTargetpoints.points.get(
            createKey(this.userSelectedPoint)
          )!.ball.fallingDawnPathData.offsetY,
    };

    !this.result.win
      ? (this.game.gameObjects.ball!.isGoal = false)
      : (this.game.gameObjects.ball!.isGoal = true);

    this.result.win
      ? this.game.dorTargetpoints.points.get(
          createKey(this.result.goalKeeperJumpPoint)
        )!.ball.isSave.fallingDawnPath
      : this.game.dorTargetpoints.points.get(createKey(this.userSelectedPoint))!
          .ball.isNotSave.fallingDawnPath;

    this.shoot(this.userSelectedPoint);
  }

  listenUserEvents() {
    // Selecting Ball
    this.game.gameObjects.ball!.interactive = true;
    this.game.gameObjects.ball!.cursor = "pointer";
    this.game.gameObjects.ball!.on("pointerdown", () => {
      this.selectBallForShoot();
    });

    // Mouse Over Door
    this.game.gameObjects.footballDoor!.interactive = true;
    this.game.gameObjects.footballDoor!.on("pointerover", () => {
      this.firstTimeSelectBall && this.game.dorTargetpoints.lightOnnTargets();
      this.firstTimeSelectBall = false;
    });

    //MouseUp
    addEventListener("pointerup", () => {
      if (this.isBallSelected && !this.isShootCommand) {
        this.shootCommand();
      }
    });

    // Select Shoot By Target Click
    this.game.dorTargetpoints.eventEmitter.on(
      GameEventEnums.selectedShootByTargetClick,
      () => {
        this.selectBallForShoot();
        this.shootCommand();
      }
    );

    // Select Shoot By Click on Door
    this.game.dorTargetpoints.eventEmitter.on(
      GameEventEnums.selectedShootByDoorClick,
      () => {
        this.selectBallForShoot();
        this.shootCommand();
      }
    );

    this.game.gameObjects.ball!.eventEmitter.on(
      GameEventEnums.isTimeToJumpGoalKeeper,
      () => {
        this.jumpGoalKeeper(this.result.goalKeeperJumpPoint);
      }
    );

    this.game.gameObjects.ball!.eventEmitter.on(
      GameEventEnums.finishFallingOfBall,
      () => {
        this.reset();
      }
    );

    // Finish Shoot
    this.game.gameObjects.ball!.eventEmitter.on(
      GameEventEnums.ballTouchGoalKeeperOrGrid,
      () => {
        this.result.win &&
          this.game.gameObjects.footballDoor?.playGridAnimation(
            this.userSelectedPoint
          );

        if (this.result.win) {
          this.game.ui.progressBar.makeFillAniamtion(
            (this.result.bonusFactor - 1) as 0 | 1 | 2 | 3 | 4
          );
        } else {
          this.game.ui.progressBar.reset();
        }
      }
    );
  }

  jumpGoalKeeper(point: [number, number]) {
    const jumpData = this.game.dorTargetpoints.points.get(
      createKey(point)
    )?.goalKeeperJumpData;

    this.game.character.jump(jumpData!.direction, jumpData!.height);
  }
}
