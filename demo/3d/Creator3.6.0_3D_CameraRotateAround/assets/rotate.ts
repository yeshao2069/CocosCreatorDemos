import { _decorator, Component, Node, Vec3, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rotate')
export class Rotate extends Component {

    @property({ type: Node, tooltip: '围绕旋转的目标' })
    public target: Node | null = null;

    @property({ tooltip: '旋转一圈花费的时间' })
    public timePerRound: number = 14;

    @property({ tooltip: '是否始终面向目标节点' })
    public faceToTarget: boolean = true;

    @property({ tooltip: '自动开始旋转' })
    public autoStart: boolean = true;

    public angle: number = 0; // 角度
    public radius: number = 0; // 半径
    private isRotating: boolean = false; // 标志位，是否正在旋转

    start () {
        if (this.autoStart) this.run();
    }

    /**
     * 开始围绕目标节点旋转
     * @param target 目标节点
     * @param clockwise 是否顺时针旋转
     * @param timePerRound 旋转一圈的时间
     * @param faceToTarget 是否始终面向目标节点
     * @param faceAxis 面向目标节点的轴
     */
    public run(target?: Node, timePerRound?: number, faceToTarget?: boolean) {
        if (target) this.target = target;
        if (timePerRound) this.timePerRound = timePerRound;
        if (faceToTarget) this.faceToTarget = faceToTarget;
        if (!this.target) {
            log('No target!');
            return;
        }
        // 计算初始角度和半径
        this.angle = this.getAngle(this.target.getPosition(), this.node.getPosition());
        this.radius = this.getDistance(this.target.getPosition(), this.node.getPosition());
        // 开始
        this.isRotating = true;
    }

    /**
     * 获取两点间的角度
     * @param p1 点1
     * @param p2 点2
     */
    private getAngle(p1: Vec3, p2: Vec3): number {
        return Math.atan((p2.z - p1.z) / (p2.x - p1.x));
    }

    /**
     * 获取两点间的距离
     * @param p1 点1
     * @param p2 点2
     */
    private getDistance(p1: Vec3, p2: Vec3): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.z - p1.z, 2));
    }

    update(dt: number) {
        if (!this.isRotating || !this.target) return;
        // 将角度转换为弧度
        let radian = Math.PI / 180 * this.angle;
        // 更新节点的位置
        const targetPosition = this.target.getPosition();
        const x = targetPosition.x + this.radius * Math.cos(radian);
        const z = targetPosition.z + this.radius * Math.sin(radian);
        this.node.setPosition(x, 2, z);
        let _angle = Math.abs(this.angle);
        // 更新节点的角度
        if (this.faceToTarget) {
            _angle += 90;   // 这边特殊处理，因为原本的视角不对
            this.node.setRotationFromEuler(0, _angle, 0);
        } else {
            this.node.setRotationFromEuler(0, _angle, 0); 
        }
        
        
        // 计算下一帧的角度
        let anglePerFrame = dt * (360 / this.timePerRound);
        this.angle -= anglePerFrame;
        // 重置角度，避免数值过大
        if (this.angle >= 360)
            this.angle %= 360;
        else if (this.angle <= -360)
            this.angle %= -360;
    }

    /**
     * 停止旋转
     */
    public stop() {
        this.isRotating = false;
    }
}
