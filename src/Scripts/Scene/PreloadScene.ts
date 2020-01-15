import * as Phaser from "phaser"

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
        this.load.path = "src/Assets/";
        this.load.image("grass" , "grass.png");
        this.load.image("dirt" , "dirt.png");
        this.load.image("saw" , "saw.png");
        this.load.image("crystal" , "crystal.png");
        this.load.image("obstacle" , "obstacle.png");
        this.load.image("mountain" , "parallaxMountain.png");
        this.load.image("sky" , "sky.jpg");
        this.load.spritesheet("runner", "runner.png", {
          frameWidth: 96,
          frameHeight: 96,
        });
  }

  create(): void {
    this.scene.start("GameScene");
  }
}
