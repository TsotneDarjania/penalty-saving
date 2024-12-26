import { Container, Sprite, textureFrom } from "pixi.js";
import { FootballDoor } from "../../gameObjects/footballDoor.ts";
import { Ball } from "../../gameObjects/ball/index.ts";
import { gameConfig } from "../../config/gameConfig.ts";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";
import { Spectators } from "../../gameObjects/spectators.ts";
import { BallTrail } from "../../gameObjects/ballTrail.ts";
import { Game } from "../index.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDoor: FootballDoor | null = null;
  stadiumBck!: Sprite;
  ballTrail!: BallTrail;

  scaledBackgroundgWidth!: number;
  scaledBackgroundgHeight!: number;

  backgroundScale!: number;

  spectators!: Spectators;

  constructor(public scene: Container, public game: Game) {
    this.addInitialGameObjects();
  }

  private addInitialGameObjects() {
    this.addBackground();
    this.addBall();
    this.addFootballDor();
    this.addSpectators();
    this.addBallTrailEffect();
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

    const stadiumBck_2 = new Sprite(textureFrom(GameObjectEnums.stadiumBck2));

    stadiumBck_2.x = window.innerWidth / 2;
    stadiumBck_2.y = window.innerHeight / 2;
    stadiumBck_2.scale.set(this.backgroundScale);
    stadiumBck_2.anchor.set(0.5);
    stadiumBck_2.zIndex = -3;

    this.scene.addChild(stadiumBck_2);
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

    this.ball = new Ball(
      ballInitPositionX,
      ballInitPositionY,
      this.scene,
      this.backgroundScale,
      this
    );

    this.ball.x = ballInitPositionX;
    this.ball.y = ballInitPositionY;

    this.ball.ballGraphic.shadow.x = ballShadowPositionX;
    this.ball.ballGraphic.shadow.y = ballShadowPositionY;
    this.ball.ballGraphic.sahdowInitialPositionX = ballShadowPositionX;
    this.ball.ballGraphic.sahdowInitialPositionY = ballShadowPositionY;

    this.ball.scale.set(this.backgroundScale * 7.5);
    this.ball.ballGraphic.shadow.scale.set(this.backgroundScale * 1.25);
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

  private addSpectators() {
    this.spectators = new Spectators(
      this.scene,
      this.scaledBackgroundgWidth,
      this.scaledBackgroundgHeight,
      this.backgroundScale,
      this.stadiumBck
    );
  }

  private addBallTrailEffect() {
    this.ballTrail = new BallTrail(this.scene, this.game);
  }
}
