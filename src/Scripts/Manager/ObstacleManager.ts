import * as Phaser from "phaser";
import Obstacle from "../Object/Obstacle";
import PowerUpObject from "../Object/PowerUp/PowerUpObject";
import { PowerUpType } from "../Object/PowerUp/PowerUpType";
import { Grow } from "../Object/PowerUp/PowerUp";
import Runner from "../Object/Runner";

export enum ObstacleType {
  kFence,
  kSaw,
  kCrystal,
  kPowerUp
}

export default class ObstacleManager {
  private m_obstaclePool: Obstacle[] = [];
  private m_runner: Runner;

  private m_spawnEvent : Phaser.Time.TimerEvent;

  constructor(
    scene: Phaser.Scene,
    runner: Runner,
    gameover: () => void,
    addScore: () => void
  ) {
    this.m_runner = runner;
    //initPool
    for (let i = 0; i < 4; i++) {
      //let obs1 = new Obstacle(scene, 0, 500, "saw", true, ObstacleType.kSaw, runner);
      let obs2 = new Obstacle(
        scene,
        0,
        scene.cameras.main.height * 0.6 -  scene.cameras.main.width/20,
        "obstacle",
        false,
        ObstacleType.kFence,
        runner
      );
      let obs3 = new Obstacle(
        scene,
        0,
        scene.cameras.main.height * 0.425,
        "crystal",
        false,
        ObstacleType.kCrystal,
        runner
      );
      let powerUp = new PowerUpObject(
        scene,
        0,
        480,
        "powerup",
        ObstacleType.kPowerUp,
        [new Grow(15, PowerUpType.kGrow)],
        runner,
      );

      //this.m_obstaclePool.push(obs1);
      this.m_obstaclePool.push(obs2);
      this.m_obstaclePool.push(obs3);
      //this.m_obstaclePool.push(powerUp);

     // scene.physics.add.overlap(obs1, runner, gameover);
      scene.physics.add.overlap(obs2, runner, gameover);
      scene.physics.add.overlap(obs3, runner, () =>
        this.addScore(addScore, obs3)
      );

    }

    this.m_spawnEvent = scene.time.addEvent({
      delay: Math.ceil(Math.random() * 1250) + 1500,
      loop: true,
      callback: () => this.generateObstacle()
    });
  }

  private addScore(addScore: () => void, obj: Obstacle) {
    addScore();

    obj.setVisible(false);

    obj.x = 0;

    obj.stop();
  }

  private generateObstacle() {
    let rand = Math.random();

    if (rand < 0.8) {
      this.getObstacleFromPool(ObstacleType.kFence);
    } else {
      this.getObstacleFromPool(ObstacleType.kCrystal);
    } 
  }

  public pause()
  {
    this.m_spawnEvent.paused = true;
  }

  public resume()
  {
    this.m_spawnEvent.paused = false;
  }

  private getObstacleFromPool(type: ObstacleType) {
    for (let i = 0; i < this.m_obstaclePool.length; i++) {
      if (
        !this.m_obstaclePool[i].visible &&
        this.m_obstaclePool[i].Type === type
      ) {
        this.m_obstaclePool[i].activate();
        return;
      }
    }
  }
}
