import { Sprite, Texture } from "pixi.js";
import { BulgePinchFilter } from "pixi-filters";

export class FootballDor extends Sprite {
  filterEffect!: BulgePinchFilter;

  constructor(texture: Texture) {
    super(texture);

    this.anchor.set(0.5);

    this.createFilter();
  }

  private createFilter() {
    this.filterEffect = new BulgePinchFilter({
      strength: -0.5,
      radius: 80,
    });
  }

  public startGridAnimation() {
    this.filters = [this.filterEffect];
  }
}
