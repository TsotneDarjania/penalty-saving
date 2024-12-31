import { Sprite, textureFrom } from "pixi.js";
import { FootballDoor } from "../../gameObjects/footballDoor.ts";
import { Ball } from "../../gameObjects/ball/index.ts";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";
import { Spectators } from "../../gameObjects/spectators.ts";
import { BallTrail } from "../../gameObjects/ballTrail.ts";
import { Scene } from "./scene.ts";
import {
  getScaleX,
  getX,
  getY,
  setBackground,
  setScene,
} from "../../config/runtimeHelper.ts";

export class GameObjects {
  ball: Ball | null = null;
  footballDoor: FootballDoor | null = null;
  stadiumBck!: Sprite;
  ballTrail!: BallTrail;

  scaledBackgroundgWidth!: number;
  scaledBackgroundgHeight!: number;

  backgroundScale!: number;

  spectators!: Spectators;

  constructor(public scene: Scene) {
    this.addInitialGameObjects();
  }

  private addInitialGameObjects() {
    this.addBackground();
    this.initRuntimeConfig();
    this.addBall();
    this.addFootballDor();
    this.addSpectators();
  }

  addBackground() {
    this.stadiumBck = new Sprite(textureFrom(GameObjectEnums.stadiumBck));
    const scaleX = this.scene.width / this.stadiumBck.width;
    const scaleY = this.scene.height / this.stadiumBck.height;

    let scale_x = Math.max(scaleX, scaleY);
    let scale_y = Math.max(scaleX, scaleY);

    if (this.scene.height > 750) {
      scale_x = Math.min(scaleX, scaleY);
      scale_y = scale_y - 0.035;
    }

    if (this.scene.width >= 912) {
      scale_x = Math.min(scaleX, scaleY);
      scale_y = Math.min(scaleX, scaleY);
    }

    if (
      this.scene.width >= 375 &&
      this.scene.width < 500 &&
      this.scene.height >= 800
    ) {
      console.log(1111);
      scale_x = Math.min(scaleX, scaleY);
      scale_y = Math.max(scaleX, scaleY);
    }

    this.stadiumBck.anchor.set(0.5);
    this.stadiumBck.zIndex = -1;
    this.stadiumBck.x = this.scene.width / 2;
    this.stadiumBck.y = this.scene.height / 2;
    this.stadiumBck.scale.set(scale_x, scale_y);

    this.scene.add(this.stadiumBck);

    const sky = new Sprite(textureFrom(GameObjectEnums.stadiumBck2));

    sky.x = window.innerWidth / 2;
    sky.y = window.innerHeight / 2;
    sky.scale.set(scale_x, scale_y);
    sky.anchor.set(0.5);
    sky.zIndex = -3;

    this.scene.add(sky);
  }

  private initRuntimeConfig() {
    setBackground(this.stadiumBck);
    setScene(this.scene);
  }

  private addBall() {
    this.ball = new Ball(getX(0.5), getY(0.85), getScaleX(7.5));
    this.scene.add(this.ball);

    this.ball.zIndex = 5;
  }

  addFootballDor() {
    this.footballDoor = new FootballDoor();

    this.footballDoor.x = getX(0.5);
    this.footballDoor.y = getY(0.41);

    if (
      this.scene.width >= 375 &&
      this.scene.width < 500 &&
      this.scene.height >= 800
    ) {
      this.footballDoor.y = getY(0.435);
    }

    this.footballDoor.scale.x = getScaleX(5.4);
    this.footballDoor.scale.y = getScaleX(5.4);
    this.scene.add(this.footballDoor);
  }

  private addSpectators() {
    this.spectators = new Spectators(this.scene);
  }
}
