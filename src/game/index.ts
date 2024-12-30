import { Application, Graphics, Sprite, Texture } from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { Character } from "../gameObjects/character.ts";
import { DorTargetPoints } from "./core/doorTargetPoints.ts";
import { GameManager } from "./core/gameManager.ts";
import { UI } from "../ui/index.ts";
import { Scene } from "./core/scene.ts";
import {
  getScaleX,
  getX,
  getY,
  setBallTrail,
} from "../config/runtimeHelper.ts";
import { BallTrail } from "../gameObjects/ballTrail.ts";
import { GameObjectEnums } from "../enums/gameObjectEnums.ts";
import gsap from "gsap";

export class Game extends Application {
  public scene!: Scene;
  public gameResources!: GameResources;
  public gameObjects!: GameObjects;
  public dorTargetpoints!: DorTargetPoints;
  public gameManager!: GameManager;
  public character!: Character;
  public ui!: UI;
  public ballTrail!: BallTrail;

  constructor(public backgroundColor: string, public htmlRootId: string) {
    super();
    this.setup()
      .then(() => {
        document.getElementById(htmlRootId)!.appendChild(this.canvas);
        this.scene = new Scene(this.stage);

        this.scene.width = Number(this.canvas.style.width.replace("px", ""));
        this.scene.height = Number(this.canvas.style.height.replace("px", ""));

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
    this.addClouds();
    this.addBallTrailEffect();
    this.addCharacter();
    this.addUI();
    this.addDorTargetPoints();
    this.addGameManager();

    const mainMask = new Graphics()
      .rect(
        this.gameObjects.stadiumBck.x - this.gameObjects.stadiumBck.width / 2,
        0,
        this.gameObjects.stadiumBck.width,
        this.gameObjects.stadiumBck.height
      )
      .fill();

    this.scene.mainContainer.mask = mainMask;
  }

  private addBallTrailEffect() {
    this.ballTrail = new BallTrail(this.scene, this);
    setBallTrail(this.ballTrail);
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
    this.character = new Character(this.scene, getX(0.5), getY(0.54));
  }

  private addUI() {
    this.ui = new UI(this.scene, this);
  }

  private addClouds() {
    const cloudLeft = new Sprite(Texture.from(GameObjectEnums.cloud));
    cloudLeft.anchor = 0.5;
    cloudLeft.x = getX(0);
    cloudLeft.y = getY(0.1);
    cloudLeft.scale = getScaleX(1);

    cloudLeft.zIndex = 10;

    gsap.to(cloudLeft.scale, {
      duration: 400,
      x: getScaleX(2),
      y: getScaleX(2),
      yoyo: true,
      repeat: -1,
      ease: "none",
    });
    gsap.to(cloudLeft, {
      duration: 400,
      x: getX(0.2),
      y: getY(0.2),
      yoyo: true,
      repeat: -1,
      ease: "none",
    });

    this.scene.add(cloudLeft);
  }
}
