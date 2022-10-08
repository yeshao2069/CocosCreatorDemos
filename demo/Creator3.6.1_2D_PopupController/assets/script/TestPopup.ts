
import { _decorator, Component, Node, Label, Layers } from 'cc';
import { EventManager } from './EventManager';
import { PopupBase } from './PopupBase';
import { ShowPopupEvent } from './TestScene';
const { ccclass, property } = _decorator;

@ccclass('TestPopup')
export class TestPopup extends PopupBase {

    @property({
        type: Label
    })
    nameLabel: Label = null!;

    init() {
        this.nameLabel.string = this.popupName;
    }

    onPopup2() {
        EventManager.instance.emit(ShowPopupEvent.POPUP2);
    }
}
