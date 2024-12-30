import { ProgressBar } from "./progressBar";
import { UserInterface } from "./userInterface";
import { Game } from "../game";
import { gameConfig } from "../config/gameConfig";
import { Scene } from "../game/core/scene";
import { getScaleX, getX, getY } from "../config/runtimeHelper";

export class UI {
  progressBar!: ProgressBar;
  userInterface!: UserInterface;

  constructor(public scene: Scene, public game: Game) {
    this.init();
  }

  init() {
    this.addProgressBar();
    // this.addUserInterface();
  }

  addProgressBar() {
    this.progressBar = new ProgressBar(this.game);

    this.progressBar.scale.set(getScaleX(5));

    this.progressBar.x = getX(gameConfig.mobile.ball.shadow.x);
    this.progressBar.y = getY(gameConfig.mobile.progressBar.y);

    this.scene.add(this.progressBar);
  }

  addUserInterface() {
    this.userInterface = new UserInterface(this.game, this.game.canvas.height);
    this.scene.add(this.userInterface);
  }
}
