import { BlurFilter, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Ball } from "..";
import { GameObjectEnums } from "../../../enums/gameObjectEnums";
import { gameConfig } from "../../../config/gameConfig";

export class BallGraphic {
  container!: Container;
  maskContainer!: Container;

  borderGraphic!: Graphics;

  constructor(public ball: Ball) {
    this.container = new Container();
    this.addInitSprites();
    this.addCircleMask();
    this.addCircleBorder();
  }

  // First, I will add two spinning sprites.
  private addInitSprites() {
    for (let i = 0; i < 2; i++) {
      const sprite = new Sprite(Texture.from(GameObjectEnums.ballTexture));
      sprite.anchor = 0.5;
      sprite.scale = 0.26;
      sprite.y = -i * sprite.height;

      this.container.addChild(sprite);
    }
  }

  private addCircleMask() {
    let mask = new Graphics()
      .circle(
        this.container.x,
        this.container.y,
        gameConfig.desktop.ball.radius
      )
      .fill();

    this.container.mask = mask;
    this.maskContainer = new Container();
    this.maskContainer.addChild(mask);
    this.container.addChild(this.maskContainer);
  }

  private addCircleBorder() {
    const filter = new BlurFilter({
      strength: 3,
    });

    this.borderGraphic = new Graphics()
      .circle(
        this.container.x,
        this.container.y,
        gameConfig.desktop.ball.radius
      )
      .stroke({
        color: "black",
        width: 2,
      });
    this.borderGraphic.filters = [filter];
    this.container.addChild(this.borderGraphic);
  }
}
