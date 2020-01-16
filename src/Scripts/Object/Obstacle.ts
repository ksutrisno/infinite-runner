import * as Phaser from "phaser";
import {ObstacleType} from "../Manager/ObstacleManager"

export default class Obstacle extends Phaser.GameObjects.Image {
 
  protected m_action : Phaser.Tweens.Tween;
  private m_type : ObstacleType;
  
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
    type: ObstacleType
  ) {
    super(scene, x, y, texture);
    
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
  }

  public activate()
  { 
    this.setVisible(true);
    this.x = this.scene.cameras.main.width;

    this.m_action = this.scene.tweens.add({
        targets: this,
        x: 0,
        ease: "Linear",
        duration: 3500,
        repeat: 0,
        onComplete: ()=> this.setVisible(false)
      });
  }

  stop()
  {
    this.m_action.stop();
  }

}
