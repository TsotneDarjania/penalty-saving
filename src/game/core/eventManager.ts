import { EventEmitter } from "pixi.js";
import { Ball } from "../../gameObjects/ball";
import { FootballDor } from "../../gameObjects/footballDor";

export class EvenetManager {
  evenetEmitter!: EventEmitter;

  constructor(public gameObjects: { ball: Ball; footballDor: FootballDor }) {
    this.addListeners();
    this.addEvenetEmitter();
  }

  addEvenetEmitter() {
    this.evenetEmitter = new EventEmitter();
  }

  addListeners() {
    // Ball
    this.gameObjects.ball.interactive = true;
    this.gameObjects.ball.cursor = "pointer";
    this.gameObjects.ball.on("pointerdown", () => {
      this.evenetEmitter.emit("SelectBallForShoot");
    });

    addEventListener("mouseup", () => {
      this.evenetEmitter.emit("MouseUp");
    });

    this.gameObjects.ball.eventEmitter.on("TouchGrid", () => {
      // this.gameObjects.footballDor.startGridAnimation();
    });

    // Dor
    this.gameObjects.footballDor.dor.interactive = true;
    this.gameObjects.footballDor.dor.on("mouseover", () => {
      this.evenetEmitter.emit("MouseIsOverDor");
    });
  }
}
