import Runner from "../Object/Runner"
import { Scene } from "phaser";

export default class ParallaxManager
{
    private m_mountain:Phaser.GameObjects.Image;
    private m_mountain2:Phaser.GameObjects.Image;
    private m_sky:Phaser.GameObjects.Image;
    private m_sky2:Phaser.GameObjects.Image;
    private m_runner:Runner;

    private m_tween1: Phaser.Tweens.Tween;
    private m_tween2: Phaser.Tweens.Tween;
    private m_tween3: Phaser.Tweens.Tween;
    private m_tween4: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, runner:Runner)
    {   

        this.m_runner = runner;

        this.m_mountain = scene.add
        .image(0, 500, "mountain")
        .setDepth(-1)
        .setOrigin(0, 0.5);
        this.m_mountain2 = scene.add
        .image(
            scene.cameras.main.width + 2048 - scene.cameras.main.width,
          500,
          "mountain"
        )
        .setDepth(-1)
        .setOrigin(0, 0.5);
        
        this.m_sky = scene.add
        .image(0, 300, "sky")
        .setDepth(-1)
        .setOrigin(0, 0.5)
        .setScale(1.2)
        .setDepth(-2)
        .setAlpha(0.6)
        this.m_sky2 = scene.add
        .image(scene.cameras.main.width, 300, "sky")
        .setDepth(-1)
        .setOrigin(0, 0.5)
        .setScale(1.2)
        .setDepth(-2)
        .setAlpha(0.6)


              
        this.m_tween1 = scene.tweens.add({
            targets: this.m_mountain,
            x: -scene.cameras.main.width - (2048 - scene.cameras.main.width),
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
                 
            this.m_tween2 =  scene.tweens.add({
            targets: this.m_mountain2,
            x: 0,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
                  
            this.m_tween3 = scene.tweens.add({
            targets: this.m_sky,
            x: -scene.cameras.main.width,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
           this.m_tween4 = scene.tweens.add({
            targets: this.m_sky2,
            x: 0,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            

            
    }

    public startTween(scene:Scene)
    {      

        this.m_tween1.stop();
        this.m_tween2.stop();
        this.m_tween3.stop();
        this.m_tween4.stop();

        this.m_tween1 = scene.tweens.add({
            targets: this.m_mountain,
            x: -scene.cameras.main.width - (2048 - scene.cameras.main.width),
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
                 
            this.m_tween2 =  scene.tweens.add({
            targets: this.m_mountain2,
            x: 0,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
                  
            this.m_tween3 = scene.tweens.add({
            targets: this.m_sky,
            x: -scene.cameras.main.width,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
           this.m_tween4 = scene.tweens.add({
            targets: this.m_sky2,
            x: 0,
            ease: "Linear",
            duration: 10000/this.m_runner.speed,
            repeat: -1
            });
            
          
    }

}

