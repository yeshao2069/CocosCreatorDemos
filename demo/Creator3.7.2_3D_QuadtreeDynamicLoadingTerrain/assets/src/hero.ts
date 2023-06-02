
import { _decorator, Component, Node, Vec3, Animation, AnimationClip, systemEvent, SystemEventType, EventKeyboard, KeyCode, tween, TweenSystem } from 'cc';
const { ccclass, property, type } = _decorator;

let tempVec3 = new Vec3;

@ccclass('Hero')
export class Hero extends Component {
    @type(Animation)
    animation: Animation | null = null;

    rotation : number = 0;
    fixRotation : number = 0;

    _currentAnim = '';

    moving : boolean = false;
    move_dir : string = "";
    move_flag_x : number = 1;
    move_flag_z : number = 1;

    start () {
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                case KeyCode.KEY_W:
                    this.move_dir = "w";
                    break;
            case KeyCode.ARROW_DOWN:
                case KeyCode.KEY_S:
                    this.move_dir = "s";
                    break;
            case KeyCode.ARROW_LEFT:
                case KeyCode.KEY_A:
                    this.move_dir = "a";
                    break;
            case KeyCode.ARROW_RIGHT:
                case KeyCode.KEY_D:
                    this.move_dir = "d";
                    break;
        }
        this.moving = true;
        this.play('run');
    }

    onKeyUp (event: EventKeyboard) {
        this.moving = false;
        this.play('idle');
    }

    play (name) {
        if (!this.animation) {
            return;
        }
        if (this._currentAnim === name) {
            let state = this.animation.getState(name);
            if (state.wrapMode !== AnimationClip.WrapMode.Normal) {
                return;
            }
        }
        this._currentAnim = name

        this.animation.crossFade(name, 0.1);
    }

    update (deltaTime: number) {
        // Your update function goes here.

        if (TweenSystem.instance.ActionManager.getNumberOfRunningActionsInTarget(this.node) > 0) return;

        const factor = 1;
        if (this.moving) {
            let pos = this.node.getPosition().clone();
            // console.log(this.fixRotation, this.move_flag_x, this.move_flag_z);
            switch(this.move_dir) {
                case "w":
                    // pos.z += factor;
                    // this.rotation = 0;
                    if (this.fixRotation == 0) {
                        this.move_flag_x = 0;
                        this.move_flag_z = 1;
                    }
                    if (this.fixRotation == 90) {
                        this.move_flag_x = 1;
                        this.move_flag_z = 0;
                    }
                    if (this.fixRotation == 180) {
                        this.move_flag_x = 0;
                        this.move_flag_z = -1;
                    }
                    if (this.fixRotation == 270) {
                        this.move_flag_x = -1;
                        this.move_flag_z = 0;
                    }
                    this.rotation = 0;
                    break;
                case "s":
                    // pos.z -= factor;
                    // this.rotation = 180;
                    if (this.fixRotation == 0) {
                        this.move_flag_x = 0;
                        this.move_flag_z = -1;
                    }
                    if (this.fixRotation == 90) {
                        this.move_flag_x = -1;
                        this.move_flag_z = 0;
                    }
                    if (this.fixRotation == 180) {
                        this.move_flag_x = 0;
                        this.move_flag_z = 1;
                    }
                    if (this.fixRotation == 270) {
                        this.move_flag_x = 1;
                        this.move_flag_z = 0;
                    }
                    this.rotation = 0;
                    break;
                case "a":
                    // pos.x += factor;
                    this.rotation = 90;
                    break;
                case "d":
                    // pos.x -= factor;
                    this.rotation = -90;
                    break;
            }

            const oldRotation = this.animation!.node.eulerAngles.y;
            this.fixRotation = oldRotation + this.rotation;


            if (Math.abs(oldRotation - this.fixRotation) >= 0.001) {
                tempVec3.set(0, this.fixRotation, 0);
                // this.animation!.node.eulerAngles = tempVec3.set(0, this.rotation, 0);
                tween(this.animation!.node).to(0.5, { eulerAngles: tempVec3 }).start();
            }
            
            pos.x += this.move_flag_x * factor;
            pos.z += this.move_flag_z * factor;
            this.node.setPosition(pos);

            if (this.fixRotation >= 360) {
                this.fixRotation -= 360;
            }
            if (this.fixRotation < 0) {
                this.fixRotation += 360;
            }
        }
    }
}
