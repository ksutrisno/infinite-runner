import * as Phaser from "phaser";
import {PowerUp} from "../Object/PowerUp/PowerUp";
import { PowerUpType } from "./PowerUp/PowerUpType";

export enum RunnerState {
  kRun = "run",
  kJump = "jump",
  kDuck = "duck"
}

export default class Runner extends Phaser.Physics.Arcade.Sprite {
  private m_state: RunnerState = RunnerState.kRun;
  private m_cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private m_powerUpList: Map<PowerUpType, PowerUp> = new Map<
    PowerUpType,
    PowerUp
  >();

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "runner", 0);

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setGravity(0, 350);
    this.setAccelerationY(350);
    this.setSize(70 * this.scale, 80 * this.scale);
    this.setOffset(10, 15);

    var run = {
      key: "run",
      frames: scene.anims.generateFrameNumbers("runner", { start: 2, end: 3 }),
      frameRate: 7,
      yoyo: false,
      repeat: -1
    };

    var jump = {
      key: "jump",
      frames: scene.anims.generateFrameNumbers("runner", { start: 0, end: 1 }),
      frameRate: 4,
      yoyo: false,
      repeat: 0
    };

    var duck = {
      key: "duck",
      frames: scene.anims.generateFrameNumbers("runner", { start: 6, end: 6 }),
      frameRate: 4,
      yoyo: false,
      repeat: 0
    };

    scene.anims.create(run);
    scene.anims.create(jump);
    scene.anims.create(duck);

    this.anims.play("run");

    this.m_cursors = scene.input.keyboard.createCursorKeys();

    this.m_cursors.up.on("down", () => this.jump());
    this.m_cursors.down.on("down", () => this.duck());

    scene.time.addEvent({
      delay: 1000,
      loop: true,

      callback: () => {
        this.m_powerUpList.forEach(element => {
          element.Duration -= 1;

          if (element.Duration <= 0) {
            this.removePowerUp(element);
          }
        });
      }
    });
  }

  public addPowerUp(powerUp: PowerUp) {
    powerUp.onAdded(this);

    if (!this.m_powerUpList.has(powerUp.Type)) {
      this.m_powerUpList.set(powerUp.Type, powerUp);
    } else {
      this.m_powerUpList.get(powerUp.Type).Duration;
    }
  }

  private removePowerUp(powerUp: PowerUp) {
    this.scene.time.addEvent({
      delay: 100,

      callback: () => {
        powerUp.onRemoved(this);

        this.m_powerUpList.delete(powerUp.Type);
      }
    });
  }

  private jump() {
    if (this.m_state === RunnerState.kRun) {
      this.setVelocityY(-450);

      this.setRunnerState(RunnerState.kJump);
    }
  }

  private duck() {
    if (this.m_state === RunnerState.kRun) {
      this.setRunnerState(RunnerState.kDuck);
      this.setSize(80 * this.scale, 55 * this.scale);
      this.setOffset(5, 35);

      this.scene.time.addEvent({
        delay: 850,
        loop: false,
        callback: () => {
          this.setRunnerState(RunnerState.kRun);
          this.setSize(70 * this.scale, 80 * this.scale);
          this.setOffset(10, 15);
          this.y -= 10;
        }
      });
    }
  }

  public die() {}

  grounded = () => {
    if (this.m_state !== RunnerState.kDuck)
      this.setRunnerState(RunnerState.kRun);
  };

  private setRunnerState(state: RunnerState) {
    if (this.m_state !== state) {
      this.m_state = state;

      this.anims.play(state);
    }
  }
}
