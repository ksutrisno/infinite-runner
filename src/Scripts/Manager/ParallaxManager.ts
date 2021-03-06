import Runner from "../Object/Runner"

export default class ParallaxManager
{
    private m_mountain:Phaser.GameObjects.Image;
    private m_mountain2:Phaser.GameObjects.Image;
    private m_sky:Phaser.GameObjects.Image;
    private m_sky2:Phaser.GameObjects.Image;
    private m_runner:Runner;



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

        this.startMovement(scene, this.m_mountain, 1, runner, 0, -2048);
        this.startMovement(scene, this.m_mountain2, 1, runner, 2048, 0);   

        this.startMovement(scene, this.m_sky, 0.25, runner, 0, -scene.cameras.main.width);
        this.startMovement(scene, this.m_sky2, 0.25, runner, scene.cameras.main.width, 0);  
    }

    startMovement(scene:Phaser.Scene, object:Phaser.GameObjects.Image,  speed:number, runner:Runner, start:number, end:number)
    {
        scene.time.addEvent(
            {
              delay: 10,
              loop: true,
              callback: ()=>{
                object.x -= speed * runner.speed;
                  
                  if(object.x <= end)
                  {
                        object.x = start;
                  }
              }
            })
        
    }


}

