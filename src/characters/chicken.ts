export class Chicken {
    relatedScene: Phaser.Scene;
    player!: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
    }

    create() {
        this.player = this.relatedScene.physics.add.sprite(500, 630, 'chicken');
    }

    getPlayer() {
        return this.player;
    }

    // private chickenControls(){
	// 	if (this.cursors.left.isDown){
	// 		this.chicken.setVelocityX(-160)
	// 		this.chicken.anims.play(AnimationKeys.ChickenLeft, true)
	// 	} else if (this.cursors.right.isDown){
	// 		this.chicken.setVelocityX(160)
	// 		this.chicken.anims.play(AnimationKeys.ChickenRight, true)
	// 	} else {
	// 		this.chicken.setVelocityX(0)
	// 		this.chicken.anims.play(AnimationKeys.ChickenIdle, true)
	// 	}
	// }


}