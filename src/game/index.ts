import { Application, Container, ContainerChild } from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { Character } from "../gameObjects/character.ts";
import { DorTargetPoints } from "./core/doorTargetPoints.ts";
import { GameManager } from "./core/gameManager.ts";
import { calculatePercentage } from "../helper/index.ts";
import { UI } from "../ui/index.ts";

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
    });
    this.createResources();
    await this.gameResources.startLoadAssets();
  }

  private createResources() {
    this.gameResources = new GameResources();
  }

  private startGame() {
    this.scene.eventMode = "static";

    this.addGameObjects();
    this.addDorTargetPoints();
    this.addCharacter();
    this.addUI();
    this.addGameManager();
  }

  private addGameObjects() {
    this.gameObjects = new GameObjects(this.scene);
  }

  private addDorTargetPoints() {
    this.dorTargetpoints = new DorTargetPoints(
      this.gameObjects.footballDoor!,
      this.scene
    );
  }

  private addGameManager() {
    this.gameManager = new GameManager(this);
  }

  private addCharacter() {
    this.character = new Character(this.scene);
    this.character.x = window.innerWidth / 2;
    this.character.y =
      this.gameObjects.footballDoor!.y +
      calculatePercentage(45, this.gameObjects.footballDoor!.height);
  }

  private addUI() {
    this.ui = new UI(this.scene);
  }
}
