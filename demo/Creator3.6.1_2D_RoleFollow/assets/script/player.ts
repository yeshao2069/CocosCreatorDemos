import { Camera, Component, EventKeyboard, Node, KeyCode, macro, systemEvent, SystemEvent, Vec3, _decorator } from "cc";
// import FollowCamera from "./FollowCamera";

const { ccclass, property } = _decorator;

@ccclass
export default class Player extends Component {

    moveDir: Vec3 = Vec3.ZERO;
    timer: number = 0;
    timerTotal: number = 1 / 100; // 1代表1秒执行一次
    speed: number = 50; //速度

    UP_Vec3 : Vec3 = new Vec3(0, 1, 0);
    DOWN_Vec3 : Vec3 = new Vec3(0, -1, 0);
    LEFT_Vec3 : Vec3 = new Vec3(-1, 0, 0);
    RIGHT_Vec3 : Vec3 = new Vec3(1, 0, 0);
    Zero_Vec3 : Vec3 = new Vec3(0, 0, 0);

    save_pos : Vec3 = new Vec3();

    @property([Node])
    heroNodeArray : Node[] = [];

    paths = [];
    pathCount : number = 0;
    pathLimit : number = 5;

    private nodeNum : number = 0;

    // followCamera: FollowCamera;

    onLoad() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        // this.followCamera = Camera.main.getComponent(FollowCamera);
        // if (this.followCamera) {
        //     this.followCamera.setTarget(this.node);
        // }

        this.nodeNum = this.heroNodeArray.length;
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.moveDir = this.UP_Vec3;
                break;
            case KeyCode.KEY_S:
                this.moveDir = this.DOWN_Vec3;
                break;
            case KeyCode.KEY_A:
                this.moveDir = this.LEFT_Vec3;
                break;
            case KeyCode.KEY_D:
                this.moveDir = this.RIGHT_Vec3;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        this.moveDir = this.Zero_Vec3;
        this.pathCount = 0;
        // switch (event.keyCode) {
        //     case KeyCode.KEY_W:
        //     case KeyCode.KEY_S:
        //     case KeyCode.KEY_A:
        //     case KeyCode.KEY_D:
        //         this.moveDir = Vec3.ZERO;
        //         this.pathCount = 0;
        //         // this.node.emit("HeroMoveStop");
        //         break;
        // }
    }

    update(dt) {
        if (this.moveDir.equals(this.Zero_Vec3)) return;
        this.timer += dt;
        if (this.timer >= this.timerTotal) {
            this.timer = 0;
            this.move()
        }
    }

    move() {
        this.save_pos = this.node.position.add(this.moveDir);
        // console.log(this.save_pos, this.moveDir);
        this.node.setPosition(this.save_pos);

        var v3 = this.node.position.clone().add(this.moveDir.clone().multiplyScalar(this.speed));
        //TODO 判断是否可以移动到v3 地型检测
        var obj = {
            position: v3
        };

        this.pathCount ++;

        if (this.pathCount < 70) return;
        this.pathCount = 0;
        
        this.paths.push(obj);
        if (this.paths.length >= 30) {
            this.paths.shift();
        }

        for (let i = 0; i < 3; i++) {
            let node = this.heroNodeArray[i];
            if (node) {
                const pos = this.paths[this.paths.length - i - 3];
                if (pos) {
                    console.log(node.name, pos.position);
                    node.setPosition(pos.position);
                }
            }
        }    
    }
}