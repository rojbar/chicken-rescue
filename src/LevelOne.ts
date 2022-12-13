import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'

export default class LevelOne extends Phaser.Scene {
	constructor() {
		super('level-one')
	}

	create() {
		this.add.image(0, 0, TextureKeys.Background).setOrigin(0, 0)
		this.add.image(20,20,TextureKeys.CollectedEgg).setOrigin(0,0)
		this.add.image(60,20,TextureKeys.UncollectedEgg).setOrigin(0,0)
		this.add.image(70,620,TextureKeys.SmallWoodTile).setOrigin(0,0)
		this.add.image(300,620,TextureKeys.MediumWoodTile).setOrigin(0,0)
		this.add.image(600,620,TextureKeys.LargeWoodTile).setOrigin(0,0)
		this.add.image(40,165, TextureKeys.WoodBox).setOrigin(0,0)
		this.add.image(90,165, TextureKeys.WoodBoxBreakable).setOrigin(0,0)
		this.add.image(10,177, TextureKeys.Rake).setOrigin(0,0)
		this.add.image(0,200, TextureKeys.WallWoodTile).setOrigin(0,0)
	}

}
