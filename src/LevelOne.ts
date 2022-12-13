import Phaser from 'phaser'

export default class LevelOne extends Phaser.Scene {
	constructor() {
		super('level-one')
	}

	preload() {
		this.load.image('background', 'background/2857_1280x720.jpg')
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0)

	}
}
