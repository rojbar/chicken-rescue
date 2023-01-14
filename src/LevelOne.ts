import Phaser from 'phaser'
import AnimationKeys from './consts/AnimationKeys'
import TextureKeys from './consts/TextureKeys'
import { Chicken } from './characters/chicken'
import { Snake } from './characters/snake'
import { Rat } from './characters/rat'

export default class LevelOne extends Phaser.Scene {
	constructor() {
		super('level-one')
	}

	platforms!: Phaser.Physics.Arcade.StaticGroup
	eggs!: Phaser.Physics.Arcade.Group
	// snakes!: Phaser.GameObjects.Sprite[]
	chicken!: Chicken
	snake!: Snake
	rat!: Rat


	init() {
		this.chicken = new Chicken(this)
		this.snake = new Snake(this)
		this.rat = new Rat(this)
	}

	create() {
		this.createBackground()

		
		this.chicken.create()
		this.rat.create()
		
		this.initEggs()
		this.initPlatforms()
		this.createFloor()
		this.createLevelPlatforms()
		this.createLevelBoxes()
		this.createEggs()
		this.createLevelBreakableBoxes()
		this.createLevelRakes()
		
	
		this.snake.create()
		// this.createRats()
	}

	update() {
		this.chicken.chickenControls()
		this.rat.handleState()
	}

	private initPlatforms() {
		this.platforms = this.physics.add.staticGroup()
		this.physics.add.collider(this.chicken.getPlayer(), this.platforms)
		this.physics.add.collider(this.rat.getRat(), this.platforms)
		this.physics.add.collider(this.eggs, this.platforms)
	}

	private initEggs() {
		this.eggs = this.physics.add.group()
		this.physics.add.collider(this.eggs, this.chicken.getPlayer(), this.collectEgg, undefined, this)
	}

	private collectEgg(chicken: Phaser.GameObjects.GameObject, egg: Phaser.GameObjects.GameObject) {
		egg.destroy()
	}

	private createBackground() {
		this.add.image(0, 0, TextureKeys.Background).setOrigin(0, 0)
	}

	private createFloor() {
		let base = 180
		for (let index = 0; index < 8; index++) {
			const platform = this.platforms.create(base * (index), 713, TextureKeys.LargeWoodTile)
			platform.body.updateFromGameObject()
		}
	}

	private createLevelPlatforms() {
		const firstRowX = 130
		const firstRowY = 660

		this.platforms.create(firstRowX, firstRowY, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 80, firstRowY - 60, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 190, firstRowY - 25, TextureKeys.SmallWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 340, firstRowY - 80, TextureKeys.LargeWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 395, firstRowY - 20, TextureKeys.SmallWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 510, firstRowY - 150, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 720, firstRowY - 150, TextureKeys.MediumWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 910, firstRowY, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 880, firstRowY - 180, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 1010, firstRowY - 230, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 880, firstRowY - 300, TextureKeys.SmallWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 640, firstRowY - 290, TextureKeys.LargeWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 430, firstRowY - 290, TextureKeys.LargeWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 215, firstRowY - 290, TextureKeys.LargeWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 35, firstRowY - 325, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX - 110, firstRowY - 365, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 15, firstRowY - 435, TextureKeys.SmallWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 175, firstRowY - 460, TextureKeys.MediumWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 355, firstRowY - 430, TextureKeys.LargeWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 575, firstRowY - 470, TextureKeys.SmallWoodTile).body.updateFromGameObject()
		this.platforms.create(firstRowX + 795, firstRowY - 430, TextureKeys.LargeWoodTile).body.updateFromGameObject()

		this.platforms.create(firstRowX + 1055, firstRowY - 520, TextureKeys.SmallWoodTile)
		this.platforms.create(firstRowX + 1110, firstRowY - 520, TextureKeys.SmallWoodTile)

		const wallWoodImage = this.add.image(firstRowX + 1085, firstRowY - 500, TextureKeys.WallWoodTile)
		wallWoodImage.flipX = !wallWoodImage.flipX

		const lastSmall = this.platforms.create(firstRowX + 952, firstRowY - 470, TextureKeys.SmallWoodTile)
		lastSmall.setScale(0.5)
		lastSmall.body.updateFromGameObject()
	}

	private createLevelBoxes() {
		const firstRowX = 130
		const firstRowY = 680

		this.platforms.create(firstRowX + 230, firstRowY, TextureKeys.WoodBox).body.updateFromGameObject()
		this.platforms.create(firstRowX + 408, firstRowY - 132, TextureKeys.WoodBox).body.updateFromGameObject()
		this.platforms.create(firstRowX + 550, firstRowY, TextureKeys.WoodBox).body.updateFromGameObject()
		this.platforms.create(firstRowX + 595, firstRowY, TextureKeys.WoodBox).body.updateFromGameObject()
		this.platforms.create(firstRowX + 640, firstRowY, TextureKeys.WoodBox).body.updateFromGameObject()
		this.platforms.create(firstRowX + 215, firstRowY - 342, TextureKeys.WoodBox).body.updateFromGameObject()
	}

	private createLevelBreakableBoxes() {
		const firstRowX = 130
		const firstRowY = 680
		this.platforms.create(firstRowX + 685, firstRowY, TextureKeys.WoodBoxBreakable).body.updateFromGameObject()
		this.platforms.create(firstRowX + 1125, firstRowY, TextureKeys.WoodBoxBreakable).body.updateFromGameObject()
	}

	private createLevelRakes() {
		const firstRowX = 845
		const firstRowY = 485
		this.platforms.create(firstRowX - 38, firstRowY, TextureKeys.Rake).body.updateFromGameObject()

		const secondRowX = 1000
		const secondRowY = 688
		this.platforms.create(secondRowX, secondRowY, TextureKeys.Rake).body.updateFromGameObject()
		this.platforms.create(secondRowX + 80, secondRowY, TextureKeys.Rake).body.updateFromGameObject()

		const thirdRowX = 630
		const thirdRowY = 345
		this.platforms.create(thirdRowX + 3, thirdRowY, TextureKeys.Rake).body.updateFromGameObject()
		this.platforms.create(thirdRowX + 180, thirdRowY, TextureKeys.Rake).body.updateFromGameObject()

		this.platforms.create(thirdRowX - 630, thirdRowY - 75, TextureKeys.Rake).body.updateFromGameObject()
		this.platforms.create(thirdRowX - 280, thirdRowY - 170, TextureKeys.Rake).body.updateFromGameObject()
	}

	private createEggs() {
		const egg1 = this.eggs.create(210, 578, TextureKeys.CollectedEgg)
		egg1.setScale(0.65)
		egg1.body.updateFromGameObject()

		const egg2 = this.eggs.create(525, 618, TextureKeys.CollectedEgg)
		egg2.setScale(0.65)
		egg2.body.updateFromGameObject()

		const egg3 = this.eggs.create(1255, 680, TextureKeys.CollectedEgg)
		egg3.setScale(0.65)
		egg3.body.updateFromGameObject()

		const egg4 = this.eggs.create(1010, 338, TextureKeys.CollectedEgg)
		egg4.setScale(0.65)
		egg4.body.updateFromGameObject()

		const egg5 = this.eggs.create(30, 272, TextureKeys.CollectedEgg)
		egg5.setScale(0.65)
		egg5.body.updateFromGameObject()

		const egg6 = this.eggs.create(705, 166, TextureKeys.CollectedEgg)
		egg6.setScale(0.65)
		egg6.body.updateFromGameObject()
	}

}
