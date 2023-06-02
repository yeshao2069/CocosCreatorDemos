import { _decorator, Component, Node, game, math, systemEvent,
    SystemEvent, EventTouch, Touch } from 'cc';
const { ccclass, property } = _decorator;
const { Vec2, Vec3, Quat } = math;

@ccclass('TouchAround')
export class TouchAround extends Component {

    @property(Node)
    model !: Node;

    @property
    public rotateSpeed = 1; // 旋转速度

    public _rotate = new Vec3();
    public _speedScale = 1;

    public onLoad () {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        this.model.rotation.getEulerAngles(this._rotate);
    }

    public onDestroy () {
        systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    public onTouchStart () {
        if (game.canvas!['requestPointerLock']) { 
            game.canvas!.requestPointerLock();
        }
    }

    public onTouchMove (t: Touch, e: EventTouch) {
        let x = e.getDeltaX();
        this._rotate.y += x * this.rotateSpeed;
        this.model.setRotationFromEuler(this._rotate);
    }

    public onTouchEnd(t: Touch, e: EventTouch) {
        if (document.exitPointerLock) {
            document.exitPointerLock();
        }
    }
}
