import { Container, Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { GameObjectEnums } from "../enums/gameObjectEnums";
import gsap from "gsap";

export class Trail {
  //   particleContainer!: ParticleContainer;
  particleContainer!: Container;

  constructor(public scene: Container, public game: Game) {
    this.init();

    window.addEventListener("pointermove", (mouse) => {
      const texture = Texture.from(GameObjectEnums.mouseRopeEffect);

      for (let i = 0; i < 150; ++i) {
        let particle = new Sprite({
          texture,
          scale: 0.05,
          x: mouse.x,
          y: mouse.y,
        });

        this.particleContainer.addChild(particle);

        gsap.to(particle, {
          alpha: 0,
          duration: 0.4,
          onComplete: () => {
            particle.destroy();
          },
        });
        gsap.to(particle.scale, {
          x: 0,
          y: 0,
          duration: 0.4,
        });
      }
    });
  }

  init() {
    this.particleContainer = new Container();
    // this.particleContainer = new ParticleContainer({
    //   dynamicProperties: {
    //     scale: true,
    //     position: true,
    //     rotation: false,
    //     uvs: false,
    //     tint: true,
    //   },
    // });

    this.scene.addChild(this.particleContainer);
  }
}
