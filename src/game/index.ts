import { Application, Container, ContainerChild, Texture } from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { RopeEffect } from "../gameObjects/ropeEffect.ts";
import { Character } from "../gameObjects/character.ts";
import { GameObjectEnums } from "../enums/gameObjectEnums.ts";
import { DorTargetPoints } from "./core/doorTargetPoints.ts";
import { GameManager } from "./core/gameManager.ts";

export class Game extends Application {
  public scene!: Container<ContainerChild>;
  public gameResources!: GameResources;
  public gameObjects!: GameObjects;
  public dorTargetpoints!: DorTargetPoints;
  public gameManager!: GameManager;
  public character!: Character;

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
    this.addGameObjects();
    this.addDorTargetPoints();

    // const ropeEffect = new RopeEffect(
    //   Texture.from(GameObjectEnums.circle),
    //   this,
    //   true
    // );

    const ballRopeEffect = new RopeEffect(
      Texture.from(GameObjectEnums.ballRopeEffect),
      this,
      false,
      this.gameObjects.ball!
    );

    this.gameObjects.ball!.setRopeEffect = ballRopeEffect;

    // ballRopeEffect.effectOnn();

    // ropeEffect.effectOnn();

    this.addCharacter();
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
    this.character.y = 520;
  }
}
