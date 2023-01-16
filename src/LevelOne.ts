import Phaser from 'phaser'
import TextureKeys from './consts/TextureKeys'
import { Chicken } from './characters/chicken'
import { Snake } from './characters/snake'
import { Rat } from './characters/rat'
import EnemyInterface from './characters/EnemyInterface'
export default class LevelOne extends Phaser.Scene {
	platforms!: Phaser.Physics.Arcade.StaticGroup
	destroyableBoxes!: Phaser.Physics.Arcade.StaticGroup

	rakesGroup!: Phaser.Physics.Arcade.StaticGroup
	enemiesGroup!: Phaser.Physics.Arcade.Group
	enemies!: EnemyInterface[]
	
	eggs!: Phaser.Physics.Arcade.StaticGroup
	chicken!: Chicken

	score!: 0
	scoreText!: Phaser.GameObjects.Text
	timeText!: Phaser.GameObjects.Text
	timer!: {
		minutes: integer,
		seconds: integer,
	}

	constructor() {
		super('level-one')
	}

	init() {
		this.platforms = this.physics.add.staticGroup()
		this.destroyableBoxes = this.physics.add.staticGroup()

		this.rakesGroup = this.physics.add.staticGroup()
		this.enemiesGroup = this.physics.add.group()
		this.enemies = []

		this.eggs = this.physics.add.staticGroup()
		this.chicken = new Chicken(this)

		this.score = 0
		this.timer = {
			minutes: 2,
			seconds: 30
		}
	}

	create() {
		this.createBackground()
		this.createTimer()

		this.createRakes()
		this.createFloor()
		this.createPlatforms()
		this.createBoxes()
		this.createEggs()
		this.createDestroyableBoxes()
		
		this.createChicken() // MUST BE SINCE CALLS chicken.Create()
		this.createEnemies()
	}

	update() {
		this.chicken.chickenControls()

		for (let i = 0; i < this.enemies.length; i++) {
			if(this.enemies[i].getEnemy().active){
				this.enemies[i].handleState();
			}
		}
		
		this.destroyBox()
		this.destroyEnemy()
	}

	private gameOver(minute: integer, score: integer){
		if(minute == 0 && score != 5){
			this.scene.start('finish');
		}
	}

	private createBackground() {
		this.add.image(0, 0, TextureKeys.Background).setOrigin(0, 0)
	} 

