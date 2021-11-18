import * as Phaser from "phaser";
import {PowerUp} from "../Object/PowerUp/PowerUp";
import { PowerUpType } from "./PowerUp/PowerUpType";
import GameScene from "../Scene/GameScene";
import AlignTool from "../Util/AlignTool";

export enum RunnerState {
  kRun = "run",
  kJump = "jump",
  kDuck = "duck"
}

export default class Runner extends Phaser.Physics.Arcade.Sprite {
  private m_state: RunnerState = RunnerState.kRun;
  private m_cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private m_speed:number = 1;

  private m_gameScene:GameScene;

  public get speed(): number  {
		return this.m_speed;
  }
  public set speed(speed:number)  {
     this.m_speed = speed;
    
	}

  private m_powerUpList: Map<PowerUpType, PowerUp> = new Map<
    PowerUpType,
    PowerUp
  >();

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, "runner", 0);

    scene.add.existing(this);

    scene.physics.add.existing(this);

    this.setGravity(0, 350);
    this.setAccelerationY(350);

    
    AlignTool.scaleToScreenWidth(scene, this, 0.15);

    this.setOrigin(0.5, 0.5);
    this.setSize(this.width * 0.7, this.height);

    this.m_gameScene = scene;

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


    this.scene.input.on("pointerdown", () => this.jump());


    scene.time.addEvent({
      delay: 1000,
      loop: true,

      callback: () => {
        this.m_powerUpList.forEach(element => {
          element.CurrentDuration -= 1;

          if (element.CurrentDuration <= 0) {
            this.removePowerUp(element);
          }
        });
      }
    });
  }

  public addPowerUp(powerUps: PowerUp[]) {

   
    powerUps.forEach(powerUp => {
      if (!this.m_powerUpList.has(powerUp.Type)) {
        this.m_powerUpList.set(powerUp.Type, powerUp);
        powerUp.onAdded(this);
      } else {
        this.m_powerUpList.get(powerUp.Type).Duration;
      }
  });


   
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

  public jump() {
    if (this.m_state === RunnerState.kRun) {
      this.setVelocityY(-500);

      this.setRunnerState(RunnerState.kJump);
    }
  }

  private duck() {
    if (this.m_state === RunnerState.kRun) {
      this.setRunnerState(RunnerState.kDuck);
      this.setSize(80, 55);
      this.setOffset(5, 35);

      this.scene.time.addEvent({
        delay: 850,
        loop: false,
        callback: () => {
          this.setRunnerState(RunnerState.kRun);
          this.setSize(70, 80);
          this.setOffset(10, 15);
          this.y -= 10;
        }
      });
    }
  }

  public die() {
    
  }

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
