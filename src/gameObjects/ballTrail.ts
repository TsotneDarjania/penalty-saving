import { Container, Particle, ParticleContainer, Texture } from "pixi.js";
import { Game } from "../game";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";

export class BallTrail {
  particleContainer!: ParticleContainer;

  constructor(public scene: Container, public game: Game) {
    this.init();
  }

  drawParticles(x: number, y: number) {
    console.log("a");
    const texture = Texture.from(GameObjectEnums.mouseRopeEffect);

    let particle = new Particle({
      texture,
      x,
      y,
      scaleX: 0.36,
      scaleY: 0.36,
      rotation: Math.PI / 2,
      anchorX: 0.5,
      anchorY: 0.5,
    });

    gsap.to(particle, {
      duration: 0.5,
      alpha: 0,
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

    this.scene.addChild(this.particleContainer);

    this.game.ticker.add(() => {
      this.particleContainer.update();
    });
  }
}
