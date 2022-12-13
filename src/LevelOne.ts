import Phaser from 'phaser'

export default class LevelOne extends Phaser.Scene {
	constructor() {
		super('level-one')
	}

	preload() {
		this.load.image('background', 'background/2857_1280x720.jpg')
		this.load.image('small_wood', 'assets/wood_small_platform.jpg')
		this.load.image('medium_wood', 'assets/wood_medium_platform.jpg')
		this.load.image('large_wood', 'assets/wood_large_platform.jpg')
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0)
		this.add.image(70,620,'small_wood').setOrigin(0,0)
		this.add.image(300,620,'medium_wood').setOrigin(0,0)
		this.add.image(600,620,'large_wood').setOrigin(0,0)

	}
}
