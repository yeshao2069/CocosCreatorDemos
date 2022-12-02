import { Component, EventKeyboard, Input, input, KeyCode, Vec3, _decorator } from "cc";
const { ccclass, property } = _decorator;

export class HeroMoveObj {
    public position: Vec3 = Vec3.ZERO;
    public dir: Vec3 = Vec3.ZERO;
}

const CONSTANT_POS_UP = new Vec3(0, 2, 0);
const CONSTANT_POS_DOWN = new Vec3(0, -2, 0);
const CONSTANT_POS_LEFT = new Vec3(-2, 0, 0);
const CONSTANT_POS_RIGHT = new Vec3(2, 0, 0);

@ccclass
export default class Player extends Component {

    moveDir: Vec3 = Vec3.ZERO;
    timer: number = 0;
    timerTotal: number = 1 / 100;//1代表1秒执行一次
    speed: number = 4;//速度

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.moveDir = CONSTANT_POS_UP;
                break;
            case KeyCode.KEY_S:
                this.moveDir = CONSTANT_POS_DOWN;
                break;
            case KeyCode.KEY_A:
                this.moveDir = CONSTANT_POS_LEFT;
                break;
            case KeyCode.KEY_D:
                this.moveDir = CONSTANT_POS_RIGHT;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.moveDir = Vec3.ZERO;
                this.node.emit("HeroMoveStop");
                break;
        }
    }

    update(dt) {
        if (this.moveDir.equals(Vec3.ZERO)) return;
        this.timer += dt;
        if (this.timer >= this.timerTotal) {
            this.timer = 0;
            this.move()
        }
    }

    move() {
        var v3 = this.node.position.clone().add(this.moveDir.clone().multiplyScalar(this.speed));
        //TODO 判断是否可以移动到v3 地型检测
        var obj: HeroMoveObj = {
            position: v3,
            dir: this.moveDir
        };
        this.node.emit("HeroMove", obj);
    }
}