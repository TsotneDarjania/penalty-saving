import { Container } from "pixi.js";
import { ProgressBar } from "./progressBar";
import { calculatePercentage } from "../helper";
import { UserInterface } from "./userInterface";
import { Game } from "../game";

export class UI {
  progressBar!: ProgressBar;
  userInterface!: UserInterface;

  constructor(public scene: Container, public game: Game) {
    this.init();
  }

  init() {
    this.addProgressBar();
    this.addUserInterface();
  }

  addProgressBar() {
    this.progressBar = new ProgressBar();
    this.progressBar.x = window.innerWidth / 2;
    this.progressBar.y = calculatePercentage(16, window.innerHeight);
    this.scene.addChild(this.progressBar);
  }

  addUserInterface() {
    this.userInterface = new UserInterface(this.game, this.game.canvas.height);
    this.scene.addChild(this.userInterface);
  }
}
