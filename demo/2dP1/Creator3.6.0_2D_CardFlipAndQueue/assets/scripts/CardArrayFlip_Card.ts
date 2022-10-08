import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('CardArrayFlipCard')
@executeInEditMode
export default class CardArrayFlip_Card extends Component {
    @property(Node)
    protected back: Node | null = null;
    @property(Node)
    protected front: Node | null = null;
    @property
    public k: number = 0;
    protected _z: number = 0;
    /** 节点在世界坐标中的 z 值 */
    public get z() {
        return this._z;
    }
    /** 是否面向屏幕 */
    protected get facingScreen() {
        return this.node.forward.z < this.k;
    }
    protected onEnable() {
        this.updateWorldZ();
    }
    protected update(dt: number) {
        this.updateDisplay();
    }

    /**
    * 更新样式
    */
    protected updateDisplay() {
        const front = this.facingScreen;
        this.front.active = front;
        this.back.active = !front;
    }

    /**
    * 更新节点在世界坐标中的 z 值
    */
    public updateWorldZ() {
        const worldPos = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(this.node.position);
        this._z = worldPos.z;
    }

    /**
    * 设置层级
    * @param index 下标
    */
    public setSiblingIndex(index: number) {
        this.node.setSiblingIndex(index);
    }
}