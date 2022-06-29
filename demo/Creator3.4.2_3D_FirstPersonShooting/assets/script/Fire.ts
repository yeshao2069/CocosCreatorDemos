import { _decorator, Component, Node, CameraComponent, geometry, systemEvent, SystemEventType, EventTouch, Vec3, Prefab, instantiate, RigidBodyComponent, PhysicsSystem, Size, log, PlaneCollider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FireByScreenModel')
export class FireByScreenModel extends Component {
    @property({ type: Node })
    readonly m_point: Node = <any>null;

    @property({ type: Node })
    readonly m_plane: Node = <any>null;

    @property({ type: CameraComponent })
    readonly m_camera: CameraComponent = <any>null;


    @property(Prefab)
    cubePrefab = null;


    onEnable() {
        // @ts-ignore
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable() {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(touch: Touch, event: EventTouch) {
        const worldRay = new geometry.Ray();
        const worldPoint = new Vec3();

        // 获取射线(这个获取到的是单位向量)
        this.m_camera.screenPointToRay(event.getLocationX(), event.getLocationY(), worldRay);

        // 获取射线原点(这个才是触点的世界坐标)
        this.m_camera.screenToWorld(new Vec3(event.getLocationX(), event.getLocationY(), 0), worldPoint);

        // 计算点到平面的距离
        const gpt = this.m_plane.position;
        const gplane = new geometry.Plane(gpt.x, gpt.y, gpt.z, 0);
        const distance = geometry.intersect.rayPlane(worldRay, gplane);

        // 将射线原点移动到平面上(沿着射线方向移动 - worldRay.d)
        Vec3.scaleAndAdd(worldPoint, worldPoint, worldRay.d, distance);

        // [测试] 你可以在编辑器上节点树根目录放一个测试节点，然后判断触点的世界坐标是不是对的
        const check_point = this.m_point.getWorldPosition();
        console.log("点击测试点，值应该一样", worldPoint, check_point);

        if (distance > 0) {
            const bullet = <Node><unknown>instantiate(this.cubePrefab);
            bullet.setParent(this.node);
            bullet.setWorldPosition(worldPoint);
            bullet.getComponent(RigidBodyComponent)!.applyForce(new Vec3(worldRay.d.x * 2000, worldRay.d.y * 2000, worldRay.d.z * 2000));
        }

        log(PhysicsSystem.instance.collisionMatrix);
    }
}