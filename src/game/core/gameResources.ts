import { Assets, AssetsClass } from "pixi.js";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";

export class GameResources extends AssetsClass {
  constructor() {
    super();
  }

  public async startLoadAssets() {
    await Assets.load([
      // Character
      {
        alias: "spineSkeleton",
        src: "../assets/animation/character/Personality.json",
      },
      {
        alias: "spineAtlas",
        src: "../assets/animation/character/Personality.atlas",
      },
      //Football Door Animation
      {
        alias: "FootballDoorSkeleton",
        src: "../assets/animation/footballDoor/Football_Door.json",
      },
      {
        alias: "FootballDoorAtlas",
        src: "../assets/animation/footballDoor/Football_Door.atlas",
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
      //Ball Static
      {
        alias: GameObjectEnums.staticBall,
        src: "../assets/image/static-ball.png",
      },
      //Ball Shadow
      {
        alias: GameObjectEnums.ballShadow,
        src: "../assets/image/ball-shadow.png",
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
        src: "../assets/image/target.svg",
      },
      // Progress Gray
      {
        alias: GameObjectEnums.progressGray,
        src: "../assets/image/progress-grey.png",
      },
      // Progress Green
      {
        alias: GameObjectEnums.progressGreen,
        src: "../assets/image/progress-green.png",
      },
      // Star 1
      {
        alias: GameObjectEnums.star_1,
        src: "../assets/image/star-1.svg",
      },
      // Star 2
      {
        alias: GameObjectEnums.star_2,
        src: "../assets/image/star-2.svg",
      },
      // Star 3
      {
        alias: GameObjectEnums.star_3,
        src: "../assets/image/star-3.svg",
      },
      // Star 4
      {
        alias: GameObjectEnums.star_4,
        src: "../assets/image/star-4.svg",
      },
      // Star 5
      {
        alias: GameObjectEnums.star_5,
        src: "../assets/image/star-5.svg",
      },
      // menu
      {
        alias: GameObjectEnums.menu,
        src: "../assets/image/menu.svg",
      },
      // arrow
      {
        alias: GameObjectEnums.arrow,
        src: "../assets/image/arrow.svg",
      },
      // lighting
      {
        alias: GameObjectEnums.lighting,
        src: "../assets/image/lighting.svg",
      },
      // coin
      {
        alias: GameObjectEnums.coin,
        src: "../assets/image/coin.svg",
      },
      // stadium background
      {
        alias: GameObjectEnums.stadiumBck,
        src: "../assets/image/stadium-bck.png",
      },
      // win circle
      {
        alias: GameObjectEnums.winCircle,
        src: "../assets/image/win-circle.svg",
      },
      // lose circle
      {
        alias: GameObjectEnums.loseCircle,
        src: "../assets/image/lose-circle.svg",
      },
      // StadiumBck 2
      {
        alias: GameObjectEnums.stadiumBck2,
        src: "../assets/image/stadium-bck-2.png",
      },
    ]);

    const fontFace = new FontFace(
      "CustomFont1",
      "url('../assets/custom-font.otf')"
    );
    await fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      console.log("Custom font registered!");
    });
  }
}
