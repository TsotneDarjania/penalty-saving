import { Container } from "pixi.js";
import { FootballDor } from "../../gameObjects/footballDor.ts";
import { Ball } from "../../gameObjects/ball/index.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDor: FootballDor | null = null;

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
    this.ball.y = window.innerHeight - 120;
    this.ball.zIndex = 5;
    this.scene.addChild(this.ball);
  }

  addFootballDor() {
    this.footballDor = new FootballDor();
    this.footballDor.x = window.innerWidth / 2;
    this.footballDor.y = 340;

    this.scene.addChild(this.footballDor);
  }
}
