export default class ParallaxManager
{

    constructor(scene: Phaser.Scene)
    {
        let mountain = scene.add
        .image(0, 500, "mountain")
        .setDepth(-1)
        .setOrigin(0, 0.5);
        let mountain2 = scene.add
        .image(
            scene.cameras.main.width + 2048 - scene.cameras.main.width,
          500,
          "mountain"
        )
        .setDepth(-1)
        .setOrigin(0, 0.5);
        
        let sky = scene.add
        .image(0, 300, "sky")
        .setDepth(-1)
        .setOrigin(0, 0.5)
        .setScale(1.2)
        .setDepth(-2)
        .setAlpha(0.6)
        let sky2 = scene.add
        .image(scene.cameras.main.width, 300, "sky")
        .setDepth(-1)
        .setOrigin(0, 0.5)
        .setScale(1.2)
        .setDepth(-2)
        .setAlpha(0.6)

        scene.tweens.add({
        targets: mountain,
        x: -scene.cameras.main.width - (2048 - scene.cameras.main.width),
        ease: "Linear",
        duration: 11000,
        repeat: -1
        });
        
        scene.tweens.add({
        targets: mountain2,
        x: 0,
        ease: "Linear",
        duration: 11000,
        repeat: -1
        });
        
        scene.tweens.add({
        targets: sky,
        x: -scene.cameras.main.width,
        ease: "Linear",
        duration: 10000,
        repeat: -1
        });
        
        scene.tweens.add({
        targets: sky2,
        x: 0,
        ease: "Linear",
        duration: 10000,
        repeat: -1
        });
        
    }

}

