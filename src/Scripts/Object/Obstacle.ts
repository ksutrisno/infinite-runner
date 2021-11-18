import * as Phaser from "phaser";
import {ObstacleType} from "../Manager/ObstacleManager"
import AlignTool from "../Util/AlignTool";
import Runner  from "./Runner";

export default class Obstacle extends Phaser.GameObjects.Image {
 
  protected m_action : Phaser.Time.TimerEvent;
  private m_type : ObstacleType;
  private m_runner: Runner;
  
  get Type()
  {
    return this.m_type;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    spin: boolean,
    type: ObstacleType,
    runner: Runner
  ) {
    super(scene, x, y, texture);
    
    this.m_runner = runner;
    this.m_type = type;

    if (spin) {
      scene.tweens.add({
        targets: this,
        angle: -360,
        ease: "Linear",
        duration: 1200,
        repeat: -1
      });
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);


    this.setVisible(false);

    this.setDepth(-1);

    AlignTool.scaleToScreenWidth(scene, this, 0.1);
  }

  public activate()
  { 
    this.setVisible(true);
    this.x = this.scene.cameras.main.width;

    this.m_action = this.scene.time.addEvent(
      {
        delay: 10,
        loop: true,
        callback: ()=>{
            this.x -= 6 * this.m_runner.speed * devicePixelRatio;
            
            if(this.x < -5)
            {
              this.setVisible(false);
              this.stop();
            }
        }
      }
    )
  }

  stop()
  {
      this.m_action.destroy();
  }

}
