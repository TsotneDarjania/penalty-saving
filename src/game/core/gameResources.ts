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
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: "spineAtlas",
        src: "../assets/animation/character/Personality.atlas",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      //Football Door Animation
      {
        alias: "FootballDoorSkeleton",
        src: "../assets/animation/footballDoor/Football_Door.json",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: "FootballDoorAtlas",
        src: "../assets/animation/footballDoor/Football_Door.atlas",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Football Dor
      {
        alias: GameObjectEnums.footballDor,
        src: "../assets/image/football-dor.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Football Dor Base Grid
      {
        alias: GameObjectEnums.footballDorBaseGrid,
        src: "../assets/image/football-dor-base-grid.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Football Dor Left Grid
      {
        alias: GameObjectEnums.footballDorLeftGrid,
        src: "../assets/image/football-dor-left-grid.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Football Dor Top Grid
      {
        alias: GameObjectEnums.footballDorTopGrid,
        src: "../assets/image/football-dor-top-grid.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      //Ball Texture
      {
        alias: GameObjectEnums.ballTexture,
        src: "../assets/image/ball-texture.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      //Ball Static
      {
        alias: GameObjectEnums.staticBall,
        src: "../assets/image/static-ball.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      //Ball Shadow
      {
        alias: GameObjectEnums.ballShadow,
        src: "../assets/image/ball-shadow.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Circle
      {
        alias: GameObjectEnums.circle,
        src: "../assets/image/circle.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Circle Border
      {
        alias: GameObjectEnums.circleBorder,
        src: "../assets/image/circle-border.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // BallRopeEffect
      {
        alias: GameObjectEnums.ballRopeEffect,
        src: "../assets/image/ball-rope-effect.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Target
      {
        alias: GameObjectEnums.target,
        src: "../assets/image/target.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Progress Gray
      {
        alias: GameObjectEnums.progressGray,
        src: "../assets/image/progress-grey.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Progress Green
      {
        alias: GameObjectEnums.progressGreen,
        src: "../assets/image/progress-green.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Star 1
      {
        alias: GameObjectEnums.star_1,
        src: "../assets/image/star-1.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Star 2
      {
        alias: GameObjectEnums.star_2,
        src: "../assets/image/star-2.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Star 3
      {
        alias: GameObjectEnums.star_3,
        src: "../assets/image/star-3.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Star 4
      {
        alias: GameObjectEnums.star_4,
        src: "../assets/image/star-4.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Star 5
      {
        alias: GameObjectEnums.star_5,
        src: "../assets/image/star-5.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // menu
      {
        alias: GameObjectEnums.menu,
        src: "../assets/image/menu.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // arrow
      {
        alias: GameObjectEnums.arrow,
        src: "../assets/image/arrow.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // lighting
      {
        alias: GameObjectEnums.lighting,
        src: "../assets/image/lighting.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // coin
      {
        alias: GameObjectEnums.coin,
        src: "../assets/image/coin.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // stadium background
      {
        alias: GameObjectEnums.stadiumBck,
        src: "../assets/image/stadium-bck.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // win circle
      {
        alias: GameObjectEnums.winCircle,
        src: "../assets/image/win-circle.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // lose circle
      {
        alias: GameObjectEnums.loseCircle,
        src: "../assets/image/lose-circle.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // StadiumBck 2
      {
        alias: GameObjectEnums.stadiumBck2,
        src: "../assets/image/stadium-bck-2.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // ball selector
      {
        alias: GameObjectEnums.greenShadowCircle,
        src: "../assets/image/green-shadow-circle.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // ball circle arrows
      {
        alias: GameObjectEnums.ballCircleArrows,
        src: "../assets/image/ball-circle-arrows.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // spectator
      {
        alias: GameObjectEnums.spectator,
        src: "../assets/image/spectator.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // mouse rope effect
      {
        alias: GameObjectEnums.mouseRopeEffect,
        src: "../assets/image/mouse-rope-effect.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
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

