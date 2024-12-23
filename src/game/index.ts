import {
  Application,
  Container,
  ContainerChild,
  Sprite,
  textureFrom,
} from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { Character } from "../gameObjects/character.ts";
import { DorTargetPoints } from "./core/doorTargetPoints.ts";
import { GameManager } from "./core/gameManager.ts";
import { calculatePercentage } from "../helper/index.ts";
import { UI } from "../ui/index.ts";
import { GameObjectEnums } from "../enums/gameObjectEnums.ts";

export class Game extends Application {
  public scene!: Container<ContainerChild>;
  public gameResources!: GameResources;
  public gameObjects!: GameObjects;
  public dorTargetpoints!: DorTargetPoints;
  public gameManager!: GameManager;
  public character!: Character;
  public ui!: UI;

  stadiumBck!: Sprite;

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

    this.addCharacter();
    this.addUI();
    this.addDorTargetPoints();
    this.addGameManager();
  }

  private addGameObjects() {
    this.gameObjects = new GameObjects(this.scene, this.canvas.height);
  }

  private addDorTargetPoints() {
    this.dorTargetpoints = new DorTargetPoints(
      this.gameObjects.footballDoor!,
      this.scene,
      this.stadiumBck
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
    this.ui = new UI(this.scene, this);

    this.stadiumBck = new Sprite(textureFrom(GameObjectEnums.stadiumBck));

    // Calculate scaling factors for the background
    const scaleX = window.innerWidth / this.stadiumBck.width;
    const scaleY = window.innerHeight / this.stadiumBck.height;
    const scale = Math.max(scaleX, scaleY);

    // Set properties for the background
    this.stadiumBck.anchor.set(0.5); // Center the anchor
    this.stadiumBck.x = window.innerWidth / 2;
    this.stadiumBck.y = window.innerHeight / 2;
    this.stadiumBck.scale.set(scale);
    this.stadiumBck.zIndex = -1;

    // Add the background to the scene
    this.scene.addChild(this.stadiumBck);

    // Calculate the scaled dimensions of the background
    const scaledBgWidth =
      this.stadiumBck.texture.width * this.stadiumBck.scale.x;
    const scaledBgHeight =
      this.stadiumBck.texture.height * this.stadiumBck.scale.y;

    // Ball positioning relative to the background
    const ballRelativeX = 0.5; // 50% of the background width
    const ballRelativeY = 0.86; // 90% of the background height (close to the bottom)

    const footballDoorRelativeX = 0.5;
    const footballDoorRelativeY = 0.41;

    // Set the ball's position relative to the scaled background
    this.gameObjects.footballDoor!.x =
      this.stadiumBck.x -
      scaledBgWidth / 2 +
      footballDoorRelativeX * scaledBgWidth;
    this.gameObjects.footballDoor!.y =
      this.stadiumBck.y -
      scaledBgHeight / 2 +
      footballDoorRelativeY * scaledBgHeight;

    // Set the ball's position relative to the scaled background
    this.gameObjects.ball!.x =
      this.stadiumBck.x - scaledBgWidth / 2 + ballRelativeX * scaledBgWidth;
    this.gameObjects.ball!.y =
      this.stadiumBck.y - scaledBgHeight / 2 + ballRelativeY * scaledBgHeight;

    this.character.x =
      this.stadiumBck.x - scaledBgWidth / 2 + 0.5 * scaledBgWidth;
    this.character.y =
      this.stadiumBck.y - scaledBgHeight / 2 + 0.54 * scaledBgHeight;

    // Scale the ball relative to the background
    this.gameObjects.ball!.scale.set(scale * 6);
    this.gameObjects.footballDoor!.scale.set(scale * 5.4);
    this.character.spine.scale.set(scale * 2.6);
  }
}
