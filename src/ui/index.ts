import { Container } from "pixi.js";
import { ProgressBar } from "./progressBar";
import { calculatePercentage } from "../helper";
import { UserInterface } from "./userInterface";

export class UI {
  progressBar!: ProgressBar;
  userInterface!: UserInterface;

  constructor(public scene: Container) {
    this.init();
  }

  init() {
    this.addProgressBar();
    this.addUserInterface();
  }

  addProgressBar() {
    this.progressBar = new ProgressBar();
    this.progressBar.x = window.innerWidth / 2;
    this.progressBar.y = calculatePercentage(20, window.innerHeight);
    this.scene.addChild(this.progressBar);
  }

  addUserInterface() {
    this.userInterface = new UserInterface();
    this.scene.addChild(this.userInterface);
  }
}
