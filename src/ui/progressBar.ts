import {
  Container,
  Sprite,
  Texture,
  Text,
  Graphics,
  EventEmitter,
  BlurFilter,
} from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";
import { Game } from "../game";

export class ProgressBar extends Container {
  background!: Sprite;
  fill!: Sprite;

  stars: Sprite[] = [];
  texts: Text[] = [];

  mask!: Graphics;

  maskInitialX!: number;
  maskInitialY!: number;
  maskInitialRotation!: number;

  evenetEmitter!: EventEmitter;

  animationData = [
    {
      x: 77,
      y: -30,
      rotation: -0.3,
    },
    {
      x: 63,
      y: 26,
      rotation: -0.13,
    },
    {
      x: 59,
      y: 18,
      rotation: -0.04,
    },
    {
      x: 61,
      y: 8,
      rotation: 0,
    },
    {
      x: 65,
      y: 29,
      rotation: 0.05,
    },
  ];

  constructor(public game: Game) {
    super();

    this.addBackground();
    this.addFill();
    this.addStars();
    this.addTexts();
    this.addMask();

    this.evenetEmitter = new EventEmitter();
  }

  addBackground() {
    this.background = new Sprite(Texture.from(GameObjectEnums.progressGray));

    this.background.anchor = 0.5;
    this.background.x = 0;
    this.background.y = 2;
    this.background.scale = 0.29;
    this.background.rotation = 0.02;

    this.addChild(this.background);
  }

  addFill() {
    const filter = new BlurFilter({
      strength: 1.7,
    });

    this.fill = new Sprite(Texture.from(GameObjectEnums.progressGreen));
    this.fill.y = -1;
    this.fill.x = 0;
    this.fill.rotation = 0.02;
    this.fill.scale = 0.29;

    this.fill.filters = [filter];

    this.fill.anchor = 0.5;
    this.addChild(this.fill);
  }

  addStars() {
    this.stars[0] = new Sprite(Texture.from(GameObjectEnums.star_1));
    this.stars[0].anchor = 0.5;
    this.stars[0].scale = 0.35;
    this.stars[0].x = -120;

    this.stars[1] = new Sprite(Texture.from(GameObjectEnums.star_2));
    this.stars[1].anchor = 0.5;
    this.stars[1].scale = 0.38;
    this.stars[1].x = -63;
    this.stars[1].y = -10;

    this.stars[2] = new Sprite(Texture.from(GameObjectEnums.star_3));
    this.stars[2].anchor = 0.5;
    this.stars[2].scale = 0.41;
    this.stars[2].x = -2;
    this.stars[2].y = -14;

    this.stars[3] = new Sprite(Texture.from(GameObjectEnums.star_4));
    this.stars[3].anchor = 0.5;
    this.stars[3].scale = 0.44;
    this.stars[3].x = 62;
    this.stars[3].y = -8;

    this.stars[4] = new Sprite(Texture.from(GameObjectEnums.star_4));
    this.stars[4].anchor = 0.5;
    this.stars[4].scale = 0.5;
    this.stars[4].x = 124;
    this.stars[4].y = 5;

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
    this.texts[0].x = -114;
    this.texts[0].y = 28;
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
    this.texts[1].x = -61;
    this.texts[1].y = 23;
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
    this.texts[2].x = -3;
    this.texts[2].y = 22;
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
    this.texts[3].x = 52;
    this.texts[3].y = 27;
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
    this.texts[4].y = 40;
    this.texts[4].rotation = 0.3;

    this.texts.forEach((text) => {
      this.addChild(text);
    });
  }

  addMask() {
    this.mask = new Graphics();

    this.mask.roundRect(-490, -60, 320, 53, 100);
    this.mask.rotation = -0.3;

    this.mask.fill();

    this.maskInitialRotation = this.mask.rotation;
    this.maskInitialX = this.mask.x;
    this.maskInitialY = this.mask.y;

    this.addChild(this.mask);
    this.fill.mask = this.mask;
  }

  makeFillAniamtion(index: 0 | 1 | 2 | 3 | 4) {
    gsap.to(this.mask, {
      x: this.mask.x + this.animationData[index - 1].x,
      y: this.mask.y + this.animationData[index - 1].y,
      rotation: this.animationData[index - 1].rotation,

      onUpdate: () => {
        this.mask.fill();
      },
      onComplete: () => {
        setTimeout(() => {
          if (index - 1 === 4) {
            this.reset();
          }
        }, 1500);
      },
    });
  }

  reset() {
    this.mask.x = this.maskInitialX;
    this.mask.y = this.maskInitialY;
    this.mask.rotation = this.maskInitialRotation;
  }
}
