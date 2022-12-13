import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'

export default class PreloaderLevelOne extends Phaser.Scene {
	constructor() {
		super('preloader-level-one')
	}

	preload() {

		// load resources
		this.load.image(TextureKeys.Background, 'background/2857_1280x720.jpg')
		this.load.image(TextureKeys.SmallWoodTile, 'assets/wood_small_platform.jpg')
		this.load.image(TextureKeys.MediumWoodTile, 'assets/wood_medium_platform.jpg')
		this.load.image(TextureKeys.LargeWoodTile, 'assets/wood_large_platform.jpg')
		this.load.image(TextureKeys.WallWoodTile, 'assets/wall_wood_platform.png')
		this.load.image(TextureKeys.WoodBox, 'assets/wood_box.png')
		this.load.image(TextureKeys.WoodBoxBreakable, 'assets/wood_box_broken.png')
		this.load.image(TextureKeys.Rake, 'assets/rake.png')
		this.load.image(TextureKeys.CollectedEgg, 'assets/collected_egg.png')
		this.load.image(TextureKeys.UncollectedEgg, 'assets/uncollected_egg.png')
	
		// define animations
	}

	create() {
		this.scene.start('level-one')
	}
}
