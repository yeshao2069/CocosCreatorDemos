
import { _decorator, Component, Node, CCFloat, EventTouch, UITransform, tween, Vec3, Sprite, TweenSystem, UIOpacity, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RevolvePageView')
export class RevolvePageView extends Component {
    @property({type: CCFloat, tooltip: "旋转所需的时间"})
    revolveTime : number = 0.8;

    // 存储数据数组
    attrArray : string[] = [];
    // 可变节点数组
    cardsArray : Node[] = [];
    // 记录 node1 的位置作为参照
    firstIndex: number = 0;

    beginTouchPos: Vec2 = new Vec2();
    endTouchPos: Vec2 = new Vec2();

    onLoad () {
        this.attrArray = [
            JSON.stringify({
                zIndex: 3,
                scale: 1,
                opacity: 255,
                pos: new Vec3(0, 0, 0)
            }),
            JSON.stringify({
                zIndex: 2,
                scale: 0.8,
                opacity: 210,
                pos: new Vec3(250, 0, 0)
            }),
            JSON.stringify({
                zIndex: 1,
                scale: 0.5,
                opacity: 150,
                pos: new Vec3(175, 0, 0)
            }),
            JSON.stringify({
                zIndex: 0,
                scale: 0.2,
                opacity: 90,
                pos: new Vec3(0, 0, 0)
            }),
            JSON.stringify({
                zIndex: 1,
                scale: 0.5,
                opacity: 150,
                pos: new Vec3(-175, 0, 0)
            }),
            JSON.stringify({
                zIndex: 2,
                scale: 0.8,
                opacity: 210,
                pos: new Vec3(-250, 0, 0)
            }),
        ];

        // 将cardsNode子节点的各个属性初始化
        this.cardsArray = this.node.children;

        let tempZIndexs = [];
        for (let i = 0; i < this.cardsArray.length; i++) {
            const initAttr = JSON.parse(this.attrArray[i]);
            const zIndex = initAttr['zIndex'];
            const scale = initAttr['scale'];
            const opacity = initAttr['opacity'];
            const pos = initAttr['pos'];
            tempZIndexs.push(zIndex);
            this.cardsArray[i].setScale(scale, scale, 1);
            let uiOpacity = this.cardsArray[i].getComponent(UIOpacity);
            if (!uiOpacity) {
                uiOpacity = this.cardsArray[i].addComponent(UIOpacity);
            }
            uiOpacity.opacity = opacity;
            this.cardsArray[i].setPosition(pos);
        }

        // 触摸监听
        this.node.on(Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnded, this);
    }

    onTouchBegin (evt: EventTouch) {
        this.beginTouchPos = evt.getUILocation();
    }

    onTouchEnded (evt: EventTouch) {
        // 首先判断动作是否执行完
        for (let i = 0; i < this.cardsArray.length; i++) {
            if (TweenSystem.instance.ActionManager.getActionByTag(1, this.cardsArray[i])) {
                return;
            } 
        }

        let playingNum = TweenSystem.instance.ActionManager.getNumberOfRunningActionsInTarget(this.node);
        if (playingNum > 0) {
            return;
        }

        this.endTouchPos = evt.getUILocation();
        let deltaX = this.endTouchPos.subtract(this.beginTouchPos.clone()).x;
        let xDiff = this.node.parent!.getComponent(UITransform)!.width / 40;
        if (deltaX >= xDiff) {
            // 说明是往右滑动
            this.revolve2Right();
        } else if (deltaX < -xDiff) {
            // 说明是向左滑动
            this.revolve2Left();
        }
    }

    revolve2Right () {
        this.firstIndex ++;

        const len = this.node.children.length;
        if (this.firstIndex > len - 1) {
            this.firstIndex -= len;
        }
        const firstIndex = this.firstIndex;
        let zIndexs = [];
        
        // 往右旋转
        for (let i = 0; i < len; i++) {
            // 从 node1 的位置开始查找节点
            let cardNum = firstIndex + i;
            if (cardNum > len - 1) {
                cardNum -= len;
            }
            
            // 获取目标属性
            let nextAttr = JSON.parse(this.attrArray[cardNum]);

            const card = this.node.getChildByName(`card${i+1}`)!;

            // 改变z值
            const zIndex = nextAttr['zIndex'];
            let k = [];
            k.push(cardNum);
            k.push(zIndex);
            zIndexs.push(k);

            // 位置
            const pos = nextAttr['pos'];
            
            // 颜色
            let uiOpacity = card.getComponent(UIOpacity);
            const opacity = nextAttr['opacity'];

            // 改变大小、透明度、位置
            tween(card).parallel(
                tween(card)
                    .to(this.revolveTime, { scale: new Vec3(nextAttr['scale'], nextAttr['scale'], 1)}),
                tween(card)
                    .to(this.revolveTime, { position: pos})
            ).tag(1).start();
            // @ts-ignore
            tween(uiOpacity).to(this.revolveTime, { opacity: opacity }).tag(1).start();
        }

        // 对数组进行整理
        zIndexs.sort((a: number[], b: number[]) => {
            return (b[1] - a[1])
        }).sort((a: number[], b: number[]) => {
            return a[0] > b[0] ? a[0] : b[0];
        })

        for (let i = 0; i < len; i++) {
            let index = zIndexs[i][0] + 1;
            let card = this.node.getChildByName(`card${index}`);
            card!.setSiblingIndex(0);
        }
    }

    revolve2Left () {
        this.firstIndex --;

        const len = this.node.children.length;
        if (this.firstIndex < 0) {
            this.firstIndex += len;
        }
        const firstIndex = this.firstIndex;
        let zIndexs = [];
        
        // 往左旋转
        for (let i = 0; i < len; i++) {
            let cardNum = firstIndex + i;
            if (cardNum > len - 1) {
                cardNum -= len;
            }

            // 获取目标属性
            let nextAttr = JSON.parse(this.attrArray[cardNum]);

            const card = this.node.getChildByName(`card${i+1}`)!;

            // 改变z值
            const zIndex = nextAttr['zIndex'];
            let z = [];
            z.push(cardNum);
            z.push(zIndex);
            zIndexs.push(z);

            // 位置
            const pos = nextAttr['pos'];

            // 颜色
            let uiOpacity = card.getComponent(UIOpacity);
            const opacity = nextAttr['opacity'];

            // 改变大小、透明度、位置
            tween(card).parallel(
                tween(card)
                    .to(this.revolveTime, { scale: new Vec3(nextAttr['scale'], nextAttr['scale'], 1)}),
                tween(card)
                    .to(this.revolveTime, { position: pos})
            ).tag(1).start();
            // @ts-ignore
            tween(uiOpacity).to(this.revolveTime, { opacity: opacity }).tag(1).start();
        }
        
        zIndexs.sort((a: number[], b: number[]) => {
            return (b[1] - a[1])
        }).sort((a: number[], b: number[]) => {
            return a[0] > b[0] ? a[0] : b[0];
        })

        for (let i = 0; i < len; i++) {
            let index = zIndexs[i][0] + 1;
            let card = this.node.getChildByName(`card${index}`);
            card!.setSiblingIndex(0);
        }
    }
}
