import { Container, Sprite, textureFrom } from "pixi.js";
import { FootballDoor } from "../../gameObjects/footballDoor.ts";
import { Ball } from "../../gameObjects/ball/index.ts";
import { gameConfig } from "../../config/gameConfig.ts";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDoor: FootballDoor | null = null;
  stadiumBck!: Sprite;

  scaledBackgroundgWidth!: number;
  scaledBackgroundgHeight!: number;

  backgroundScale!: number;

  constructor(public scene: Container) {
    this.addInitialGameObjects();
  }

  private addInitialGameObjects() {
    this.addBackground();
    this.addBall();
    this.addFootballDor();
  }

  addBackground() {
    this.stadiumBck = new Sprite(textureFrom(GameObjectEnums.stadiumBck));
    const scaleX = window.innerWidth / this.stadiumBck.width;
    const scaleY = window.innerHeight / this.stadiumBck.height;
    this.backgroundScale = Math.max(scaleX, scaleY);

    this.stadiumBck.x = window.innerWidth / 2;
    this.stadiumBck.y = window.innerHeight / 2;
    this.stadiumBck.scale.set(this.backgroundScale);
    this.stadiumBck.anchor.set(0.5);
    this.stadiumBck.zIndex = -1;

    this.scaledBackgroundgWidth =
      this.stadiumBck.texture.width * this.stadiumBck.scale.x;
    this.scaledBackgroundgHeight =
      this.stadiumBck.texture.height * this.stadiumBck.scale.y;

    this.scene.addChild(this.stadiumBck);
  }

  private addBall() {
    const ballInitPositionX =
      this.stadiumBck.x -
      this.scaledBackgroundgWidth / 2 +
      gameConfig.mobile.ball.x * this.scaledBackgroundgWidth;

    const ballInitPositionY =
      this.stadiumBck.y -
      this.scaledBackgroundgHeight / 2 +
      gameConfig.mobile.ball.y * this.scaledBackgroundgHeight;

    const ballShadowPositionX =
      this.stadiumBck.x -
      this.scaledBackgroundgWidth / 2 +
      gameConfig.mobile.ball.shadow.x * this.scaledBackgroundgWidth;

    const ballShadowPositionY =
      this.stadiumBck.y -
      this.scaledBackgroundgHeight / 2 +
      gameConfig.mobile.ball.shadow.y * this.scaledBackgroundgHeight;

    this.ball = new Ball(ballInitPositionX, ballInitPositionY, this.scene);

    this.ball.x = ballInitPositionX;
    this.ball.y = ballInitPositionY;

    this.ball.ballGraphic.shadow.x = ballShadowPositionX;
    this.ball.ballGraphic.shadow.y = ballShadowPositionY;

    this.ball.scale.set(this.backgroundScale * 6);
    this.ball.ballGraphic.shadow.scale.set(this.backgroundScale * 1.15);
    this.ball.ballGraphic.shadowInitScaleX =
      this.ball.ballGraphic.shadow.scale.x;
    this.ball.ballGraphic.shadowInitScaleY =
      this.ball.ballGraphic.shadow.scale.y;
    this.ball.zIndex = 5;
    this.scene.addChild(this.ball);
  }

  addFootballDor() {
    this.footballDoor = new FootballDoor();

    this.footballDoor!.x =
      this.stadiumBck.x -
      this.scaledBackgroundgWidth / 2 +
      gameConfig.mobile.footballDoor.x * this.scaledBackgroundgWidth;
    this.footballDoor!.y =
      this.stadiumBck.y -
      this.scaledBackgroundgHeight / 2 +
      gameConfig.mobile.footballDoor.y * this.scaledBackgroundgHeight;

    this.footballDoor!.scale.set(this.backgroundScale * 5.4);
    this.scene.addChild(this.footballDoor);
  }
}
