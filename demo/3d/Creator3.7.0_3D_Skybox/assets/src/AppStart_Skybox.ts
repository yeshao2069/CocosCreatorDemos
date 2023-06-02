import { _decorator, Component, Node } from 'cc';
import { UI_SkyboxHUD } from './UI_Skybox_HUD';
import { UIMgr, UILayer } from './UIMgr';
const { ccclass, property } = _decorator;

@ccclass('AppStart_Skybox')
export class AppStart_Skybox extends Component {
    start () {
        UIMgr.inst.setup(UILayer.NUM);
        UIMgr.inst.showUI(UI_SkyboxHUD);
    }
}
