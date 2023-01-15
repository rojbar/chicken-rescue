import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

enum STATES {
    DEATH = 1,
    RUN_LEFT,
    RUN_RIGHT,
    ATTACK,
    IDLE,
}

export class Snake {
    relatedScene: Phaser.Scene;
    state: STATES
    snake!: Phaser.Physics.Arcade.Sprite;
    changeState: boolean

    constructor(scene: Phaser.Scene) {
        this.state = STATES.IDLE
        this.relatedScene = scene;
        this.changeState = true;
    }

    create() {
        this.snake = this.relatedScene.physics.add.sprite(620, 688, TextureKeys.Snake)
        this.snake.setScale(2.5, 2.5);
        this.snake.setSize(this.snake.displayWidth - 15, this.snake.displayHeight - 20);
        this.snake.play(AnimationKeys.SnakeIdle);
        this.snake.setCollideWorldBounds(true);
    }

    handleState() {
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
                if (rng < 1) {
                    return
                }
                let aux = Math.floor(Math.random() * 2)
                console.log(aux);
                this.snake.play(AnimationKeys.SnakeWalking)
                if (aux < 1) {
                    this.state = STATES.RUN_LEFT
                } else {

                    this.state = STATES.RUN_RIGHT
                }

        }
    }

    isGoingToFallOfBorder() {


        return false
    }

    doRunLeft() {
        this.snake.setVelocityX(-190);
    }

    doRunRight() {
        this.snake.setVelocityX(+190);
    }

    getSnake() {
        return this.snake;
    }


    genrateRandomNumber(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomFlip() {
        if (this.changeState == true) {
            this.changeState = false
            this.relatedScene.time.addEvent({
                delay: this.genrateRandomNumber(1000, 3000),                // ms
                callback: () => {
                    if (this.getSnake().active) {
                        this.snake.play(AnimationKeys.SnakeIdle)
                        this.state = STATES.IDLE
                        this.changeState = true
                    }
                },
                //args: [],
                callbackScope: this,
                //repeat: 1
                loop: false
            });
        }
    }

}