	private createTimer(){
		this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.updateTime();
            }
        });

			
		this.scoreText = this.add.text(250, 20, 'Eggs: 0 / 5', {
			fontSize: '30px',
			fontFamily: 'verdana, arial, san-serif'
		})

		this.timeText = this.add.text(20, 20, 'Time: '+this.timer.minutes+":"+this.timer.seconds, {
			fontSize: '30px',
			fontFamily: 'verdana, arial, san-serif'
		})
	}

	private updateTime() {
		this.timer.seconds --

        if (this.timer.seconds <= 0) {
			this.timer.seconds = 60;
			this.timer.minutes--;
        }

        this.updateTimeText();
		this.gameOver(this.timer.minutes, this.score);
    }

	private updateTimeText(){
		let minutesText = this.timer.minutes.toString()
		if(this.timer.minutes < 10){
			minutesText = "0" + minutesText
		}

		let secondsText = this.timer.seconds.toString()
		if(this.timer.seconds < 10){
			secondsText = "0" + secondsText
		}

		this.timeText.setText('Time: '+minutesText+":"+secondsText)
	}

	private createChicken(){
		this.chicken.create()
		this.physics.add.collider(this.chicken.getPlayer(), this.platforms)
		this.physics.add.collider(this.chicken.getPlayer(), this.enemiesGroup, this.chicken.handleEnemyCollission, undefined, this.chicken)
		this.physics.add.collider(this.chicken.getPlayer(), this.rakesGroup, this.chicken.handleEnemyCollission, undefined, this.chicken)
		this.physics.add.collider(this.chicken.getPlayer(), this.eggs, this.collectEgg, undefined, this)
		this.physics.add.collider(this.chicken.getPlayer(), this.destroyableBoxes)
	}

	private createEnemies(){
		let positionsType = {
			Snake: [ 
				{ x: 320,y: 680,},
				{ x: 1200 ,y: 680,},
			],
			Rat : [ 
				{ x: 420,y: 680,},
				{ x: 420,y: 500,},
				{ x: 460,y: 680,},
				{ x: 730 ,y: 680,},
			],
		}

		for (let i = 0; i < positionsType.Snake.length; i++) {
			let snake = new Snake(this)
			snake.create(positionsType.Snake[i].x,positionsType.Snake[i].y) 
			this.enemies.push(snake)
		}

		for (let i = 0; i < positionsType.Rat.length; i++) {
			let rat = new Rat(this)
			rat.create(positionsType.Rat[i].x,positionsType.Rat[i].y)
			this.enemies.push(rat)
		}
		for(let i =0; i < this.enemies.length; i++){
			this.enemiesGroup.add(this.enemies[i].getEnemy())
		}

		this.physics.add.collider(this.enemiesGroup, this.platforms)
		this.physics.add.collider(this.enemiesGroup, this.rakesGroup)
		this.physics.add.collider(this.enemiesGroup, this.destroyableBoxes)
	}


	private collectEgg(chicken: Phaser.GameObjects.GameObject, egg: Phaser.GameObjects.GameObject) {
		egg.destroy()
		this.score ++
		this.scoreText.setText('Eggs: ' + this.score + ' / 5')
		if (this.score == 5){
			this.scene.start('win');
		}
	}

	private createFloor() {
		let base = 180
		for (let index = 0; index < 8; index++) {
			const platform = this.platforms.create(base * (index), 713, TextureKeys.LargeWoodTile)
			platform.body.updateFromGameObject()
		}
	}

	private createPlatforms() {
		let positions = [
			{x: 140, y:669, texture: TextureKeys.SmallWoodTile},
			{x: 450, y:570, texture: TextureKeys.LargeWoodTile},
			{x: 525, y:650, texture: TextureKeys.SmallWoodTile},
			{x: 640, y:510, texture: TextureKeys.SmallWoodTile},
			{x: 850, y:510, texture: TextureKeys.MediumWoodTile},
			{x: 1040, y:660, texture: TextureKeys.SmallWoodTile},
			{x: 1010, y:480, texture: TextureKeys.SmallWoodTile},
			{x: 1140, y:430, texture: TextureKeys.SmallWoodTile},
			{x: 1010, y:360, texture: TextureKeys.SmallWoodTile},
			{x: 770, y:370, texture: TextureKeys.LargeWoodTile},
			{x: 560, y:370, texture: TextureKeys.LargeWoodTile},
			{x: 345, y:370, texture: TextureKeys.LargeWoodTile},
			{x: 165, y:335, texture: TextureKeys.SmallWoodTile},
			{x: 20, y:295, texture: TextureKeys.SmallWoodTile},
			{x: 145, y:225, texture: TextureKeys.SmallWoodTile},
			{x: 305, y:200, texture: TextureKeys.MediumWoodTile},
			{x: 485, y:230, texture: TextureKeys.LargeWoodTile},
			{x: 705, y:190, texture: TextureKeys.SmallWoodTile},
			{x: 925, y:230, texture: TextureKeys.LargeWoodTile},
			{x: 1185, y:140, texture: TextureKeys.SmallWoodTile},
			{x: 1240, y:140, texture: TextureKeys.SmallWoodTile},	
		]

		for (let i = 0; i < positions.length; i++) {
			this.platforms.create(positions[i].x, positions[i].y, positions[i].texture).body.updateFromGameObject()	
		}

		const wallWoodImage = this.add.image(1215, 160, TextureKeys.WallWoodTile)
		wallWoodImage.flipX = !wallWoodImage.flipX

		const lastSmall = this.platforms.create(1082, 190, TextureKeys.SmallWoodTile)
		lastSmall.setScale(0.5)
		lastSmall.body.updateFromGameObject()
	}

	private createBoxes() {
		let positions = [
			{x: 360, y:680},
			{x: 538,y:680},
			{x: 680, y:680},
			{x: 725,y:680},
			{x: 770, y:680},
			{x: 315,y:680},
		]

		for (let i = 0; i < positions.length; i++) {
			this.platforms.create(positions[i].x, positions[i].y, TextureKeys.WoodBox).body.updateFromGameObject()	
		}
	}

	private createDestroyableBoxes() {
		let positions = [
			{x: 815, y:680},
			{x: 1255,y:680},
		]

		for (let i = 0; i < positions.length; i++) {
			this.destroyableBoxes.create(positions[i].x, positions[i].y, TextureKeys.WoodBoxBreakable).body.updateFromGameObject()	
		}
	}

	private createRakes() {
		let positions = [
			{x: 807, y:485},
			{x: 1000,y:688},
			{x: 633, y:345},
			{x: 810, y:345},
			{x: 0, y:270},
			{x: 350, y:175},
		]

		for (let i = 0; i < positions.length; i++) {
			this.rakesGroup.create(positions[i].x, positions[i].y, TextureKeys.Rake).body.updateFromGameObject()	
		}
	}

	private createEggs() {
		let positions = [
			{x: 260, y:690},
			{x: 525, y:618},
			{x: 1255, y:680},
			{x: 1010, y:338},
			{x: 705, y:166},
		]

		for (let i = 0; i < positions.length; i++) {
			const egg = this.eggs.create(positions[i].x, positions[i].y, TextureKeys.CollectedEgg)
			egg.setScale(0.65)
			egg.body.updateFromGameObject()
		}
	}

	private destroyBox() {
		let attackState = this.chicken.getAttackState() 
		if (attackState.isAttacking) {
			this.physics.add.collider(attackState.attackBox, this.destroyableBoxes, function (attackBox, destroyableBox) {
				destroyableBox.destroy()
			}, undefined, this)
		}
	}

	private destroyEnemy() {
		let attackState = this.chicken.getAttackState()
		
		if (attackState.isAttacking) {
			this.physics.add.overlap(attackState.attackBox, this.enemiesGroup, function (attackBox, enemy) {
				enemy.destroy()
			}, undefined, this)
		}
	}

}
