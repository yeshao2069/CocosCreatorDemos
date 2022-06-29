
import { _decorator, Component, Node, EventTouch, Vec3, Sprite, Vec2, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletFollow')
export class BulletFollow extends Component {
    @property(Node)
    lauch_btn !: Node;

    @property(Node)
    bullet !: Node;

    @property(Node)
    target !: Node;

    tempPosVec3_1 : Vec3 = new Vec3();
    tempPosVec3_2 : Vec3 = new Vec3();
    tempPosVec2_1 : Vec2 = new Vec2(0, 1);
    tempPosVec2_2 : Vec2 = new Vec2();
    tempPosVec2_3 : Vec2 = new Vec2();
    fireFlag : boolean = false;
    bulletSpeed = 200;

    onLoad () {
        this.target.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    }

    touchMoveEvent(evt : EventTouch) {
        let localPos = evt.getUILocation();
        let viewRect = view.getVisibleSize();
        this.tempPosVec3_1.set(localPos.x - viewRect.width / 2, localPos.y - viewRect.height / 2);
        this.target.setPosition(this.tempPosVec3_1);
    }

    fire () {
        this.bullet.getComponent(Sprite)!.enabled = true;
        this.bullet.getChildByName('boom')!.active = false;
        this.bullet.setPosition(this.lauch_btn.position);
        this.bullet.active = true;
        this.fireFlag = true;
    }

    hitTheTarget () {
        this.fireFlag = false;
        this.bullet.getComponent(Sprite)!.enabled = false;
        this.bullet.getChildByName('boom')!.active = true;
        this.scheduleOnce(()=>{
            this.bullet.getChildByName('boom')!.active = false;
        }, 0.2);
    }

    update (dt: number) {
        if (!this.fireFlag) return;

        let targetPos : Vec3 = this.target.getPosition();
        let bulletPos : Vec3 = this.bullet.getPosition();
        let normalizeVec3 : Vec3 = targetPos.subtract(bulletPos).normalize();

        this.tempPosVec3_2.set(bulletPos.x + normalizeVec3.x * this.bulletSpeed * dt,
            bulletPos.y + normalizeVec3.y * this.bulletSpeed *dt, bulletPos.z);
        this.bullet.setPosition(this.tempPosVec3_2);

        this.tempPosVec2_2.set(normalizeVec3.x, normalizeVec3.y);
        // 角度变化以y轴正方向为起点，逆时针角度递增
        this.bullet.angle = this.tempPosVec2_1.signAngle(this.tempPosVec2_2) * 180 / Math.PI;

        this.tempPosVec2_3.set(bulletPos.x, bulletPos.y);
        let rect = this.target.getComponent(UITransform)!.getBoundingBox();
        if (rect.contains(this.tempPosVec2_3)) this.hitTheTarget();
    }
}
