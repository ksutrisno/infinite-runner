import "phaser";
import GameScene from "./Scene/GameScene";
import PreloadScene from "./Scene/PreloadScene";
import {getResolution} from './Util/Util'
type GameConfig = Phaser.Types.Core.GameConfig;



const config: GameConfig = {
  title: "PhaserGame",
  scale: {
    parent: "game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: getResolution().width,
    height: getResolution().height,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#8bd6e0",
  scene: [PreloadScene, GameScene]
 
};

export class PhaserGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  let game = new PhaserGame(config);
};
