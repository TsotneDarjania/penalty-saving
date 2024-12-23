import { BlurFilter, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Ball } from "..";
import { GameObjectEnums } from "../../../enums/gameObjectEnums";
import { gameConfig } from "../../../config/gameConfig";

export class BallGraphic {
  container!: Container;
  maskContainer!: Container;

  borderGraphic!: Graphics;

  staticSprite!: Sprite;
  shadow!: Sprite;

  shadowInitScaleX!: number;
  shadowInitScaleY!: number;

  constructor(public ball: Ball, public scene: Container) {
    this.container = new Container();
    this.addInitSprites();
    this.addCircleMask();
    this.addCircleBorder();
    this.addStaticSprite();
    this.addShadow();
    this.offSpinMode();
  }

  private addStaticSprite() {
    const filter = new BlurFilter({
      strength: 0.2,
    });

    this.staticSprite = new Sprite(Texture.from(GameObjectEnums.staticBall));
    this.staticSprite.anchor = 0.5;
    this.staticSprite.scale = 0.17;

    this.container.addChild(this.staticSprite);
    this.staticSprite.filters = [filter];
  }

  addShadow() {
    this.shadow = new Sprite(Texture.from(GameObjectEnums.ballShadow));
    this.shadow.anchor = 0.5;

    this.scene.addChild(this.shadow);
  }

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
      .circle(this.container.x, this.container.y, gameConfig.mobile.ball.radius)
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
      .circle(this.container.x, this.container.y, gameConfig.mobile.ball.radius)
      .stroke({
        color: "black",
        width: 1,
      });
    this.borderGraphic.filters = [filter];
    this.container.addChild(this.borderGraphic);
  }

  public onSpinMode() {
    this.container.getChildAt(0).alpha = 1;
    this.container.getChildAt(1).alpha = 1;
    this.staticSprite.alpha = 0;
  }

  public offSpinMode() {
    this.container.getChildAt(0).alpha = 0;
    this.container.getChildAt(1).alpha = 0;
    this.staticSprite.alpha = 1;
  }
}
