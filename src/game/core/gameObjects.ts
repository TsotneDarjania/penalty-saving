import { assetsType } from "../../types/gameTypes.ts";
import { Container, Sprite } from "pixi.js";
import { Ball } from "../../gameObjects/ball.ts";
import { FootballDor } from "../../gameObjects/footballDor.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDor: Sprite | null = null;

  constructor(public assets: assetsType, public scene: Container<any>) {
    this.addInitialGameObjects();
  }

  private addInitialGameObjects() {
    this.addBall();
    this.addFootballDor();
  }

  private addBall() {
    this.ball = new Ball(this.assets.ballTexture!, this.assets.circleBorder!);
    this.ball.x = window.innerWidth / 2;
    this.ball.y = window.innerHeight - 120;
    this.ball.zIndex = 5;
    this.scene.addChild(this.ball);
  }

  addFootballDor() {
    this.footballDor = new FootballDor(this.assets.footballDor!);
    this.footballDor.x = window.innerWidth / 2;
    this.footballDor.y = 340;

    this.scene.addChild(this.footballDor);
  }
}
