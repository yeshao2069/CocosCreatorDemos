import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rotate')
export class Rotate extends Component {
    @property({ type: Node, tooltip: '被围绕的目标' })
    public target!: Node;
    @property({ type: Node, tooltip: '围绕旋转的摄像机'})
    public Camera3D!: Node;

    start () {
    }

    update(dt: number) {
        this.rotationAroundNode(this.Camera3D, this.target.position, Vec3.UP, 1);
        this.Camera3D.lookAt(this.target.position);
    }

    // 旋转
    rotationAroundNode(self : Node, pos : Vec3, axis : Vec3, angle : number) :Quat {
        let _quat = new Quat();
        let v1 = new Vec3();
        let v2 = new Vec3();
        let pos2 : Vec3 = self.position;
        let rad = angle / 180 * Math.PI;

        //根据旋转轴和旋转弧度计算四元数
        Quat.fromAxisAngle(_quat,axis,rad);
        //相减，目标点与相机点之间的向量
        Vec3.subtract(v1,pos2,pos);
        //把向量dir根据计算到的四元数旋转，然后计算出旋转后的距离
        Vec3.transformQuat(v2,v1,_quat);
        self.position = Vec3.add(v2,pos,v2);
        //根据轴和弧度绕世界空间下指定轴旋转四元数
        Quat.rotateAround(_quat,self.rotation,axis,rad);
        return _quat;
    }
}
