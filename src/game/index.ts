import { Application, Container, ContainerChild } from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { Character } from "../gameObjects/character.ts";
import { DorTargetPoints } from "./core/doorTargetPoints.ts";
import { GameManager } from "./core/gameManager.ts";
import { UI } from "../ui/index.ts";
import { gameConfig } from "../config/gameConfig.ts";

export class Game extends Application {
  public scene!: Container<ContainerChild>;
  public gameResources!: GameResources;
  public gameObjects!: GameObjects;
  public dorTargetpoints!: DorTargetPoints;
  public gameManager!: GameManager;
  public character!: Character;
  public ui!: UI;

  constructor(public backgroundColor: string, public htmlRootId: string) {
    super();
    this.setup()
      .then(() => {
        document.getElementById(htmlRootId)!.appendChild(this.canvas);
        this.scene = this.stage;

        this.startGame();
        console.log("Game created successfully.");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private async setup() {
    await this.init({
      background: this.backgroundColor,
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      roundPixels: true,
    });
    this.createResources();
    await this.gameResources.startLoadAssets();
  }

  private createResources() {
    this.gameResources = new GameResources();
  }

  private startGame() {
    this.addGameObjects();

    this.addCharacter();
    this.addUI();
    this.addDorTargetPoints();
    this.addGameManager();
  }

  private addGameObjects() {
    this.gameObjects = new GameObjects(this.scene);
  }

  private addDorTargetPoints() {
    this.dorTargetpoints = new DorTargetPoints(
      this.gameObjects.footballDoor!,
      this.scene,
      this.gameObjects
    );
  }

  private addGameManager() {
    this.gameManager = new GameManager(this);
  }

  private addCharacter() {
    this.character = new Character(this.scene);
    this.character.x =
      this.gameObjects.stadiumBck.x -
      this.gameObjects.scaledBackgroundgWidth / 2 +
      gameConfig.mobile.character.x * this.gameObjects.scaledBackgroundgWidth;

    this.character.y =
      this.gameObjects.stadiumBck.y -
      this.gameObjects.scaledBackgroundgHeight / 2 +
      gameConfig.mobile.character.y * this.gameObjects.scaledBackgroundgHeight;

    this.character.spine.scale.set(this.gameObjects.backgroundScale * 2.6);
  }

  private addUI() {
    this.ui = new UI(this.scene, this);
  }
}
