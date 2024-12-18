import { Container } from "pixi.js";
import { FootballDoor } from "../../gameObjects/footballDoor.ts";
import { Ball } from "../../gameObjects/ball/index.ts";
import { gameConfig } from "../../config/gameConfig.ts";
import { calculatePercentage } from "../../helper/index.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDoor: FootballDoor | null = null;

  constructor(public scene: Container<any>) {
    this.addInitialGameObjects();
  }

  private addInitialGameObjects() {
    this.addBall();
    this.addFootballDor();
  }

  private addBall() {
    this.ball = new Ball();
    this.ball.x = window.innerWidth / 2;
    this.ball.y = gameConfig.desktop.ball.positionY;
    this.ball.zIndex = 5;
    this.scene.addChild(this.ball);
  }

  addFootballDor() {
    this.footballDoor = new FootballDoor();
    this.footballDoor.x = window.innerWidth / 2;
    this.footballDoor.y = calculatePercentage(44, window.innerHeight);

    this.scene.addChild(this.footballDoor);
  }
}
