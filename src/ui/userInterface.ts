import { Container, Sprite, Texture } from "pixi.js";
import { GameObjectEnums } from "../enums/gameObjectEnums";

export class UserInterface extends Container {
  menuButton!: Sprite;
  arrowButton!: Sprite;
  lightingButton!: Sprite;
  coinButton!: Sprite;

  constructor() {
    super();

    this.init();
  }

  init() {
    this.addMenuButton();
    this.addArrowButton();
    this.addLightingButton();
    this.addCoinButton();
  }

  addMenuButton() {
    this.menuButton = new Sprite(Texture.from(GameObjectEnums.menu));
    this.menuButton.scale = 0.25;
    this.menuButton.anchor = 0.5;
    this.menuButton.x = window.innerWidth - this.menuButton.width / 2 - 10;
    this.menuButton.y = window.innerHeight - this.menuButton.height / 2 - 10;
    this.addChild(this.menuButton);
  }

  addArrowButton() {
    this.arrowButton = new Sprite(Texture.from(GameObjectEnums.arrow));
    this.arrowButton.scale = 0.3;
    this.arrowButton.anchor = 0.5;
    this.arrowButton.x = window.innerWidth - this.arrowButton.width / 2 - 10;
    this.arrowButton.y = window.innerHeight - this.arrowButton.height / 2 - 60;
    this.addChild(this.arrowButton);
  }

  addLightingButton() {
    this.lightingButton = new Sprite(Texture.from(GameObjectEnums.lighting));
    this.lightingButton.scale = 0.3;
    this.lightingButton.anchor = 0.5;
    this.lightingButton.x = this.lightingButton.width / 2 + 10;
    this.lightingButton.y =
      window.innerHeight - this.lightingButton.height / 2 - 60;
    this.addChild(this.lightingButton);
  }

  addCoinButton() {
    this.coinButton = new Sprite(Texture.from(GameObjectEnums.coin));
    this.coinButton.scale = 0.3;
    this.coinButton.anchor = 0.5;
    this.coinButton.x = this.coinButton.width / 2 + 10;
    this.coinButton.y = window.innerHeight - this.coinButton.height / 2 - 10;
    this.addChild(this.coinButton);
  }
}
