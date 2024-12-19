import { Container, Sprite, Texture, Text, Graphics } from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";

export class ProgressBar extends Container {
  background!: Sprite;
  fill!: Sprite;

  stars: Sprite[] = [];
  texts: Text[] = [];

  mask!: Graphics;

  animationData = [
    {
      x: 65,
      y: 0,
      rotation: -0.3,
    },
    {
      x: 51,
      y: -13,
      rotation: -0.3,
    },
    {
      x: 60,
      y: -13,
      rotation: -0.3,
    },
    {
      x: 58,
      y: 39,
      rotation: -0.1,
    },
    {
      x: 50,
      y: 30,
      rotation: 0,
    },
  ];

  constructor() {
    super();

    this.addBackground();
    this.addFill();
    this.addStars();
    this.addTexts();
    this.addMask();
  }

  addBackground() {
    this.background = new Sprite(Texture.from(GameObjectEnums.progressGray));
    this.background.anchor = 0.5;
    this.addChild(this.background);
  }

  addFill() {
    this.fill = new Sprite(Texture.from(GameObjectEnums.progressGreen));
    this.fill.scale = 0.92;
    this.fill.y = -3;
    this.fill.anchor = 0.5;
    this.addChild(this.fill);
  }

  addStars() {
    this.stars[0] = new Sprite(Texture.from(GameObjectEnums.star_1));
    this.stars[0].anchor = 0.5;
    this.stars[0].scale = 0.35;
    this.stars[0].x = -105;

    this.stars[1] = new Sprite(Texture.from(GameObjectEnums.star_2));
    this.stars[1].anchor = 0.5;
    this.stars[1].scale = 0.38;
    this.stars[1].x = -55;
    this.stars[1].y = -10;

    this.stars[2] = new Sprite(Texture.from(GameObjectEnums.star_3));
    this.stars[2].anchor = 0.5;
    this.stars[2].scale = 0.41;
    this.stars[2].x = 0;
    this.stars[2].y = -14;

    this.stars[3] = new Sprite(Texture.from(GameObjectEnums.star_4));
    this.stars[3].anchor = 0.5;
    this.stars[3].scale = 0.44;
    this.stars[3].x = 60;
    this.stars[3].y = -10;

    this.stars[4] = new Sprite(Texture.from(GameObjectEnums.star_4));
    this.stars[4].anchor = 0.5;
    this.stars[4].scale = 0.5;
    this.stars[4].x = 120;
    this.stars[4].y = 3;

    this.stars.forEach((star) => {
      this.addChild(star);
    });
  }

  addTexts() {
    this.texts[0] = new Text({
      text: "x1",
      style: {
        fontFamily: "CustomFont1",
        fill: "white",
      },
    });
    this.texts[0].scale = 0.7;
    this.texts[0].anchor = 0.5;
    this.texts[0].x = -100;
    this.texts[0].y = 25;
    this.texts[0].rotation = -0.2;

    this.texts[1] = new Text({
      text: "x2",
      style: {
        fontFamily: "CustomFont1",
        fill: "white",
      },
    });
    this.texts[1].scale = 0.7;
    this.texts[1].anchor = 0.5;
    this.texts[1].x = -53;
    this.texts[1].y = 17;
    this.texts[1].rotation = -0.1;

    this.texts[2] = new Text({
      text: "x3",
      style: {
        fontFamily: "CustomFont1",
        fill: "white",
      },
    });
    this.texts[2].scale = 0.8;
    this.texts[2].anchor = 0.5;
    this.texts[2].x = 0;
    this.texts[2].y = 15;
    this.texts[2].rotation = -0;

    this.texts[3] = new Text({
      text: "x4",
      style: {
        fontFamily: "CustomFont1",
        fill: "white",
      },
    });
    this.texts[3].scale = 0.9;
    this.texts[3].anchor = 0.5;
    this.texts[3].x = 54;
    this.texts[3].y = 20;
    this.texts[3].rotation = 0.2;

    this.texts[4] = new Text({
      text: "x5",
      style: {
        fontFamily: "CustomFont1",
        fill: "white",
      },
    });
    this.texts[4].scale = 0.93;
    this.texts[4].anchor = 0.5;
    this.texts[4].x = 110;
    this.texts[4].y = 35;
    this.texts[4].rotation = 0.3;

    this.texts.forEach((text) => {
      this.addChild(text);
    });
  }

  addMask() {
    this.mask = new Graphics();

    this.mask.roundRect(-470, -70, 330, 50, 100);
    this.mask.rotation = -0.3;

    this.mask.fill();

    this.addChild(this.mask);
    this.fill.mask = this.mask;
  }

  makeFillAniamtion(index: 0 | 1 | 2 | 3 | 4) {
    gsap.to(this.mask, {
      x: this.mask.x + this.animationData[index].x,
      y: this.mask.y + this.animationData[index].y,
      rotation: this.animationData[index].rotation,
      duration: 1,
      onUpdate: () => {
        this.mask.fill();
      },
    });
  }

  reset() {
    this.mask.destroy();
    this.addMask();
  }
}
