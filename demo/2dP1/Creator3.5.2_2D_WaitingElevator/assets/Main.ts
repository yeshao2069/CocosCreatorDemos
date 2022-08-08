
import { _decorator, Component, Node, EventTouch, Vec3, Vec2, UITransform, Camera, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

  @property({ type: Node, tooltip: '操控杆的控制点' })
  controlDot !: Node;
  @property({ type: Node, tooltip: '操控杆' })
  joystick !: Node;
  @property({ type: Node, tooltip: '操作之物'})
  playerNode !: Node;
  @property({ type: Node, tooltip: '电梯' })
  diantiNode!: Node;
  @property({ type: Camera, tooltip: 'Canvas下的2D摄像机'})
  camera2D !: Camera;

  public isAtDianti: boolean = false;
  public isMoveDianti: boolean = false;
  public isDiantiUp: boolean = false;

  movableFlag: boolean = false;
  radian: number = 0;
  speed: number = 150;
  playerAnim: sp.Skeleton = null;
  playerScale: Vec3 = new Vec3();

  onLoad() {
    this.initTouchEvent();

    this.playerAnim = this.playerNode.getComponent(sp.Skeleton);
    this.playerScale = this.playerNode.getScale();
  }

  initTouchEvent() {
    this.node.on(Node.EventType.TOUCH_START, this.touchStartEvent, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    this.node.on(Node.EventType.TOUCH_END, this.touchEndEvent, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
  }

  touchStartEvent(evt: EventTouch) {
    const tempPosVec3 = new Vec3(evt.getUILocation().x, evt.getUILocation().y, 0);
    let touchPos: Vec3 = this.joystick.getComponent(UITransform)!.convertToNodeSpaceAR(tempPosVec3);
    const distance = touchPos.length();
    const radius = this.joystick.getComponent(UITransform)!.contentSize.width / 2 - this.controlDot.getComponent(UITransform)!.contentSize.width / 2;

    // 以x轴正方向为基准，计算偏移量
    const tempPosVec2 = new Vec2(touchPos.x, touchPos.y);
    this.radian = new Vec2(1, 0).signAngle(tempPosVec2);
    const offsetX = Math.cos(this.radian) * radius;
    const offsetY = Math.sin(this.radian) * radius;
    this.controlDot.setPosition(radius > distance ? touchPos : new Vec3(offsetX, offsetY, 0));

    this.movableFlag = true;

    this.playerAnim.setAnimation(0, 'run', false);
  }

  touchMoveEvent(evt: EventTouch) {
    const tempPosVec3 = new Vec3(evt.getUILocation().x, evt.getUILocation().y, 0);
    let touchPos: Vec3 = this.joystick.getComponent(UITransform)!.convertToNodeSpaceAR(tempPosVec3);
    const distance = touchPos.length();
    const radius = this.joystick.getComponent(UITransform)!.contentSize.width / 2 - this.controlDot.getComponent(UITransform)!.contentSize.width / 2;

    const tempPosVec2 = new Vec2(touchPos.x, touchPos.y);
    this.radian = new Vec2(1, 0).signAngle(tempPosVec2);
    const offsetX = Math.cos(this.radian) * radius;
    const offsetY = Math.sin(this.radian) * radius;

    if (Math.abs(offsetX) > 0.01) {
      this.playerAnim.setAnimation(0, 'run', true);
    }

    this.controlDot.setPosition(radius > distance ? touchPos : new Vec3(offsetX, offsetY, 0));
  }

  touchEndEvent() {
    this.movableFlag = false;
    this.controlDot.setPosition(new Vec3());
    this.playerAnim.setAnimation(0, 'idle', true);
  }
    
  update(dt: number) {
    this.moveElevator();
    if (!this.movableFlag) return;
    let offsetX = Math.cos(this.radian) * dt * this.speed;
    const starPos = this.playerNode.getPosition();
    starPos.set(starPos.x + offsetX, starPos.y, starPos.z);

    if (offsetX > 0.01) {
      this.playerNode.setScale(this.playerScale.x, this.playerScale.y, this.playerScale.z);
    } else if (offsetX < -0.01) {
      this.playerNode.setScale(-this.playerScale.x, this.playerScale.y, this.playerScale.z);
    }

    this.playerNode.setPosition(starPos);
    this.playerLocation();
  }

  playerLocation () {
    // 人在电梯上
    if (Math.abs(this.playerNode.worldPosition.x - this.diantiNode.worldPosition.x) < 20) {
        if (!this.isAtDianti) {
            let wp = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.playerNode.position)
            let rp = this.diantiNode.getComponent(UITransform).convertToNodeSpaceAR(wp);
            this.playerNode.parent = this.diantiNode;
            this.playerNode.setPosition(rp);
            this.isAtDianti = true;
        }
        this.isMoveDianti = true;
    } else {
        // 人离开电梯
        if (this.isAtDianti) {
            let wp = this.diantiNode.getComponent(UITransform).convertToWorldSpaceAR(this.playerNode.position)
            let rp = this.node.getComponent(UITransform).convertToNodeSpaceAR(wp);
            this.playerNode.parent = this.node;
            this.playerNode.setPosition(rp);
            this.isAtDianti = false;
        }
        this.isMoveDianti = false;
    }
  }

  moveElevator () {
    if (this.isMoveDianti) {
      let pos = this.diantiNode.position.clone();
      if (this.isDiantiUp) {
          if (pos.y > 200) {
              this.isDiantiUp = false;
          } else {
              pos.y += 1;
          }
      }
      if (!this.isDiantiUp) {
          if (pos.y < -200) {
              this.isDiantiUp = true;
          } else {
              pos.y -= 1;
          }
      }
      this.diantiNode.setPosition(pos);
    }
  }
}
