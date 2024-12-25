import { BlurFilter, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Ball } from "..";
import { GameObjectEnums } from "../../../enums/gameObjectEnums";
import { gameConfig } from "../../../config/gameConfig";
import gsap from "gsap";
import { getRandomIntInRange } from "../../../helper";

export class BallGraphic {
  container!: Container;
  maskContainer!: Container;

  borderGraphic!: Graphics;

  ballSelector!: Container;

  staticSprite!: Sprite;
  shadow!: Sprite;

  shadowInitScaleX!: number;
  shadowInitScaleY!: number;

  selectorAnimation!: gsap.core.Tween;

  constructor(public ball: Ball, public scene: Container) {
    this.container = new Container();
    this.addInitSprites();
    this.addCircleMask();
    this.addCircleBorder();
    this.addStaticSprite();
    this.addShadow();
    this.offSpinMode();
    this.addBallSelector();
    this.addSelector();
  }

  private addStaticSprite() {
    const filter = new BlurFilter({
      strength: 0.2,
    });

    this.staticSprite = new Sprite(Texture.from(GameObjectEnums.staticBall));
    this.staticSprite.anchor = 0.5;
    this.staticSprite.scale = 0.15;

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
        width: 0,
      });
    this.borderGraphic.filters = [filter];
    this.container.addChild(this.borderGraphic);
  }

  private addBallSelector() {
    this.ballSelector = new Container();

    const greenShadow = new Sprite(
      Texture.from(GameObjectEnums.greenShadowCircle)
    );
    greenShadow.anchor = 0.5;
    greenShadow.scale = 0.9;
    this.ballSelector.addChild(greenShadow);
    const arrows = new Sprite(Texture.from(GameObjectEnums.ballCircleArrows));
    arrows.scale = 0.06;
    arrows.anchor = 0.5;
    this.ballSelector.addChild(arrows);

    gsap.to(arrows.scale, {
      duration: 0.3,
      yoyo: true,
      x: arrows.scale.x + 0.005,
      y: arrows.scale.y + 0.005,
      repeat: -1,
      ease: "none",
    });

    this.ballSelector.scale = this.ball.backgroundScale * 8;

    this.ballSelector.x = this.ball.initPositionX;
    this.ballSelector.y = this.ball.initPositionY - 0.5;
    this.scene.addChild(this.ballSelector);
  }

  addSelector() {
    this.ballSelector.rotation = getRandomIntInRange(0, 10);

    gsap.to(this.ballSelector, {
      alpha: 1,
      duration: 0.5,
    });

    this.selectorAnimation = gsap.to(this.ballSelector, {
      duration: 16,
      rotation: this.ballSelector.rotation + 6,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
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

  public removeSelector() {
    gsap.to(this.ballSelector, {
      alpha: 0,
      duration: 0.2,
      onComplete: () => {
        if (this.selectorAnimation) {
          this.selectorAnimation.kill(); // Stops the animation
        }
      },
    });
  }
}
