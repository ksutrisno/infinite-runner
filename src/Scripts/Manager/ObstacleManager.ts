import Obstacle from "../Object/Obstacle";

enum ObstacleType {
  kRegular,
  kSpinning
}

export default class ObstacleManager {
  private m_regularPool: Obstacle[] = [];
  private m_spinningPool: Obstacle[] = [];

  constructor(scene: Phaser.Scene, runner:Phaser.GameObjects.GameObject, callback:()=>void) {
    //initPool
    for (let i = 0; i < 5; i++) {
      let obs1 = new Obstacle(scene, 0, 500, "saw", true)
      let obs2 = new Obstacle(scene, 0, 575, "obstacle", false)
      this.m_spinningPool.push(obs1);
      this.m_regularPool.push(obs2);

      scene.physics.add.overlap(obs1,runner, callback);
      scene.physics.add.overlap(obs2,runner, callback);
    }

    scene.time.addEvent({
      delay: Math.ceil(Math.random() * 1500) + 1500,
      loop: true,
      callback: () => this.generateObstacle()
    });
  }

  private generateObstacle() {
    let rand = Math.random();

    if (rand < 0.6) {
      this.getObstacleFromPool(ObstacleType.kRegular);
    } else {
      this.getObstacleFromPool(ObstacleType.kSpinning);
    }
  }

  private getObstacleFromPool(type: ObstacleType) {
    if (type === ObstacleType.kRegular) {
      for (let i = 0; i < this.m_regularPool.length; i++) {
        if (!this.m_regularPool[i].visible) {
          this.m_regularPool[i].activate();
          return;
        }
      }
    } else {
      for (let i = 0; i < this.m_spinningPool.length; i++) {
        if (!this.m_spinningPool[i].visible) {
          this.m_spinningPool[i].activate();
          return;
        }
      }
    }
  }
}
