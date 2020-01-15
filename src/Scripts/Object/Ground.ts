import * as Phaser from 'phaser';


const k_width = 1200;

export default class Ground extends Phaser.GameObjects.Container 
{   
    private top: Phaser.Physics.Arcade.Image[];

    constructor(scene:Phaser.Scene, x:number, y:number)
    {
        let grounds = [];
        let top = []
        for(let i = 0; i < k_width/64; i++)
        {   
            let ground:Phaser.Physics.Arcade.Image = scene.physics.add.image(64* i , 0, "grass");
            ground.setOrigin(0);
            grounds.push(ground);
            top.push(ground);
            ground.setImmovable(true);
        
        }

        for(let j = 0; j < 3; j++)
        {
            for(let i = 0; i < k_width/64; i++)
            {   
                let ground:Phaser.GameObjects.Image = scene.add.image(64* i , 64 + 64 * j, "dirt");
                ground.setOrigin(0);
                grounds.push(ground);
            }
        }
      
        super(scene, x , y , grounds);
        this.top = top;

        scene.add.existing(this);
    

    }

    setCollision(object: Phaser.Physics.Arcade.Sprite, callback: ()=>void)
    {
        for(let i = 0; i < this.top.length; i++)
        {
            this.scene.physics.add.collider(object, this.top[i], callback);

        
        }
       
    }

}