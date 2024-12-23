import { Container } from "pixi.js";
import { ProgressBar } from "./progressBar";
import { UserInterface } from "./userInterface";
import { Game } from "../game";
import { gameConfig } from "../config/gameConfig";

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
    this.progressBar = new ProgressBar(this.game);

    this.progressBar.scale.set(this.game.gameObjects.backgroundScale * 5);

    this.progressBar.x =
      this.game.gameObjects.stadiumBck.x -
      this.game.gameObjects.scaledBackgroundgWidth / 2 +
      gameConfig.mobile.ball.shadow.x *
        this.game.gameObjects.scaledBackgroundgWidth;

    this.progressBar.y =
      this.game.gameObjects.stadiumBck.y -
      this.game.gameObjects.scaledBackgroundgHeight / 2 +
      gameConfig.mobile.progressBar.y *
        this.game.gameObjects.scaledBackgroundgHeight;

    this.scene.addChild(this.progressBar);
  }

  addUserInterface() {
    this.userInterface = new UserInterface(this.game, this.game.canvas.height);
    this.scene.addChild(this.userInterface);
  }
}
