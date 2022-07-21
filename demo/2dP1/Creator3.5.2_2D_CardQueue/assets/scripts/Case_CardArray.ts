import { _decorator, Component, Node, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CaseCardArray')
export default class Case_CardArray extends Component {
    @property(Node)
    protected container: Node | null = null;
    protected start() {
        this.rotateForever();
    }

    /**
    * 无限旋转
    */
    public rotateForever() {
        const node = this.container,
        { x, z } = this.node.eulerAngles;
        tween(node)
            .by(2, { eulerAngles: new Vec3(x, 90, z) })
            .repeatForever()
            .start();
    }
}