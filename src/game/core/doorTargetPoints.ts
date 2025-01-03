import { EventEmitter, Sprite, Texture } from "pixi.js";
import { createKey, findClosestPoint } from "../../helper";
import { GameObjectEnums } from "../../enums/gameObjectEnums";
import gsap from "gsap";
import { FootballDoor } from "../../gameObjects/footballDoor";
import { GameEventEnums } from "../../enums/gameEvenetEnums";
import { GameObjects } from "./gameObjects";
import { Scene } from "./scene";
import { getScaleX, getX, getY } from "../../config/runtimeHelper";

export class DorTargetPoints {
  continueTargetAnimations = true;
  isTargetsOnn = false;
  gsapTargetAnimation!: gsap.core.Tween;

  selectedPoint: string | undefined = undefined;

  eventEmitter!: EventEmitter;

  points: Map<
    string,
    {
      x: number;
      y: number;
      targetImage?: Sprite;
      goalKeeperJumpData: {
        direction: "center" | "left" | "right";
        height: 0 | 1 | 2;
      };
      ball: {
        isSave: {
          fallingDawnPath: string;
        };
        isNotSave: {
          fallingDawnPath: string;
        };
        fallingDawnPathData: {
          offsetX: number;
          offsetY: number;
        };
      };
    }
  > = new Map();

  constructor(
    public footballDor: FootballDoor,
    public scene: Scene,
    public gameObjects: GameObjects
  ) {
    this.eventEmitter = new EventEmitter();

    this.generateTargetPoints();
    this.addTargets();
    this.addListeners();
  }

  addListeners() {
    this.points.forEach((point, key) => {
      point.targetImage!.interactive = true;
      point.targetImage!.cursor = "pointer";

      point.targetImage!.on("pointerenter", () => {
        this.selectedPoint = key;
      });

      point.targetImage!.on("pointerdown", () => {
        this.selectedPoint = key;
        this.eventEmitter.emit(GameEventEnums.selectedShootByTargetClick);
      });
    });

    this.footballDor.door.interactive = true;
    this.footballDor.door.cursor = "pointer";
    this.footballDor.door.on("click", (event) => {
      const mousePosition = event.global;

      const targetPoint = {
        x: mousePosition.x,
        y: mousePosition.y,
      };

      const points = Array.from(this.points.values()).map((point) => {
        return { x: point.x, y: point.y };
      });

      const closestPoint = findClosestPoint(points, targetPoint);

      const selectedPoint = Array.from(this.points.entries()).filter(
        (point) => {
          return point[1].x === closestPoint.x && point[1].y === closestPoint.y;
        }
      );

      this.selectedPoint = String(selectedPoint.map((point) => point[0]));

      this.eventEmitter.emit(GameEventEnums.selectedShootByDoorClick);
    });
    this.footballDor.door.on("pointerup", (event) => {
      const mousePosition = event.global;

      const targetPoint = {
        x: mousePosition.x,
        y: mousePosition.y,
      };

      const points = Array.from(this.points.values()).map((point) => {
        return { x: point.x, y: point.y };
      });

      const closestPoint = findClosestPoint(points, targetPoint);

      const selectedPoint = Array.from(this.points.entries()).filter(
        (point) => {
          return point[1].x === closestPoint.x && point[1].y === closestPoint.y;
        }
      );

      this.selectedPoint = String(selectedPoint.map((point) => point[0]));

      this.eventEmitter.emit(GameEventEnums.selectedShootByDoorClick);
    });
  }

  generateTargetPoints() {
    this.points.set(createKey([0, 0]), {
      x: getX(0.21),
      y: getY(0.52),
      goalKeeperJumpData: {
        direction: "left",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L -41 -23 L -75 -4 L -108 34 L -164 78 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -14 L -6 -15 L -5 -13 L -6 -11 L -7 -10 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 9,
          offsetY: 16,
        },
      },
    });

