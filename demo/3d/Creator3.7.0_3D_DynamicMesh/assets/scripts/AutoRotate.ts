
import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoRotate')
export class AutoRotate extends Component {

    private euler: Vec3 = new Vec3();
    private quat: Quat = new Quat();
    private speed: number = 10;

    start () {
        // [3]
    }

    angleNormalize(x: number) {
        while(x >= 360) { x -= 360; }
        while(x < 0) { x += 360; }

        return x;
    }

    eulerNormalize(v: Vec3) {
        v.x = this.angleNormalize(v.x);
        v.y = this.angleNormalize(v.y);
        v.z = this.angleNormalize(v.z);
    }

    update (deltaTime: number) {
        this.euler.x += deltaTime * this.speed;
        this.euler.y += deltaTime * this.speed * 2;
        this.euler.z += deltaTime * this.speed * 3;
        this.eulerNormalize(this.euler);

        Quat.fromEuler(this.quat, this.euler.x, this.euler.y, this.euler.z)
        this.node.setRotation(this.quat);
    }
}
