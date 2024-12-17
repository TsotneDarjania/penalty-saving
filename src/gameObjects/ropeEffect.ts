import { Container, MeshRope, Point, Texture } from "pixi.js";
import { Game } from "../game";

export class RopeEffect {
  historyX: number[] = [];
  historyY: number[] = [];
  // historySize determines how long the trail will be.
  historySize = 8;
  // ropeSize determines how smooth the trail will be.
  ropeSize = 20;
  points: Point[] = [];

  rope!: MeshRope;

  effectIsOnn = false;

  constructor(
    public trailTexture: Texture,
    public game: Game,
    public forMouse: boolean,
    public target?: Container,
    public options?: {
      ropeSize?: number;
      historySize?: number;
      color?: number;
    }
  ) {
    if (options) {
      if (options.historySize) this.historySize = options.historySize;
      if (options.ropeSize) this.ropeSize = options.ropeSize;
    }

    this.init();
  }

  init() {
    // Create history array.
    for (let i = 0; i < this.historySize; i++) {
      this.historyX.push(this.target!.x);

      this.historyY.push(this.target!.y);
    }
    // Create rope points.
    for (let i = 0; i < this.ropeSize; i++) {
      this.points.push(new Point(0, 0));
    }

    const points = this.points;
    // Create the rope
    this.rope = new MeshRope({ texture: this.trailTexture, points });

    if (this.options?.color) this.rope.tint = this.options?.color;
    // Set the blendmode
    // this.rope.blendMode = "add";

    this.game.scene.addChild(this.rope);

    this.forMouse ? this.makeEffectForMouse() : this.makeEffectForObject();
  }

  effectOnn() {
    this.effectIsOnn = true;
  }

  effectoff() {
    this.effectIsOnn = false;
  }

  makeEffectForObject() {
    this.game.stage.eventMode = "static";
    this.game.stage.hitArea = this.game.screen;

    let mouseposition: { x: any; y: any } | null = null;

    // this.game.stage.on("mousemove", (event) => {
    //   mouseposition = mouseposition || { x: 0, y: 0 };
    //   mouseposition.x = event.global.x;
    //   mouseposition.y = event.global.y;
    // });

    // Listen for animate update
    this.game.ticker.add(() => {
      mouseposition = mouseposition || { x: 0, y: 0 };
      mouseposition.x = this.target!.x;
      mouseposition.y = this.target!.y;

      if (!mouseposition) return;

      // Update the mouse values to history
      this.historyX.pop();
      this.historyX.unshift(mouseposition.x);
      this.historyY.pop();
      this.historyY.unshift(mouseposition.y);

      if (!this.effectIsOnn) return;
      // Update the points to correspond with history.
      for (let i = 0; i < this.ropeSize; i++) {
        const p = this.points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = this.cubicInterpolation(
          this.historyX,
          (i / this.ropeSize) * this.historySize
        );
        const iy = this.cubicInterpolation(
          this.historyY,
          (i / this.ropeSize) * this.historySize
        );

        p.x = ix;
        p.y = iy;
      }
    });
  }

  makeEffectForMouse() {
    this.game.stage.eventMode = "static";
    this.game.stage.hitArea = this.game.screen;

    let mouseposition: { x: any; y: any } | null = null;

    this.game.stage.on("mousemove", (event) => {
      mouseposition = mouseposition || { x: 0, y: 0 };
      mouseposition.x = event.global.x;
      mouseposition.y = event.global.y;
    });

    // Listen for animate update
    this.game.ticker.add(() => {
      if (!this.effectIsOnn) return;
      if (!mouseposition) return;

      // Update the mouse values to history
      this.historyX.pop();
      this.historyX.unshift(mouseposition.x);
      this.historyY.pop();
      this.historyY.unshift(mouseposition.y);
      // Update the points to correspond with history.
      for (let i = 0; i < this.ropeSize; i++) {
        const p = this.points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = this.cubicInterpolation(
          this.historyX,
          (i / this.ropeSize) * this.historySize
        );
        const iy = this.cubicInterpolation(
          this.historyY,
          (i / this.ropeSize) * this.historySize
        );

        p.x = ix;
        p.y = iy;
      }
    });
  }

  /**
   * Cubic interpolation based on https://github.com/osuushi/Smooth.js
   */
  clipInput(k: number, arr: number[]) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;

    return arr[k];
  }

  getTangent(k: number, factor: number, array: number[]) {
    return (
      (factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array))) /
      2
    );
  }

  cubicInterpolation(array: number[], t: number, tangentFactor = 1) {
    const k = Math.floor(t);
    const m = [
      this.getTangent(k, tangentFactor, array),
      this.getTangent(k + 1, tangentFactor, array),
    ];
    const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];

    t -= k;
    const t2 = t * t;
    const t3 = t * t2;

    return (
      (2 * t3 - 3 * t2 + 1) * p[0] +
      (t3 - 2 * t2 + t) * m[0] +
      (-2 * t3 + 3 * t2) * p[1] +
      (t3 - t2) * m[1]
    );
  }
}
