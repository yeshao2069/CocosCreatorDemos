import { _decorator, Node, Component, Button, Color, Sprite } from "cc";
import { DEV } from "cc/env";
import TweenUtil from "./TweenUtil";

const { ccclass, property } = _decorator;

/**
 * 卡片翻转
 * @version 20210320
 */
@ccclass('CardFlip')
export default class CardFlip extends Component {

    @property({ displayName: DEV && '卡片', type: Node })
    protected card: Node = null;

    @property({ displayName: DEV && '翻转按钮', type: Node })
    protected flipBtn: Node = null;

    /** 按钮组件 */
    protected button: Button = null;

    /** 正面颜色 */
    protected readonly frontColor: Color = Color.WHITE;

    /** 背面颜色 */
    protected readonly backColor: Color = Color.GRAY;

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.flipBtn.on(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        this.flipBtn.off(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
    }

    /**
     * 初始化
     */
    protected init() {
        this.button = this.flipBtn.getComponent(Button) || this.flipBtn.addComponent(Button);
    }

    /**
     * 重置
     */
    protected reset() {
        let spf = this.card.getComponent(Sprite);
        spf.color = this.frontColor;
        this.setButtonState(true);
    }

    /**
     * 翻转按钮点击回调
     */
    protected async onFlipBtnClick() {
        if (!this.button.interactable) return;
        this.setButtonState(false);
        await TweenUtil.flip(this.card, 2, 0.5, () => {
            let spf = this.card.getComponent(Sprite);
            if (spf.color.equals(this.frontColor)) {
                spf.color = this.backColor;
            } else {
                spf.color = this.frontColor;
            }
        });
        this.setButtonState(true);
    }

    /**
     * 设置按钮状态
     * @param interactable 是否可点击
     */
    protected setButtonState(interactable: boolean) {
        this.button.interactable = interactable;
        let spf = this.flipBtn.getComponent(Sprite);
        spf.color = interactable ? Color.WHITE : Color.GRAY;
    }

}