    this.points.set(createKey([0, 1]), {
      x: getX(0.18),
      y: getY(0.45),
      goalKeeperJumpData: {
        direction: "left",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M 5 -10 L -17 6 L -36 36 L -56 82 L -79 101 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -10 -14 L -9 -9 L -8 -6 L -8 -1 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 17,
          offsetY: 41,
        },
      },
    });

    this.points.set(createKey([0, 2]), {
      x: getX(0.19),
      y: getY(0.38),
      goalKeeperJumpData: {
        direction: "left",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M 5 -10 L -19 -9 L -41 -1 L -89 60 L -428 224 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -9 -19 L -10 -15 L -9 -6 L -6 21 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 15,
          offsetY: 36,
        },
      },
    });

    this.points.set(createKey([1, 0]), {
      x: getX(0.5),
      y: getY(0.53),
      goalKeeperJumpData: {
        direction: "center",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -8 -17 L -7 -19 L -6 -18 L -5 -15 L -4 -7 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -7 -19 L -6 -16 L -7 -14 L -7 -11 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 17,
          offsetY: 21,
        },
      },
    });

    this.points.set(createKey([1, 1]), {
      x: getX(0.5),
      y: getY(0.47),
      goalKeeperJumpData: {
        direction: "center",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -8 -17 L -10 -19 L -13 -16 L -16 -9 L -20 16 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -7 -19 L -6 -15 L -6 -9 L -8 -2 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 16,
          offsetY: 52,
        },
      },
    });

    this.points.set(createKey([1, 2]), {
      x: getX(0.5),
      y: getY(0.36),
      goalKeeperJumpData: {
        direction: "center",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -8 -17 L -10 -19 L -15 -16 L -20 -4 L -29 45 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -9 -19 L -10 -15 L -8 2 L -9 24 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 16,
          offsetY: 30,
        },
      },
    });

    this.points.set(createKey([2, 0]), {
      x: getX(0.79),
      y: getY(0.52),
      goalKeeperJumpData: {
        direction: "right",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 25 -24 L 51 -10 L 87 20 L 115 68 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -7 -19 L -6 -16 L -7 -14 L -6 -11 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 18,
          offsetY: 28,
        },
      },
    });

    this.points.set(createKey([2, 1]), {
      x: getX(0.82),
      y: getY(0.445),
      goalKeeperJumpData: {
        direction: "right",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 31 -26 L 80 -7 L 131 49 L 263 212 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -6 -15 L -6 -9 L -6 -1 L -9 15 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 18,
          offsetY: 38,
        },
      },
    });

    this.points.set(createKey([2, 2]), {
      x: getX(0.815),
      y: getY(0.38),
      goalKeeperJumpData: {
        direction: "right",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 33 -25 L 90 -11 L 196 49 L 450 138 M -101 -24",
        },
        isNotSave: {
          fallingDawnPath:
            "M -8 -17 L -7 -19 L -6 -18 L -5 -15 L -9 21 M -101 -24",
        },
        fallingDawnPathData: {
          offsetX: 14,
          offsetY: 35,
        },
      },
    });
  }

  addTargets() {
    this.points.forEach((point) => {
      const sprite = new Sprite(Texture.from(GameObjectEnums.target));
      sprite.x = point.x;
      sprite.y = point.y;
      sprite.scale.set(getScaleX(1));

      sprite.anchor = 0.5;
      sprite.alpha = 0;
      sprite.zIndex = 10;

      this.scene.add(sprite);

      point.targetImage = sprite;
    });
  }

  lightOnnTargets() {
    if (this.isTargetsOnn) return;

    this.isTargetsOnn = true;

    const targetImages = Array.from(this.points.values())
      .map((point) => point.targetImage)
      .filter((sprite) => sprite !== undefined) as Sprite[];

    targetImages.forEach((image) => {
      gsap.to(image.scale, {
        x: image.scale.x + 0.03,
        y: image.scale.y + 0.03,
        repeat: -1,
        yoyo: true,
        duration: 0.2,
        ease: "none",
      });
    });

    this.animateTargets(targetImages);
  }

  animateTargets(images: Sprite[]) {
    images.forEach((image, index) => {
      gsap.to(image, {
        alpha: 0.6,
        delay: 0.1 * index,
        duration: 1.8,
        onComplete: () => {
          if (index === images.length - 1) {
            this.aniamteToHideTargets();
          }
        },
        ease: "power4.inOut",
      });
    });
  }

  aniamteToHideTargets() {
    const targetImages = Array.from(this.points.values())
      .map((point) => point.targetImage)
      .filter((sprite) => sprite !== undefined) as Sprite[];

    targetImages.forEach((image, index) => {
      gsap.to(image, {
        alpha: 0,
        delay: 0.1 * index,
        duration: 1,
        onComplete: () => {
          if (index === 0) {
            this.continueTargetAnimations && this.animateTargets(targetImages);
          }
        },
        ease: "power4.inOut",
      });
    });
  }

  lightoffTargets() {
    this.continueTargetAnimations = false;
  }
}
