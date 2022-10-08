
import { _decorator, Component, Node, EventTouch, Vec3, Vec2, UITransform, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VisualJoyStick')
export class VisualJoyStick extends Component {

  @property({ type: Node, tooltip: '操控杆的控制点' })
  controlDot !: Node;
  @property({ type: Node, tooltip: '操控杆' })
  joystick !: Node;
  @property(Node)
  movableStar !: Node;
  @property({ type: Camera, tooltip: 'Canvas下的2D摄像机'})
  camera2D !: Camera;
  
  movableFlag: boolean = false;
  radian: number = 0;
  speed: number = 150;

  onLoad() {
    this.initTouchEvent();
  }

  initTouchEvent() {
    this.node.on(Node.EventType.TOUCH_START, this.touchStartEvent, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    this.node.on(Node.EventType.TOUCH_END, this.touchEndEvent, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
  }

  touchStartEvent(evt: EventTouch) {
    const tempPosVec3 = new Vec3(evt.getUILocation().x, evt.getUILocation().y, 0);
    let touchPos: Vec3 = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(tempPosVec3);
    const distance = touchPos.length();
    const radius = this.node.getComponent(UITransform)!.contentSize.width / 2 - this.controlDot.getComponent(UITransform)!.contentSize.width / 2;

    // 以x轴正方向为基准，计算偏移量
    const tempPosVec2 = new Vec2(touchPos.x, touchPos.y);
    this.radian = new Vec2(1, 0).signAngle(tempPosVec2);
    const offsetX = Math.cos(this.radian) * radius;
    const offsetY = Math.sin(this.radian) * radius;
    this.controlDot.setPosition(radius > distance ? touchPos : new Vec3(offsetX, offsetY, 0));

    this.movableFlag = true;
  }

  touchMoveEvent(evt: EventTouch) {
    const tempPosVec3 = new Vec3(evt.getUILocation().x, evt.getUILocation().y, 0);
    let touchPos: Vec3 = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(tempPosVec3);
    const distance = touchPos.length();
    const radius = this.node.getComponent(UITransform)!.contentSize.width / 2 - this.controlDot.getComponent(UITransform)!.contentSize.width / 2;

    const tempPosVec2 = new Vec2(touchPos.x, touchPos.y);
    this.radian = new Vec2(1, 0).signAngle(tempPosVec2);
    const offsetX = Math.cos(this.radian) * radius;
    const offsetY = Math.sin(this.radian) * radius;

    this.controlDot.setPosition(radius > distance ? touchPos : new Vec3(offsetX, offsetY, 0));
  }

  touchEndEvent() {
    this.movableFlag = false;
    this.controlDot.setPosition(new Vec3());
  }
    
  update(dt: number) {
    if (!this.movableFlag) return;
    let offsetX = Math.cos(this.radian) * dt * this.speed;
    let offsetY = Math.sin(this.radian) * dt * this.speed;
    const starPos = this.movableStar.getPosition();
    starPos.set(starPos.x+offsetX, starPos.y+offsetY, starPos.z);
    this.movableStar.setPosition(starPos);
  }
}
