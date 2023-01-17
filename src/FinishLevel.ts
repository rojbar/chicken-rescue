import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'

export default class FinishLevel extends Phaser.Scene{

    constructor(){
        super('finish');
    }

    create(){
        this.add.image(0, 0, TextureKeys.GameOver).setOrigin(0, 0)
        this.input.on('pointerdown', () => this.restart())
    }

    restart(){
        this.scene.start('level-one')
    }
}