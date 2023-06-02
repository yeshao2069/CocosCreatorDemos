1
import { _decorator, Component, Node, Touch, systemEvent, SystemEvent, EventKeyboard, KeyCode, RigidBody, v3, EventTouch, Vec3, misc, v2 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('BoxMove')
export class BoxMove extends Component {
    @property
    mouseControl: boolean = false;
    start() {
        this._keyCodeMap[KeyCode.KEY_W] = false;
        this._keyCodeMap[KeyCode.KEY_A] = false;
        this._keyCodeMap[KeyCode.KEY_D] = false;
        this._keyCodeMap[KeyCode.KEY_S] = false;
        this._keyCodeMap[KeyCode.SHIFT_LEFT] = false;
    }
    onLoad() {

        if (this.mouseControl) {

            systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onTouchMove(touch: Touch, e: EventTouch) {
        let r = 0;
        r -= touch.getDelta().x;
        this.node.setRotationFromEuler(0, this.node.eulerAngles.y + r * 1, 0);
    }
    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    protected _keyCodeMap: any = {};
    onKeyDown(event: EventKeyboard) {
        this._keyCodeMap[event.keyCode] = true;
    }

    onKeyUp(event: EventKeyboard) {
        this._keyCodeMap[event.keyCode] = false;
    }
    protected outV3: Vec3 = new Vec3();
    update(dt: number) {
        let m = 0;
        if (this._keyCodeMap[KeyCode.KEY_W]) {
            m += 2.5;
        }
        if (this._keyCodeMap[KeyCode.KEY_S]) {
            m -= 1.5;
        }
        if(this._keyCodeMap[KeyCode.SHIFT_LEFT]){
            m *= 4;
        }
        // const linerVelocity = this.node.forward.clone().multiplyScalar(m);
        // this.getComponent(RigidBody).getLinearVelocity(this.outV3);
        // linerVelocity.y = this.outV3.y;

        // this.getComponent(RigidBody).setLinearVelocity(linerVelocity);

        let radian = misc.degreesToRadians(this.node.eulerAngles.y);
        let comVec = v2(0, 1);    // 一个水平向右的对比向量
        let dirVec = comVec.rotate(-radian);
        this.node.setPosition(
            this.node.position.x + dirVec.x * dt * m,
            this.node.position.y,
            this.node.position.z + dirVec.y * dt * m,
        )

        let r = 0;
        if (this._keyCodeMap[KeyCode.KEY_A]) {
            r += 100;
        }
        if (this._keyCodeMap[KeyCode.KEY_D]) {
            r -= 100;
        }
        // this.getComponent(RigidBody).applyTorque(v3(0,r,0));
        this.node.setRotationFromEuler(0, this.node.eulerAngles.y + r * dt, 0);
    }
}
