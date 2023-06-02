import { _decorator, Component, Node, Label, Prefab, instantiate, UITransform } from 'cc';
import { BtnScrollCell } from './BtnScrollCell';
import { GG } from './Global';
import Item from './Item';
import ScrollOption, { CellTranslationDirect } from './ScrollOption';
const { ccclass, property } = _decorator;

@ccclass('TestView')
export default class TestView extends Component {

    onLoad() {
        this.lbl_tip.string = "";
    }

    start() {
        // 初始化纵向列表
        this.node_1.getChildByName("scrollOption")!.getComponent(ScrollOption)!.init({
            getSpacing: (): number => {
                return 2;
            },
            getCellSize: (): Array<number> => {
                const node: Node = instantiate(this.prefab_item);
                const contentSize = node.getComponent(UITransform)!;
                return [contentSize.width, contentSize.height];
            },
            getCellNumber: (): number => {
                return this.BTNS.length;
            },
            getCellView: (): BtnScrollCell => {
                return instantiate(this.prefab_item)!.addComponent(BtnScrollCell);
            },
            getCellData: (): any => {
                return this.BTNS;
            },
            getCellScale: (): number => {
                return 2;
            },
            getTranslation: (): Array<number> => {
                return [CellTranslationDirect.RIGHT_OR_TOP, 2.5];
            },
            getDefaultLoaction: (): number => {
                return 3;
            },
            script: this
        });

        // 初始化横向列表
        this.node_2.getChildByName("scrollOption")!.getComponent(ScrollOption)!.init({
            getSpacing: (): number => {
                return 2;
            },
            getCellSize: (): Array<number> => {
                const node: Node = instantiate(this.prefab_item);
                const contentSize = node.getComponent(UITransform)!;
                return [contentSize.width, contentSize.height];
            },
            getCellNumber: (): number => {
                return this.BTNS.length;
            },
            getCellView: (): BtnScrollCell => {
                return instantiate(this.prefab_item)!.addComponent(BtnScrollCell);
            },
            getCellData: (): any => {
                return this.BTNS;
            },
            getCellScale: (): number => {
                return 2;
            },
            getTranslation: (): Array<number> => {  // 设置cell偏移方向和偏移系数，系数为0不偏移
                return [CellTranslationDirect.LEFT_OR_BOTTOM, 0];
            },
            getDefaultLoaction: (): number => {
                return 3;
            },
            script: this
        });
    }

    /**
     * 按钮事件
     * @param evt 
     */
    onMainBtnToDo(evt: string) {
        if(evt == "") {
            this.lbl_tip.string = "无事件";
            return;
        }

        this[evt]();
    }
    onBtnToDo1(){
        this.lbl_tip.string = "按钮事件1";
    }
    onBtnToDo2(){
        this.lbl_tip.string = "按钮事件2";
    }
    onEnable() {
        GG.eventBus.on(Item.EVENT_MAIN_BTN, this.onMainBtnToDo, this);
    }
    onDisable() {
        GG.eventBus.off(Item.EVENT_MAIN_BTN, this.onMainBtnToDo, this);
    }
    BTNS = [
        {name: "btn1",lbl: "1",evt: "onBtnToDo1",icon: "",desc: ""},
        {name: "btn2",lbl: "2",evt: "onBtnToDo2",icon: "",desc: ""},
        {name: "btn3",lbl: "3",evt: "",icon: "",desc: ""},
        {name: "btn4",lbl: "4",evt: "",icon: "",desc: ""},
        {name: "btn5",lbl: "5",evt: "",icon: "",desc: ""},
        {name: "btn6",lbl: "6",evt: "",icon: "",desc: ""},
        {name: "btn7",lbl: "7",evt: "",icon: "",desc: ""},
        {name: "btn8",lbl: "8",evt: "",icon: "",desc: ""},
        {name: "btn9",lbl: "9",evt: "",icon: "",desc: ""},
        {name: "btn10",lbl: "10",evt: "",icon: "",desc: ""}
    ];
    @property(Node)
    node_1 !: Node;
    @property(Node)
    node_2 !: Node;
    @property(Label)
    lbl_tip !: Label;
    @property(Prefab)
    prefab_item !: Prefab;
}