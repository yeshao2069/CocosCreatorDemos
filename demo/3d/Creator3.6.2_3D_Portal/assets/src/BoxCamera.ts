
import { _decorator, Component, Node, Vec3, math, systemEvent, SystemEvent, EventTouch,Touch, quat, Quat, v3, EventKeyboard, KeyCode, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('BoxCamera')
export class BoxCamera extends Component {
    
    @property(Node)
    target: Node = null;
    mousesSensity: number = 1;
    minYLimit: number = -90;
    maxYLimit: number = 70;
    m_camRotation: Vec3 = new Vec3();
    start() {

        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    }
    onDestroy() {
        systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    private vec3:Vec3 = v3();
    private _keyCodeMap: any = {};
    onKeyDown(event: EventKeyboard) {
        this._keyCodeMap[event.keyCode] = true;
    }

    onKeyUp(event: EventKeyboard) {
        this._keyCodeMap[event.keyCode] = false;
    }
    private onTouchMove(touch: Touch, e: EventTouch) {
        // console.log(touch.getDelta());
        if (!this.target) return;
        this.m_camRotation.x = this.target.eulerAngles.y + touch.getDelta().x * -this.mousesSensity;
        this.m_camRotation.y += touch.getDelta().y * this.mousesSensity;
        this.m_camRotation.y = math.clamp(this.m_camRotation.y, this.minYLimit, this.maxYLimit);
        this.target.setRotationFromEuler(v3(
            -this.m_camRotation.y, this.m_camRotation.x, 0
        ));


    }
    update(deltaTime: number) {
        if (this.target) {
            if (this._keyCodeMap[KeyCode.KEY_W]) {
                this.target.setRotationFromEuler(this.target.eulerAngles.clone().lerp(v3(this.target.eulerAngles.x,0,0),deltaTime * 3));
            }
        }
    }

}