import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import EnemyInterface from "./EnemyInterface";

enum STATES {
    DEATH = 1,
    RUN_LEFT,
    RUN_RIGHT,
}


export class Rat implements EnemyInterface{
    relatedScene: Phaser.Scene;
    state!: STATES
    rat!: Phaser.Physics.Arcade.Sprite;
    checkBorderBox!: Phaser.GameObjects.Rectangle; 
    stateChanged!: boolean

    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
    }

    create(x :integer, y :integer) {
        this.rat = this.relatedScene.physics.add.sprite(x, y, TextureKeys.Rat)
        this.rat.setScale(2,2);
        this.rat.setSize(  this.rat.displayWidth-15,      this.rat.displayHeight);
        this.rat.play(AnimationKeys.Running);
        this.state = STATES.RUN_RIGHT;
        this.rat.setCollideWorldBounds(true);
        this.stateChanged = false
        this.createCheckBordersBox(this.state)
    }

    handleState(){
        this.updateCheckBorderBox(this.state)
        switch ( this.state) {
            case STATES.DEATH:
            break
            case STATES.RUN_LEFT:
                this.doRunLeft()
                this.rat.setFlipX(false)

                if (this.isGoingToFallOfBorder() || this.rat.body.touching.left) {
                    this.state = STATES.RUN_RIGHT
                    this.stateChanged = true
                } 
            break
            case STATES.RUN_RIGHT:
                this.doRunRight()
                this.rat.setFlipX(true)

                if (this.isGoingToFallOfBorder() || this.rat.body.touching.right){
                    this.state = STATES.RUN_LEFT;
                    this.stateChanged = true
                }
            break
        }
    }

     // Create attack bounds
     createCheckBordersBox(side: STATES){

        switch(side){
            case STATES.RUN_LEFT:
                this.checkBorderBox = this.relatedScene.add.rectangle(this.rat.x -  10, this.rat.y-5, 20, 10, 0xff0000, 0.5);
            break
            case STATES.RUN_RIGHT:
                this.checkBorderBox  = this.relatedScene.add.rectangle(this.rat.x +  10, this.rat.y-5, 20, 10, 0xff0000, 0.5);
            break
        }

        this.checkBorderBox.setOrigin(0.5, 0.5);
        this.checkBorderBox.setActive(true);
        this.checkBorderBox.setVisible(false);

        this.relatedScene.physics.world.enable(this.checkBorderBox, Phaser.Physics.Arcade.STATIC_BODY);

    }

    updateCheckBorderBox(side: STATES){
        switch(side){
            case STATES.RUN_LEFT:
                this.checkBorderBox.body.position.x = this.rat.x - 30
                this.checkBorderBox.body.position.y = this.rat.y +10
            break
            case STATES.RUN_RIGHT:

                this.checkBorderBox.body.position.x = this.rat.x + 30
                this.checkBorderBox.body.position.y = this.rat.y +10    
            break
        }
    }

    isGoingToFallOfBorder(){
        return  !this.relatedScene.physics.overlap(this.checkBorderBox, this.relatedScene.platforms)
    
    }

    doRunLeft(){
        this.rat.setVelocityX(-220);
    }

    doRunRight(){
        this.rat.setVelocityX(+220);
    }

    getEnemy(){
        return this.rat;
    }
}