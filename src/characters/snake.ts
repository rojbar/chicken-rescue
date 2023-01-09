import TextureKeys from "../consts/TextureKeys";

export class Snake {
    relatedScene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
    }

    create() {
        const snake = this.relatedScene.add.sprite(620, 688, TextureKeys.Snake)
        snake.setScale(2.5, 2.5);
        snake.play('snake-idle');
    }
}