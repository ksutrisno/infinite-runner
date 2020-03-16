import Obstacle from "../Obstacle";
import { PowerUp } from "./PowerUp";
import { ObstacleType } from "../../Manager/ObstacleManager";

export default class PowerUpObject extends Obstacle {
 
  private m_powerUps: PowerUp[] = [];

  get powerUps()
  {
      return this.m_powerUps;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: ObstacleType,
    powerUp:PowerUp[]
  ) {
    super(scene, x, y, texture,  false, type);

    this.m_powerUps = powerUp;
  }


}
