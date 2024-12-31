import { Assets, AssetsClass } from "pixi.js";
import { GameObjectEnums } from "../../enums/gameObjectEnums.ts";

export class GameResources extends AssetsClass {
  constructor() {
    super();
  }

  public async startLoadAssets() {
    await Assets.load([
      // Character Animation
      {
        alias: "CharacterSkeleton",
        src: "../assets/animation/character/Personality.json",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: "CharacterAtlas",
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

      // stadium background
      {
        alias: GameObjectEnums.stadiumBck,
        src: "../assets/image/stadium-bck.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      
      // Sky      
      {
        alias: GameObjectEnums.stadiumBck2,
        src: "../assets/image/stadium-bck-2.png",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Win Circle
      {
        alias: GameObjectEnums.winCircle,
        src: "../assets/image/win-circle.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Lose Circle
      {
        alias: GameObjectEnums.loseCircle,
        src: "../assets/image/lose-circle.svg",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: GameObjectEnums.mainAssets,
        src: "../assets/spritesheets/main-assets.json",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      {
        alias: GameObjectEnums.mainAssets_2,
        src: "../assets/spritesheets/main-assets-2.json",
        data: {
          scaleMode: "linear",
          autoGenerateMipmaps: true,
        },
      },
      // Cloud
      {
        alias: GameObjectEnums.cloud,
        src: "../assets/image/cloud.png",
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
