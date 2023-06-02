import { _decorator, Component, Node, Toggle } from 'cc';
import { UIController } from './UIController';
import { UILayer, UIMgr } from './UIMgr';
import { PlayerCtrl } from './PlayerCtrl';
import { UILayout_ModelViewer_HUD } from './UILayout_ModelViewer_HUD';


export class UI_ModelViewer_HUD extends UIController {

    constructor() {
        super('prefab/ui_hud_panel', UILayer.HUD);
    }

    private get layout(): UILayout_ModelViewer_HUD {
        return this.node.getComponent(UILayout_ModelViewer_HUD);
    }

    protected onCreated() {
        this.onButtonEvent(this.layout.btnPrev, () => {
            PlayerCtrl.inst.playPrev();
            this.layout.txtCurAnim.string = PlayerCtrl.inst.curAnimName;
        });

        this.onButtonEvent(this.layout.btnNext, () => {
            PlayerCtrl.inst.playNext();
            this.layout.txtCurAnim.string = PlayerCtrl.inst.curAnimName;
        });

        this.onToggleEvent(this.layout.animLoop, (toggle: Toggle) => {
            PlayerCtrl.inst.isLoop = toggle.isChecked;
        });
        
        this.layout.animLoop.isChecked = PlayerCtrl.inst.isLoop;
    }
}