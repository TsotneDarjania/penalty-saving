import { Texture, Assets, AssetsClass } from "pixi.js";
import { assetsType } from "../../types/gameTypes.ts";

export class GameResources extends AssetsClass {
  assets: assetsType = {
    ball: null,
    footballDor: null,
    circle: null,
    ballTexture: null,
    circleBorder: null,
  };

  constructor() {
    super();
  }

  public async startLoadAssets() {
    this.assets.ball = (await Assets.load("../assets/ball.webp")) as Texture;
    this.assets.footballDor = (await Assets.load(
      "../assets/football-dor.png"
    )) as Texture;
    this.assets.circle = (await Assets.load("../assets/circle.png")) as Texture;
    this.assets.ballTexture = (await Assets.load(
      "../assets/ball-texture.png"
    )) as Texture;
    this.assets.circleBorder = (await Assets.load(
      "../assets/circle-border.png"
    )) as Texture;

    await Assets.load("https://pixijs.com/assets/flowerTop.png");
  }
}
