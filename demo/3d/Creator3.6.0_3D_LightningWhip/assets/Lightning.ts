import { _decorator, Component, Node, LineComponent, Material, EffectAsset, Vec3, ModelComponent, Texture2D, CCFloat } from "cc";
const { ccclass, property } = _decorator;

const up:Vec3 = new Vec3(0, 1, 0);

@ccclass("Lightning")
export class Lightning extends Component {

    @property()
    detail:number = 1;
    @property()
    displacement:number = 15;
    @property()
    yOffset:number = 0;

    @property(Node)
    startNode:Node = null;
    @property(Node)
    targetNode:Node = null;

    line:LineComponent = null;
    points:Vec3[];


    onLoad () {
        this.line = this.getComponent(LineComponent);
        this.points = [];
    }

    start () {
    }

    update (deltaTime: number) {
        let startPos:Vec3 = Vec3.ZERO;
        let endPos:Vec3 = Vec3.ZERO;

        if (this.startNode) {
            startPos = this.startNode.position.add(up.multiplyScalar(this.yOffset));
        }
        if (this.targetNode) {
            endPos = this.targetNode.position.add(up.multiplyScalar(this.yOffset));
        }
        if(!startPos.equals(endPos)) {
            this.points.length = 0;
            this.collectLinPos(startPos, endPos, this.displacement);
            this.points.push(endPos);

            // @ts-ignore
            this.line.positions = this.points;
        }
    }


    //收集顶点，中点分形法插值抖动
    collectLinPos(startPos:Vec3, destPos:Vec3, displace:number) {
        if (displace < this.detail) {
            this.points.push(startPos);
        }
        else {
            let midX:number = (startPos.x + destPos.x) / 2;
            let midY:number = (startPos.y + destPos.y) / 2;
            let midZ:number = (startPos.z + destPos.z) / 2;

            midX += (Math.random() - 0.5) * displace;
            midY += (Math.random() - 0.5) * displace;
            midZ += (Math.random() - 0.5) * displace;

            let midPos:Vec3 = new Vec3(midX,midY,midZ);

            this.collectLinPos(startPos, midPos, displace / 2);
            this.collectLinPos(midPos, destPos, displace / 2);
        }
    }
}