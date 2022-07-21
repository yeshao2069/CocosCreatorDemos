import { _decorator, utils, Component, Node, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

import PromiseUtil from "./PromiseUtil";
import CardArrayFlip_FrontCardBase from "./CardArrayFlip_FrontCardBase";

@ccclass('CaseCardArrayFlip')
export default class Case_CardArrayFlip extends Component {
    @property(Node)
    protected container: Node | null = null;
    @property(Node)
    protected cardNode: Node | null = null;
    protected card: CardArrayFlip_FrontCardBase = null;
    protected get frontArrayCard() {
        return this.container.children[this.container.children.length - 1];
    }
    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        this.card = this.cardNode.getComponent(CardArrayFlip_FrontCardBase);
        this.play();
    }

    public async play() {
        const frontCard = this.card;
        // 旋转两圈
        await this.rotate(2);
        // 等一会
        await PromiseUtil.sleep(0.2);
        // 替换卡片
        frontCard.show();
        this.frontArrayCard.active = false;
        // 翻卡
        await frontCard.flipToFront();
        // 等一会
        await PromiseUtil.sleep(2);
        // 翻卡
        await frontCard.flipToBack();
        // 替换卡片
        this.frontArrayCard.active = true;
        frontCard.hide();
        // 等一会
        await PromiseUtil.sleep(0.2);
        // 继续
        this.play();
    }

    /**
     * 旋转
     * @param round 圈数
     */
    public rotate(round: number) {
        return new Promise<void>(res => {
          const node = this.container,
          time = 1 * round,
          { x, z } = this.node.eulerAngles,
          eulerAngles = new Vec3(x, 360 * round, z);
          tween(node)
            .by(time, { eulerAngles }, { easing: 'quadOut' })
            .call(res)
            .start();
        });
    }
}