import { _decorator, Component, Node, Label, Button, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { GG } from "./Global";

@ccclass('Item')
export default class Item extends Component {
    onLoad() {
        this._localZOrder = this.node.getComponent(UITransform)!.priority;
    }

    init(data: any) {
        this.data = data;
        this.lbl_text.string = this.data.lbl;
    }

    /**
     * button事件
     */
    onBtn2DoSth() {
        GG.eventBus.emit(Item.EVENT_MAIN_BTN, this.data.evt);
    }

    /**
     * 启用或禁用按钮
     * @param enable 是否启用
     */
    enableOrDisableBtn(enable: boolean = false) {
        this.node.getComponent(Button)!.interactable = enable;
    }
    
    /**
     * 提升或恢复节点层级
     * @param add 
     */
    addOrResumeLocalZOrder(add: boolean = false) {
        if (add) {
            this.node.getComponent(UITransform)!.priority = 1;
            return;
        }
        this.node.getComponent(UITransform)!.priority = this._localZOrder;
    }

    static EVENT_MAIN_BTN: string = "EVENT_MAIN_BTN";
    data: any = {

    };

    /**
     * cell节点默认层级
     */
    private _localZOrder: number = 0;

    @property(Node)
    node_btn !: Node;
    @property(Label)
    lbl_text !: Label;
}
