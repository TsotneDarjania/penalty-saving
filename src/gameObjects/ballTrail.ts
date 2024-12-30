import { Particle, ParticleContainer, Texture } from "pixi.js";
import { Game } from "../game";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";
import { Scene } from "../game/core/scene";

export class BallTrail {
  particleContainer!: ParticleContainer;

  constructor(public scene: Scene, public game: Game) {
    this.init();
  }

  drawParticles(x: number, y: number) {
    const texture = Texture.from(GameObjectEnums.mouseRopeEffect);
    let particle = new Particle({
      texture,
      x,
      y,
      scaleX: 0.39,
      scaleY: 0.39,
      rotation: Math.PI / 2,
      anchorX: 0.5,
      anchorY: 0.5,
    });
    gsap.to(particle, {
      duration: 0.7,
      alpha: 0,
      onComplete: () => {
        this.particleContainer.removeParticle(particle);
      },
    });
    this.particleContainer.addParticle(particle);
  }

  init() {
    this.particleContainer = new ParticleContainer({
      dynamicProperties: {
        scale: true,
        position: true,
        rotation: true,
        uvs: false,
        tint: true,
      },
    });
    this.scene.add(this.particleContainer);
    this.game.ticker.add(() => {
      this.particleContainer.update();
    });
  }
}
