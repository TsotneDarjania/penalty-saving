import { Container, EventEmitter, Sprite, Texture } from "pixi.js";
import { calculatePercentage, createKey, findClosestPoint } from "../../helper";
import { GameObjectEnums } from "../../enums/gameObjectEnums";
import gsap from "gsap";
import { FootballDoor } from "../../gameObjects/footballDoor";
import { GameEventEnums } from "../../enums/gameEvenetEnums";

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
      };
    }
  > = new Map();

  constructor(public footballDor: FootballDoor, public scene: Container) {
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

    this.footballDor.dor.interactive = true;
    this.footballDor.dor.cursor = "pointer";
    this.footballDor.dor.on("click", (event) => {
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
    this.footballDor.dor.on("pointerup", (event) => {
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
      x:
        this.footballDor.x -
        calculatePercentage(33, this.footballDor.dor.width),
      y:
        this.footballDor.y +
        calculatePercentage(30, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "left",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L -41 -23 L -75 -4 L -108 34 L -164 78 M -101 -24",
        },
      },
    });

    this.points.set(createKey([0, 1]), {
      x:
        this.footballDor.x -
        calculatePercentage(34, this.footballDor.dor.width),
      y:
        this.footballDor.y +
        calculatePercentage(10, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "left",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M 5 -10 L -17 6 L -36 36 L -56 82 L -79 101 M -101 -24",
        },
      },
    });

    this.points.set(createKey([0, 2]), {
      x:
        this.footballDor.x -
        calculatePercentage(35, this.footballDor.dor.width),
      y:
        this.footballDor.y -
        calculatePercentage(10, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "left",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M 5 -10 L -19 -9 L -41 -1 L -89 60 L -428 224 M -101 -24",
        },
      },
    });

    this.points.set(createKey([1, 0]), {
      x: this.footballDor.x,
      y:
        this.footballDor.y +
        calculatePercentage(24, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "center",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath: "M 5 -10 L 1 11 L 8 31 L -3 41 L -5 62 M -101 -24",
        },
      },
    });

    this.points.set(createKey([1, 1]), {
      x: this.footballDor.x,
      y:
        this.footballDor.y +
        +calculatePercentage(7, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "center",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L -21 -9 L -29 10 L -40 41 L -50 114 M -101 -24",
        },
      },
    });

    this.points.set(createKey([1, 2]), {
      x: this.footballDor.x,
      y:
        this.footballDor.y -
        calculatePercentage(15, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "center",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 11 -21 L 41 -8 L 68 47 L 90 110 M -101 -24",
        },
      },
    });

    this.points.set(createKey([2, 0]), {
      x:
        this.footballDor.x +
        calculatePercentage(33, this.footballDor.dor.width),
      y:
        this.footballDor.y +
        calculatePercentage(29, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "right",
        height: 0,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 25 -24 L 51 -10 L 87 20 L 115 68 M -101 -24",
        },
      },
    });

    this.points.set(createKey([2, 1]), {
      x:
        this.footballDor.x +
        calculatePercentage(34, this.footballDor.dor.width),
      y:
        this.footballDor.y +
        calculatePercentage(9, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "right",
        height: 1,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 31 -26 L 80 -7 L 131 49 L 263 212 M -101 -24",
        },
      },
    });

    this.points.set(createKey([2, 2]), {
      x:
        this.footballDor.x +
        calculatePercentage(35, this.footballDor.dor.width),
      y:
        this.footballDor.y -
        calculatePercentage(11, this.footballDor.dor.height),
      goalKeeperJumpData: {
        direction: "right",
        height: 2,
      },
      ball: {
        isSave: {
          fallingDawnPath:
            "M -7 -12 L 33 -25 L 90 -11 L 196 49 L 450 138 M -101 -24",
        },
      },
    });
  }

  addTargets() {
    this.points.forEach((point) => {
      const sprite = new Sprite(Texture.from(GameObjectEnums.target));
      sprite.x = point.x;
      sprite.y = point.y;
      sprite.scale = 0.3;

      sprite.anchor = 0.5;
      sprite.alpha = 0;
      sprite.zIndex = 10;

      this.scene.addChild(sprite);

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
        x: 0.34,
        y: 0.34,
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
