import { Ball } from "../../gameObjects/ball.ts";

export class EvenetManager {
  constructor(public gameObjects: { ball: Ball }) {
    this.addListeners();
  }

  addListeners() {
    // Ball
    this.gameObjects.ball.interactive = true;
    this.gameObjects.ball.cursor = "pointer";

    this.gameObjects.ball.on("pointerdown", () => {
      this.gameObjects.ball.startPrepare();
    });
  }
}
