import { Assets, AssetsClass } from "pixi.js";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";

export class GameResources extends AssetsClass {
  constructor() {
    super();
  }

  public async startLoadAssets() {
    // this.assets.ball = (await Assets.load("../assets/ball.webp")) as Texture;
    // this.assets.footballDor = (await Assets.load(
    //   "../assets/football-dor.png"
    // )) as Texture;
    // this.assets.circle = (await Assets.load("../assets/circle.png")) as Texture;
    // this.assets.ballTexture = (await Assets.load(
    //   "../assets/ball-texture.png"
    // )) as Texture;
    // this.assets.circleBorder = (await Assets.load(
    //   "../assets/circle-border.png"
    // )) as Texture;

    await Assets.load([
      {
        alias: "spineSkeleton",
        src: "../assets/animation/character/Personality.json",
      },
      {
        alias: "spineAtlas",
        src: "../assets/animation/character/Personality.atlas",
      },
      // Football Dor
      {
        alias: GameObjectEnums.footballDor,
        src: "../assets/image/football-dor.png",
      },
      // Football Dor Base Grid
      {
        alias: GameObjectEnums.footballDorBaseGrid,
        src: "../assets/image/football-dor-base-grid.png",
      },
      // Football Dor Left Grid
      {
        alias: GameObjectEnums.footballDorLeftGrid,
        src: "../assets/image/football-dor-left-grid.png",
      },
      // Football Dor Top Grid
      {
        alias: GameObjectEnums.footballDorTopGrid,
        src: "../assets/image/football-dor-top-grid.png",
      },
      //Ball Texture
      {
        alias: GameObjectEnums.ballTexture,
        src: "../assets/image/ball-texture.png",
      },
      // Circle
      {
        alias: GameObjectEnums.circle,
        src: "../assets/image/circle.png",
      },
      // Circle Border
      {
        alias: GameObjectEnums.circleBorder,
        src: "../assets/image/circle-border.png",
      },
      // BallRopeEffect
      {
        alias: GameObjectEnums.ballRopeEffect,
        src: "../assets/image/ball-rope-effect.png",
      },
      // Target
      {
        alias: GameObjectEnums.target,
        src: "../assets/image/target.png",
      },
    ]);
  }
}
