import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";


enum STATES {
    IDLE = 0,
    WALKING_LEFT = 1,
    WALKING_RIGHT = 2,
    JUMPING = 3,
    FLYING = 4,
    ATTACK = 5,
    DEATH = 6,
}

export class Chicken {
    
    relatedScene: Phaser.Scene;
    player!: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;
    attackButtom: Phaser.Input.Keyboard.Key;
    state!: STATES;
    side!: string;
    attacking: boolean;
    attackBounds!: Phaser.GameObjects.Rectangle;
    
    constructor(scene: Phaser.Scene) {
        this.relatedScene = scene;
        this.cursors = this.relatedScene.input.keyboard.createCursorKeys();
        this.spacebar = this.relatedScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.attackButtom = this.relatedScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.attacking = false;
    }

    create() {
        this.player = this.relatedScene.physics.add.sprite(500, 630, TextureKeys.Chicken);
        this.player.play(AnimationKeys.ChickenIdle);
        this.player.setSize(40,30);
        this.player.setOffset(5, 20);
        this.player.setCollideWorldBounds(true);
        this.state = STATES.IDLE;
    }

    getPlayer() {
        return this.player;
    }

    chickenControls() {
        switch(this.state){
            case STATES.IDLE:
                if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                    this.doJumping()

                    this.state = STATES.JUMPING

                    return
                } 
                if (this.cursors.left.isDown) {
                    this.doWalkingLeft()

                    this.state = STATES.WALKING_LEFT
                    this.doFlip('left')
                    return
                } 
                if (this.cursors.right.isDown) {
                    this.doWalkingRight()


                    this.state = STATES.WALKING_RIGHT
                    this.doFlip('right')
                    return
                }
                if (Phaser.Input.Keyboard.JustDown(this.attackButtom)) {
                    this.doAttack()
                    this.state = STATES.ATTACK

                    return
                }
                
                this.doIdle()
            break

            case STATES.WALKING_LEFT:
                if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                    this.doJumping()

                    this.state = STATES.JUMPING

                    return
                } 
                if (this.cursors.right.isDown) {
                    this.doWalkingRight()


                    this.state = STATES.WALKING_RIGHT
                    this.doFlip('right')

                    return
                }
                if (this.cursors.left.isDown) {
                    this.doWalkingLeft()

                    return
                } 
                if (Phaser.Input.Keyboard.JustDown(this.attackButtom)) {
                    this.doAttack()
                    this.state = STATES.ATTACK

                    return
                }

                this.doIdle()
                this.state = STATES.IDLE
            break

            case STATES.WALKING_RIGHT:
                if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                    this.doJumping()

                    this.state = STATES.JUMPING

                    return
                } 
                if (Phaser.Input.Keyboard.JustDown(this.attackButtom)) {
                    this.doAttack()
                    this.state = STATES.ATTACK

                    return
                }
                if (this.cursors.left.isDown) {
                    this.doWalkingLeft()

                    this.state = STATES.WALKING_LEFT
                    this.doFlip('left')
                    return
                } 
                if (this.cursors.right.isDown) {
                    this.doWalkingRight()


                    return
                }
                

                this.doIdle()
                this.state = STATES.IDLE
            break

            case STATES.JUMPING:
                // // // we check we are on ground, if so we stop the jumping anim,  must be first to check
                if (this.player.body.touching.down ){
                    this.doIdle()
                    this.state = STATES.IDLE
            
                    return
                }
                if (this.cursors.left.isDown) {
                    this.player.setVelocityX(-160)
                    this.doFlip('left')

                    return
                } 
                if (this.cursors.right.isDown) {
                    this.player.setVelocityX(160)
                    this.doFlip('right')


                    return
                }
            break

            case STATES.ATTACK:
                if (this.attacking == false){
                    this.attacking = true
                    this.createAttackBounds()
                    this.relatedScene.time.delayedCall(200, () => {
                        this.attacking = false
                        this.state = STATES.IDLE
                        this.doIdle()
                    }, [], this.relatedScene);
                }
            break

            case STATES.FLYING:
                //perhaps this is not necessary
            break
        }

    }

    getAttackState(){
        return {
            isAttacking: this.attacking, 
            attackBox: this.attackBounds
        }
    }

    // Create attack bounds
    createAttackBounds(){
         
        let attackBounds : Phaser.GameObjects.Rectangle;
        if (this.side == 'left') {
            attackBounds = this.relatedScene.add.rectangle(this.player.x -  10, this.player.y-5, 50, 10, 0xff0000, 0.5);

        } else {
            attackBounds = this.relatedScene.add.rectangle(this.player.x +  10, this.player.y-5, 50, 10, 0xff0000, 0.5);
        }
        attackBounds.setOrigin(0.5, 0.5);
        attackBounds.setDepth(1);
        attackBounds.setActive(false);
        attackBounds.setVisible(false);
        this.relatedScene.physics.world.enable(attackBounds);
        this.attackBounds = attackBounds;
        this.relatedScene.time.delayedCall(100, () => {attackBounds.destroy()}, [], this.relatedScene);
    }

    handleEnemyCollision (chicken: Phaser.GameObjects.GameObject, enemie: Phaser.GameObjects.GameObject) {
        
    }

    doFlip(direction: string){
        switch(direction){
            case 'left':
                this.player.setFlipX(true);
                this.player.setOffset(14, 20);
                this.side = 'left'
                break
            case 'right':
                this.player.setFlipX(false);
                this.player.setOffset(5, 20);
                this.side = 'right'
                break;
        }
    }
    
    doJumping(){
        this.player.setVelocity(0, -200);
        this.player.play(AnimationKeys.ChickenFlying, true);
    }

    doWalkingLeft(){
        this.player.setVelocityX(-160)
        //	this.chicken.anims.play(AnimationKeys.ChickenLeft, true)
    }

    doWalkingRight(){
        this.player.setVelocityX(160)
        this.player.play(AnimationKeys.ChickenWalking, true)
        //	this.chicken.anims.play(AnimationKeys.ChickenRight, true)
    }

    doIdle(){
        this.player.setVelocityX(0)
        this.player.anims.play(AnimationKeys.ChickenIdle, true)
    }

    doAttack(){
        this.player.anims.play(AnimationKeys.ChickenAttack, true)
    }

}