import { Ball } from "../../gameObjects/ball";
import { FootballDor } from "../../gameObjects/footballDor";

export class EvenetManager {
  isBallClicked = false;

  constructor(public gameObjects: { ball: Ball; footballDor: FootballDor }) {
    this.addListeners();
  }

  addListeners() {
    // Ball
    this.gameObjects.ball.interactive = true;
    this.gameObjects.ball.cursor = "pointer";

    this.gameObjects.ball.on("pointerdown", () => {
      this.gameObjects.ball.selectForShoot();
      document.body.style.cursor = "pointer";
      this.isBallClicked = true;
    });

    addEventListener("mouseup", () => {
      if (this.isBallClicked) {
        this.gameObjects.ball.shoot();
      }
    });

    this.gameObjects.ball.eventEmitter.on("TouchGrid", () => {
      this.gameObjects.footballDor.startGridAnimation();
    });
  }
}
