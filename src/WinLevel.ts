import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'

export default class WinLevel extends Phaser.Scene{

    constructor(){
        super('win');
    }

    create(){
        this.add.image(0, 0, TextureKeys.Win).setOrigin(0, 0)
        this.input.on('pointerdown', () => this.restart())
    }

    restart(){
        this.scene.start('level-one')
    }
}