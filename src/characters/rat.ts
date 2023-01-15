import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";

enum STATES {
    DEATH = 1,
    RUN_LEFT,
    RUN_RIGHT,
}

export class Rat {
    relatedScene: Phaser.Scene;
    state!: STATES
    rat!: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
    }

    create() {
        this.rat = this.relatedScene.physics.add.sprite(420, 400, TextureKeys.Rat)
        this.rat.setScale(2,2);
        this.rat.setSize(  this.rat.displayWidth-15,      this.rat.displayHeight);
        this.rat.play(AnimationKeys.Running);
        this.state = STATES.RUN_RIGHT;
        this.rat.setCollideWorldBounds(true);
    }

    handleState(){
        switch ( this.state) {
            case STATES.DEATH:
            break
            case STATES.RUN_LEFT:
                this.doRunLeft()
                this.rat.setFlipX(false)

                if (this.isGoingToFallOfBorder() || this.rat.body.touching.left) {
                    this.state = STATES.RUN_RIGHT
                } 
            break
            case STATES.RUN_RIGHT:
                this.doRunRight()
                this.rat.setFlipX(true)

                if (this.isGoingToFallOfBorder() || this.rat.body.touching.right){
                    this.state = STATES.RUN_LEFT;
                }
            break
        }
    }

    isGoingToFallOfBorder(){

        
        return false
    }

    doRunLeft(){
        this.rat.setVelocityX(-190);
    }

    doRunRight(){
        this.rat.setVelocityX(+190);
    }

    getRat(){
        return this.rat;
    }
}