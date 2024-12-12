import { Application, Container, ContainerChild } from "pixi.js";
import { GameResources } from "./core/gameResources.ts";
import { GameObjects } from "./core/gameObjects.ts";
import { EvenetManager } from "./core/eventManager.ts";

export class Game extends Application {
  public scene!: Container<ContainerChild>;
  public gameResources!: GameResources;
  public gameObjects!: GameObjects;
  public eventManager!: EvenetManager;

  constructor(public backgroundColor: string, public htmlRootId: string) {
    super();
    this.setup()
      .then(() => {
        document.getElementById(htmlRootId)!.appendChild(this.canvas);
        this.scene = this.stage;

        this.startGame();
        console.log("Game created successfully.");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private async setup() {
    await this.init({
      background: this.backgroundColor,
      resizeTo: window,
      antialias: true,
    });
    this.createResources();
    await this.gameResources.startLoadAssets();
  }

  private createResources() {
    this.gameResources = new GameResources();
  }

  private startGame() {
    this.addGameObjects();
    this.addEvenetManager();
  }

  private addEvenetManager() {
    this.eventManager = new EvenetManager({
      ball: this.gameObjects.ball!,
    });
  }

  private addGameObjects() {
    this.gameObjects = new GameObjects(this.gameResources.assets, this.scene);

    // this.scene.addChild(this.gameObjects.ball!.graphics);

    // gsap.to(this.gameObjects.ball!.scale!, {
    //   duration: 2,
    //   x: 0.3,
    //   y: 0.3,
    //   repeat: Infinity,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });
    //
    // gsap.to(this.gameObjects.ball!, {
    //   duration: 2,
    //   x: 600,
    //   y: 100,
    //   repeat: Infinity,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });
    //
    // const container = new ParticleContainer({
    //   // this is the default, but we show it here for clarity
    //   dynamicProperties: {
    //     position: true, // Allow dynamic position changes (default)
    //     scale: true, // Static scale for extra performance
    //     rotation: false, // Static rotation
    //     color: true, // Static color
    //   },
    // });
    //
    // this.gameObjects.ball?.addChild(container);
    //
    // gsap.to(container.scale, {
    //   duration: 2,
    //   x: 0.3,
    //   y: 0.3,
    //   repeat: Infinity,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });
    //
    // gsap.to(container, {
    //   duration: 2,
    //   x: 600,
    //   y: 100,
    //   repeat: Infinity,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });
    //
    // // Animate shake effect
    // this.ticker.add(() => {
    //   // this.gameObjects.footballDor!.x = Math.sin(Date.now() * 0.4) * 5;
    //   // this.gameObjects.footballDor!.y = Math.cos(Date.now() * 0.4) * 5;
    //
    //   let particle = new Particle({
    //     texture: this.gameResources.assets.circle!,
    //     x: this.gameObjects.ball!.x - 50,
    //     y: this.gameObjects.ball!.y - 20,
    //   });
    //
    //   particle.scaleX = 0.7;
    //   particle.scaleY = 0.7;
    //
    //   gsap.to(particle, {
    //     duration: 0.3,
    //     alpha: 0,
    //     scaleX: 0,
    //     scaleY: 0,
    //     ease: "linear",
    //   });
    //
    //   container.addParticle(particle);
    // });
    //
    // this.scene.addChild(container);
  }
}
