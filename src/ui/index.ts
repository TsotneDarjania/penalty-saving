import { Container } from "pixi.js";
import { ProgressBar } from "./progressBar";
import { calculatePercentage } from "../helper";

export class UI {
  progressBar!: ProgressBar;
  constructor(public scene: Container) {
    this.init();
  }

  init() {
    this.addProgressBar();
  }

  addProgressBar() {
    this.progressBar = new ProgressBar();
    this.progressBar.x = window.innerWidth / 2;
    this.progressBar.y = calculatePercentage(20, window.innerHeight);
    this.scene.addChild(this.progressBar);
  }
}
