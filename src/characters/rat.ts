import TextureKeys from "../consts/TextureKeys";

export class Rat {
    relatedScene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
    }

    create() {
        const rat = this.relatedScene.add.sprite(420, 558, TextureKeys.Rat)
        rat.setScale(2.5, 2.5);
        rat.play('rat-walking');
    }
}