import { Sprite } from "pixi.js";
import { Scene } from "../game/core/scene";
import { BallTrail } from "../gameObjects/ballTrail";

export let background: Sprite;
export let scene: Scene;
export let ballTrail: BallTrail;

export function setBackground(newBackground: Sprite): void {
  background = newBackground;
}

export function setScene(newScene: Scene) {
  scene = newScene;
}

export function setBallTrail(newBallTrail: BallTrail) {
  ballTrail = newBallTrail;
}

export function getX(x: number) {
  return (
    background.x -
    (background.texture.width * background.scale.x) / 2 +
    x * background.texture.width * background.scale.x
  );
}

export function getY(y: number) {
  return (
    background.y -
    (background.texture.height * background.scale.y) / 2 +
    y * background.texture.height * background.scale.y
  );
}

export function getScaleX(scaleX: number) {
  return background.scale.x * scaleX;
}
export function getScaleY(scaleY: number) {
  return background.scale.y * scaleY;
}
