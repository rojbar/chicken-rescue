import TextureKeys from "../consts/TextureKeys";

export class Chicken {
    relatedScene: Phaser.Scene;
    player!: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
        this.cursors = this.relatedScene.input.keyboard.createCursorKeys();
        this.spacebar = this.relatedScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        this.player = this.relatedScene.physics.add.sprite(500, 630, TextureKeys.Chicken);
        this.player.setCollideWorldBounds(true);
    }

    getPlayer() {
        return this.player;
    }

    chickenControls() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            //	this.chicken.anims.play(AnimationKeys.ChickenLeft, true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            //	this.chicken.anims.play(AnimationKeys.ChickenRight, true)
        } else if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.setVelocity(0, -350);
        }
        else {
            this.player.setVelocityX(0)
            //	this.chicken.anims.play(AnimationKeys.ChickenIdle, true)
        }
    }


}