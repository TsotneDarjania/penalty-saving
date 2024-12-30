import { Container, ContainerChild } from "pixi.js";

export class Scene {
  width: number = 0;
  height: number = 0;

  constructor(public mainContainer: Container<ContainerChild>) {}

  add(obj: ContainerChild) {
    this.mainContainer.addChild(obj);
  }

  remove(obj: ContainerChild) {
    this.mainContainer.removeChild(obj);
  }
}
