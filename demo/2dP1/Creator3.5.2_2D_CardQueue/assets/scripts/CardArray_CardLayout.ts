import { _decorator, Component, Node, Vec3 } from 'cc';
import { DEV } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

import CardArray_Card from './CardArray_Card';

@ccclass('CardArrayCardLayout')
@executeInEditMode
export default class CardArray_Layout extends Component {
    @property
    protected _radius: number = 350;
    @property({ displayName: DEV && '阵列半径' })
    public get radius() {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
        this.updateLayout();
    }
    @property
    protected _offset: number = 90;
    @property({ displayName: DEV && '卡片角度偏移' })
    public get offset() {
        return this._offset;
    }
    public set offset(value: number) {
        this._offset = value;
        this.updateLayout();
    }
    @property
    protected _k: number = 0;
    @property({ displayName: DEV && '正反面阈值' })
    public get k() {
        return this._k;
    }
    public set k(value: number) {
        this._k = value;
        this.updateKValue();
    }

    /** 卡片组件 */
    protected cards: CardArray_Card[] = null;
    protected onLoad() {
        this.init();
        this.registerEvent();
    }
    protected onDisable() {
        this.unregisterEvent();
    }

    /**
    * 初始化
    */
    protected init() {
        this.onChildChange();
    }

    /**
    * 注册事件
    */
    protected registerEvent() {
        // 节点增删
        this.node.on(Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.on(Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        // 旋转改变
        this.node.on(Node.EventType.TRANSFORM_CHANGED, this.onRotationChange, this);
    }

    /**
    * 反注册事件
    */
    protected unregisterEvent() {
        this.node.off(Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.off(Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.off(Node.EventType.TRANSFORM_CHANGED, this.onRotationChange, this);
    }

    /**
    * 子节点变化回调
    */
    protected onChildChange() {
        // 重新获取组件
        this.cards = this.getComponentsInChildren(CardArray_Card);
        // 更新 k 值
        this.updateKValue();
        // 更新布局
        this.updateLayout();
    }

    /**
    * 旋转变化回调
    */
    protected onRotationChange() {
        // 更新层级
        this.updateHierarchy();
    }

    /**
    * 更新布局
    */
    public updateLayout() {
        const nodes = this.node.children,
        count = nodes.length,
        radius = this._radius,
        offset = this._offset,
        delta = 360 / count;
        for (let i = 0; i < count; i++) {
            const node = nodes[i],
            angleY = -(delta * i),
            radian = (Math.PI / 180) * (angleY - offset);
            // 位置
            let pos = node.getPosition();
            pos.x = radius * Math.cos(radian);
            pos.z = -(radius * Math.sin(radian));
            node.setPosition(pos);

            // 角度
            const { x, z } = node.eulerAngles;
            node.eulerAngles = new Vec3(x, angleY, z);
            // node.rotationY = angleY;      // keep warning
            // node.eulerAngles.y = angleY;  // not working
        }
        // 更新层级
        this.updateHierarchy();
    }

    /**
    * 更新层级
    */
    public updateHierarchy() {
        const cards = this.cards,
        length = cards.length;
        // 更新卡片节点在世界坐标系中的 z 值
        for (let i = 0; i < length; i++) {
            cards[i].updateWorldZ();
        }
        // 排序从大到小，z 值越小的显示在越后面，层级 index 也越小
        cards.sort((a, b) => a.z - b.z);
        // 调整节点层级
        for (let i = 0; i < length; i++) {
            cards[i].setSiblingIndex(i);
        }
    }

    /**
    * 更新卡片的 k 值
    */
    protected updateKValue() {
        const cards = this.cards;
        for (let i = 0, l = cards.length; i < l; i++) {
        cards[i].k = this._k;
        }
    }
}
