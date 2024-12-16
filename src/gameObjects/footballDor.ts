import { Container, Sprite, Texture } from "pixi.js";
import { BulgePinchFilter } from "pixi-filters";
import { GameObjectEnums } from "../enums/gameObjectEnums";

export class FootballDor extends Container {
  bulgeGilterEffect!: BulgePinchFilter;
  dor!: Sprite;
  topGrid!: Sprite;
  leftGrid!: Sprite;
  baseGrid!: Sprite;
  RightGrid!: Sprite;

  gridContainer: Container = new Container();

  constructor() {
    super();

    this.addDor();
    this.createBulgeFilter();
  }

  private createBulgeFilter() {
    this.bulgeGilterEffect = new BulgePinchFilter({
      strength: -0.6,
      radius: 80,
    });
  }

  private addDor() {
    this.dor = new Sprite(Texture.from(GameObjectEnums.footballDor));
    this.dor.anchor = 0.5;
    this.addChild(this.dor);
  }

  // public startGridAnimation() {
  //   // this.filterEffect.centerX = 0.31;
  //   // this.filterEffect.centerY = 0.7;
  //   // const mask = new Graphics();
  //   // mask.rect(0, 0, 1100, 500);
  //   // mask.fill();
  //   // this.mask = mask;
  //   // this.filters = [this.filterEffect];
  // }
}
