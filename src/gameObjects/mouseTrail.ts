import { Container, Particle, ParticleContainer, Texture } from "pixi.js";
import { Game } from "../game";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";

export class MouseTrail {
  particleContainer!: ParticleContainer;

  constructor(public scene: Container, public game: Game) {
    this.init();

    const texture = Texture.from(GameObjectEnums.mouseRopeEffect);

    // Listen for mouse movement
    window.addEventListener("pointermove", (mouse) => {
      for (let i = 0; i < 1; i++) {
        let particle = new Particle({
          texture,
          x: mouse.x,
          y: mouse.y,
          scaleX: 0.22,
          scaleY: 0.22,
          rotation: Math.PI / 2,
          anchorX: 0.5,
          anchorY: 0.5,
          tint: 0xffd2ff,
        });

        gsap.to(particle, {
          duration: 0.26,
          alpha: 0,

          tint: 0xffffff, // Animates the color to red
        });

        this.particleContainer.addParticle(particle);
      }
    });
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
