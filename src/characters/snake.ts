import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import EnemyInterface from "./EnemyInterface";

enum STATES {
    DEATH = 1,
    RUN_LEFT,
    RUN_RIGHT,
    ATTACK,
    IDLE,
}

export class Snake implements EnemyInterface{
    relatedScene: Phaser.Scene;
    state: STATES
    snake!: Phaser.Physics.Arcade.Sprite;
    changeState: boolean
    checkBorderBox!: Phaser.GameObjects.Rectangle; 

    constructor(scene: Phaser.Scene) {
        this.state = STATES.IDLE
        this.relatedScene = scene;
        this.changeState = true;
    }

    create( x :integer, y :integer) {
        this.snake = this.relatedScene.physics.add.sprite(x, y, TextureKeys.Snake)
        this.snake.setScale(2.5, 2.5);
        this.snake.setSize(this.snake.displayWidth - 15, this.snake.displayHeight - 20);
        this.snake.play(AnimationKeys.SnakeIdle);
        this.snake.setCollideWorldBounds(true);
        this.createCheckBordersBox()
    }


    handleState() {
        this.updateCheckBorderBox(this.state)
        switch (this.state) {
            case STATES.DEATH:
                break
            case STATES.RUN_LEFT:
                this.doRunLeft()
                this.snake.setFlipX(false)
                this.randomFlip()
                if (this.isGoingToFallOfBorder() || this.snake.body.touching.left) {
                    this.state = STATES.RUN_RIGHT
                }
                break
            case STATES.RUN_RIGHT:
                this.doRunRight()
                this.snake.setFlipX(true)
                this.randomFlip()
                if (this.isGoingToFallOfBorder() || this.snake.body.touching.right) {
                    this.state = STATES.RUN_LEFT;
                }
                break
            case STATES.IDLE:
                let rng = Math.floor(Math.random() * 2)
                console.log(rng);
                if(rng < 1){
                    this.snake.play(AnimationKeys.SnakeAttack)
                    this.state=STATES.ATTACK
                    console.log('TATAKAE')
                }else{
                    let aux = Math.floor(Math.random()*2)
                    console.log(aux);
                    this.snake.play(AnimationKeys.SnakeWalking)
                    if(aux < 1){
                        this.state = STATES.RUN_LEFT
                    }else{
                        
                        this.state = STATES.RUN_RIGHT
                    }

                }
            case STATES.ATTACK:
                this.doAttack()
                this.randomFlip()
        }
    }
     // Create attack bounds
    createCheckBordersBox(){
        this.checkBorderBox = this.relatedScene.add.rectangle(this.snake.x, this.snake.y+30, 20, 10, 0xff0000, 0.5);

        this.checkBorderBox.setOrigin(0.5, 0.5);
        this.checkBorderBox.setActive(true);
        this.checkBorderBox.setVisible(false);

        this.relatedScene.physics.world.enable(this.checkBorderBox, Phaser.Physics.Arcade.STATIC_BODY);

    }

    updateCheckBorderBox(side: STATES){
        switch(side){
            case STATES.RUN_LEFT:
                this.checkBorderBox.body.position.x = this.snake.x - 38
                this.checkBorderBox.body.position.y = this.snake.y +15
            break
            case STATES.RUN_RIGHT:

                this.checkBorderBox.body.position.x = this.snake.x + 18
                this.checkBorderBox.body.position.y = this.snake.y +15    
            break
        }
    }

    doRunLeft() {
        this.snake.setVelocityX(-120);
    }

    doRunRight() {
        this.snake.setVelocityX(+120);
    }

    doAttack(){
        this.snake.setVelocityX(0);
    }

    getEnemy() {
        return this.snake;
    }

    randomFlip() {
        if (this.changeState == true) {
            this.changeState = false
            this.relatedScene.time.addEvent({
                delay: this.gensnakeeRandomNumber(1000, 3000),                // ms
                callback: () => {
                    if (this.getEnemy().active) {
                        this.snake.play(AnimationKeys.SnakeIdle)
                        this.state = STATES.IDLE
                        this.changeState = true
                    }
                },
                callbackScope: this,
                loop: false
            });
        }
    }

    gensnakeeRandomNumber (min: number, max: number) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

  
    isGoingToFallOfBorder() {
        return  !this.relatedScene.physics.overlap(this.checkBorderBox, this.relatedScene.platforms)

        return false
    }
}