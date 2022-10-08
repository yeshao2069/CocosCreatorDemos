import { _decorator, Widget, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

import Item from "./Item";
import { ScrollOptionCell } from './ScrollOptionCell';

/**
 * 滚动菜单
 */
@ccclass('BtnScrollCell')
export class BtnScrollCell extends ScrollOptionCell {
    public updateContent(data: any) {
        if (!data) return;
        this.node.getComponent(Item)!.init(data[this.dataIndex]);
        this.node.getComponent(Item)!.enableOrDisableBtn();
        this.node.name = "cell_" + this.dataIndex;
        this.node.getComponent(UIOpacity)!.opacity = 100;
    }
    public enableCell(data: any) {
        this.node.getComponent(UIOpacity)!.opacity = 255;
        this.node.getComponent(Item)!.enableOrDisableBtn(true);
        if (this.showed) return;
        this.showed = true;
        // 显示详情等
        // this.script.onBtn2ShowBtnDesc(data[this.dataIndex].desc);
    }
    public disableCell() {
        this.node.getComponent(UIOpacity)!.opacity = 100;
        this.node.getComponent(Item)!.enableOrDisableBtn();
        this.showed = false;
    }
}
