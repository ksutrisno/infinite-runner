import * as Phaser from "phaser";
import FpsText from "../Object/FpsText";
import Ground from "../Object/Ground";
import Runner from "../Object/Runner";
import ObstacleManager from "../Manager/ObstacleManager";
import ParallaxManager from "../Manager/ParallaxManager";

export default class GameScene extends Phaser.Scene {
  private fpsText: FpsText;

  private m_runner: Runner;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
    this.fpsText = new FpsText(this);
    let ground = new Ground(this, 0, 600);
    let ground2 = new Ground(this, this.cameras.main.width, 600);

    this.m_runner = new Runner(this, 300, 300);

    new ParallaxManager(this);
    ground.setCollision(this.m_runner, this.m_runner.grounded);
    ground2.setCollision(this.m_runner, this.m_runner.grounded);

    this.tweens.add({
      targets: ground,
      x: -this.cameras.main.width,
      ease: "Linear",
      duration: 3500,
      repeat: -1
    });

    this.tweens.add({
      targets: ground2,
      x: 0,
      ease: "Linear",
      duration: 3500,
      repeat: -1
    });
    new ObstacleManager(this, this.m_runner, () => this.gameOver());
  }

  update(): void {
    this.fpsText.update();

    this.m_runner.update();
  }

  gameOver() {
    this.m_runner.die();
    this.game.scene.pause("GameScene");
    this.add
      .text(this.cameras.main.width / 2, 300, "GAME OVER", { fontSize: 60, color: "black"})
      .setOrigin(0.5);
  }
}
