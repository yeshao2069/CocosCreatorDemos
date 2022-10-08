import { _decorator, Component, Node, Enum, log, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

export enum Axis {
    PositiveX, // 正 X 轴
    PositiveY, // 正 Y 轴
    NegativeX, // 负 X 轴
    NegativeY, // 负 Y 轴
}

@ccclass('rotate')
export class rotate extends Component {
    
    @property({ type: Node, tooltip: '被围绕的目标' })
    public target!: Node;

    @property({ type: Node, tooltip: '围绕旋转的目标' })
    public player!: Node;

    @property({ tooltip: '顺时针旋转' })
    public clockwise: boolean = true;

    @property({ tooltip: '旋转一圈花费的时间' })
    public timePerRound: number = 10;

    @property({ tooltip: '是否始终面向目标节点' })
    public faceToTarget: boolean = false;

    @property({
        type: Enum(Axis),
        tooltip: '面向目标节点的轴：\n- PositiveX：正 X 轴\n- PositiveY：正 Y 轴\n- NegativeX：负 X 轴\n- NegativeY：负 Y 轴'
        })
    public faceAxis: Axis = Axis.NegativeY;

    @property({ tooltip: '自动开始旋转' })
    public autoStart: boolean = true;

    public angle: number = 0; // 角度
    public radius: number = 0; // 半径
    private isRotating: boolean = false; // 标志位，是否正在旋转

    start() {
        if (this.autoStart) this.run();
    }

    /**
     * 停止旋转
     */
    public stop() {
        this.isRotating = false;
    }

    /**
     * 开始围绕目标节点旋转
     * @param target 目标节点
     * @param clockwise 是否顺时针旋转
     * @param timePerRound 旋转一圈的时间
     * @param faceToTarget 是否始终面向目标节点
     * @param faceAxis 面向目标节点的轴
     */
    public run(target?: Node, clockwise?: boolean, timePerRound?: number, faceToTarget?: boolean, faceAxis?: Axis) {
        if (target) this.target = target;
        if (clockwise) this.clockwise = clockwise;
        if (timePerRound) this.timePerRound = timePerRound;
        if (faceToTarget) this.faceToTarget = faceToTarget;
        if (faceAxis) this.faceAxis = faceAxis;
        if (!this.target) {
            log('No target!');
            return;
        }
        // 计算初始角度和半径
        const targetPosition = new Vec2(this.target.getPosition().x, this.target.getPosition().y);
        const nodePosition = new Vec2(this.player.getPosition().x, this.player.getPosition().y);
        this.angle = this.getAngle(targetPosition, nodePosition);
        this.radius = this.getDistance(targetPosition, nodePosition);
        // 开始
        this.isRotating = true;
    }

    /**
     * 获取两点间的角度
     * @param p1 点1
     * @param p2 点2
     */
    private getAngle(p1: Vec2, p2: Vec2): number {
        return Math.atan(p2.y - p1.y / p2.x - p1.x);
    }

    /**
     * 获取两点间的距离
     * @param p1 点1
     * @param p2 点2
     */
    private getDistance(p1: Vec2, p2: Vec2): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }


    update(dt: number) {
        if (!this.isRotating || !this.target) return;
        // 将角度转换为弧度
        let radian = Math.PI / 180 * this.angle;
        // 更新节点的位置
        const targetPosition = this.target.getPosition();
        const x = targetPosition.x + this.radius * Math.cos(radian);
        const y = targetPosition.y + this.radius * Math.sin(radian);
        this.player.setPosition(x, y);
        // 更新节点的角度
        let _angle = this.angle;
        if (this.faceToTarget) {
            switch (this.faceAxis) {
                case Axis.PositiveX:
                     _angle = this.angle + 180;
                    break;
                case Axis.PositiveY:
                     _angle = this.angle + 90;
                    break;
                case Axis.NegativeX:
                     _angle = this.angle;
                    break;
                case Axis.NegativeY:
                     _angle = this.angle - 90;
                    break;
            }
            this.player.setRotationFromEuler(0, 0, _angle);
        }
        // 计算下一帧的角度
        let anglePerFrame = dt * (360 / this.timePerRound);
        if (this.clockwise) this.angle -= anglePerFrame;
        else this.angle += anglePerFrame;
        // 重置角度，避免数值过大
        if (this.angle >= 360) this.angle %= 360;
        else if (this.angle <= -360) this.angle %= -360;
    }
}
