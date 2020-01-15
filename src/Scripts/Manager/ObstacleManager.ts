import Obstacle from "../Object/Obstacle";

enum ObstacleType {
  kFence,
  kSaw,
  kCrystal
}

export default class ObstacleManager {
  private m_regularPool: Obstacle[] = [];
  private m_spinningPool: Obstacle[] = [];
  private m_crystalPool: Obstacle[] = [];

  constructor(scene: Phaser.Scene, runner:Phaser.GameObjects.GameObject, gameover:()=>void, addScore:()=>void) {
    //initPool
    for (let i = 0; i < 4; i++) {
      let obs1 = new Obstacle(scene, 0, 500, "saw", true)
      let obs2 = new Obstacle(scene, 0, 575, "obstacle", false)
      let obs3 = new Obstacle(scene, 0, 480, "crystal", false )
      this.m_spinningPool.push(obs1);
      this.m_regularPool.push(obs2);
      this.m_crystalPool.push(obs3);
      scene.physics.add.overlap(obs1,runner, gameover);
      scene.physics.add.overlap(obs2,runner, gameover);
      scene.physics.add.overlap(obs3 ,runner, ()=>this.addScore(addScore, obs3));
    }

    scene.time.addEvent({
      delay: Math.ceil(Math.random() * 1500) + 1500,
      loop: true,
      callback: () => this.generateObstacle()
    });
  }

  private addScore(addScore: ()=> void, obj: Obstacle)
  {
        addScore();

        obj.setVisible(false);
        
        obj.x = 0;
        
        obj.stop();
  }

  private generateObstacle() {
    let rand = Math.random();

    if (rand < 0.45) {
      this.getObstacleFromPool(ObstacleType.kFence);
    } else if(rand > 0.45 &&  rand < 0.8) 
    {
      this.getObstacleFromPool(ObstacleType.kSaw);
    }
    else
    {
        this.getObstacleFromPool(ObstacleType.kCrystal);
    }
  }

  private getObstacleFromPool(type: ObstacleType) {
    if (type === ObstacleType.kFence) {
      for (let i = 0; i < this.m_regularPool.length; i++) {
        if (!this.m_regularPool[i].visible) {
          this.m_regularPool[i].activate();
          return;
        }
      }
    } 
    else  if (type === ObstacleType.kSaw)
    {
      for (let i = 0; i < this.m_spinningPool.length; i++) {
        if (!this.m_spinningPool[i].visible) {
          this.m_spinningPool[i].activate();
          return;
        }
      }
    }
    else
    {
        for (let i = 0; i < this.m_crystalPool.length; i++) {
            if (!this.m_crystalPool[i].visible) {
              this.m_crystalPool[i].activate();
              return;
            }
          }
    }
  }
}
