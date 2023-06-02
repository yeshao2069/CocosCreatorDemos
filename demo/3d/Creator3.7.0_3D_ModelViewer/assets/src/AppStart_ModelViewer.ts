import { _decorator, Component, Node } from 'cc';
import { UIMgr, UILayer } from './UIMgr';
import { UI_ModelViewer_HUD } from './UI_ModelViewer_HUD';
const { ccclass, property } = _decorator;

@ccclass('AppStart_ModelViewer')
export class AppStart_ModelViewer extends Component {

    start () {
        UIMgr.inst.setup(UILayer.NUM);
        UIMgr.inst.showUI(UI_ModelViewer_HUD);
    }
}
