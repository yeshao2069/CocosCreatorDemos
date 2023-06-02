import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardArrayFlipFrontCardBase')
export default class CardArrayFlip_FrontCardBase extends Component {
    @property(Node)
    protected main: Node | null = null;
    @property(Node)
    protected back: Node | null = null;
    @property(Node)
    protected front: Node | null = null;
    protected onLoad() {
        this.init();
    }

    /**
    * 初始化
    */
    protected init() {
        // 隐藏
        this.hide();
        // 重置
        this.front.active = false;
        this.back.active = true;
    }

    /**
    * 展示
    */
    public show() {
        this.main.active = true;
    }

    /**
    * 隐藏
    */
    public hide() {
        this.main.active = false;
    }

    /**
    * 翻到正面
    */
    public flipToFront(): Promise<void> {
        return null;
    }

    /**
    * 翻到背面
    */
    public flipToBack(): Promise<void> {
        return null;
    }
}