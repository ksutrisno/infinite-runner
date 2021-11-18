import * as Phaser from "phaser";
import FpsText from "../Object/FpsText";
import Ground from "../Object/Ground";
import Runner from "../Object/Runner";
import ObstacleManager from "../Manager/ObstacleManager";
import ParallaxManager from "../Manager/ParallaxManager";
import AlignTool from "../Util/AlignTool";

enum GameState {
  kInGame,
  kGameover
}

export default class GameScene extends Phaser.Scene {
  private fpsText: FpsText;

  private m_runner: Runner;

  private m_score: number = 0;

  private m_scoreText: Phaser.GameObjects.Text;

  private m_gameState: GameState = GameState.kInGame;

  private m_parallax: ParallaxManager;

  private m_obstacleManager: ObstacleManager;
  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
   // this.fpsText = new FpsText(this);
    let ground = new Ground(this, 0,  this.cameras.main.height * 0.6);
    let ground2 = new Ground(this, this.cameras.main.width, this.cameras.main.height * 0.6);

    this.m_runner = new Runner(this, 300, this.cameras.main.height * 0.4);

    this.startMovement(ground, 6 * devicePixelRatio, this.m_runner, 0, -this.cameras.main.width);

    this.startMovement(ground2, 6 * devicePixelRatio, this.m_runner, this.cameras.main.width, 0);

    this.m_parallax = new ParallaxManager(this, this.m_runner);



    ground.setCollision(this.m_runner, this.m_runner.grounded);
    ground2.setCollision(this.m_runner, this.m_runner.grounded);

  this.m_obstacleManager =  new ObstacleManager(
      this,
      this.m_runner,
      () => this.gameOver(),
      () => this.addScore(300)
    );

    this.m_scoreText = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height * 0.1, this.m_score.toString(), {
        fontSize: "70px",
        color: "black"
      })
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 1500 / this.m_runner.speed,
      loop: true,
      callback: () => this.addScore(100)
    });

   


  }

  private addScore(amount: number) {
    if (this.m_gameState === GameState.kGameover) {
      return;
    }

    this.m_score += amount;
    this.m_scoreText.setText(this.m_score.toString());
  }

  update(): void {
   // this.fpsText.update();

    this.m_runner.update();
  }

  gameOver() {
    this.physics.world.colliders.destroy();

    this.m_obstacleManager.pause();
    this.m_runner.die();

    this.m_gameState = GameState.kGameover;
    this.add
      .text(this.cameras.main.width / 2,  this.cameras.main.height * 0.4, "GAME OVER", {
        fontSize:  "70px",
        color: "black"
      })
      .setOrigin(0.5);

    this.add
      .text(this.cameras.main.width / 2,  this.cameras.main.height * 0.4 + 100, "Tap to Restart", {
        fontSize: "35px",
        color: "black"
      })
      .setOrigin(0.5);

    this.m_runner.jump();
    this.m_runner.speed = 0;

    this.physics.world.colliders.destroy();

    
    this.input.on("pointerdown", () => this.restart());
  }

  restart() {
    this.m_score = 0;
    this.m_gameState = GameState.kInGame;

    
    this.input.removeListener("pointerdown", () => this.restart());

    this.scene.restart();
  }

  startMovement(
    object: Phaser.GameObjects.Container,
    speed: number,
    runner: Runner,
    start: number,
    end: number
  ) {
    this.time.addEvent({
      delay: 10,
      loop: true,
      callback: () => {
        object.x -= speed * runner.speed;

        if (object.x <= end) {
          object.x = start;
        }
      }
    });
  }
}
