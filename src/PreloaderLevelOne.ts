import Phaser from 'phaser'
import AnimationKeys from './consts/AnimationKeys'
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

		this.load.spritesheet(TextureKeys.Snake, 'enemies/snake_idle.png',{frameWidth: 12,frameHeight: 12,} )
		this.load.spritesheet(TextureKeys.Chicken, 'characters/chicken/chiken_prites.png',{frameWidth: 50,frameHeight: 50,})
		this.load.spritesheet(TextureKeys.SnakeDeath, 'enemies/snake_death.png',{frameWidth:15, frameHeight:16,})
		this.load.atlas(TextureKeys.Rat,'enemies/ratspritesheet.png', 'enemies/ratsprites.json')
	}

	create() {
		// define animations snake
		this.anims.create({
			key: AnimationKeys.SnakeIdle,
			frames: this.anims.generateFrameNumbers(TextureKeys.Snake,{
				start: 0, 
				end:9,
			}),
			frameRate: 10,
			repeat: -1,
		})

		// this.anims.create({
		// 	key: AnimationKeys.ChickenIdle,
		// 	frames: this.anims.generateFrameNumbers(TextureKeys.Chicken,{
		// 		start: 0, 
		// 		end:9,
		// 	}),
		// 	frameRate: 10,
		// 	repeat: -1,
		// })

		this.anims.create({
			key: AnimationKeys.SnakeDeath,
			frames: this.anims.generateFrameNumbers(TextureKeys.SnakeDeath ,{
				start: 0, 
				end:9,
			}),
			frameRate: 10,
			repeat: -1,
		})

		//define animations rat
		this.anims.create({
			key: AnimationKeys.RatWalking,
			frames: this.anims.generateFrameNames(TextureKeys.Rat, { prefix: 'walk', end: 9, zeroPad: 4 }),
			frameRate: 10, 
			repeat: -1 }
		)

		this.anims.create({
			key: AnimationKeys.RatDeath,
			frames: this.anims.generateFrameNames(TextureKeys.Rat, { prefix: 'death', end: 9, zeroPad: 4 }),
			frameRate: 10, 
			repeat: -1 }
		)



		this.scene.start('level-one')
	}
}
