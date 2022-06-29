import { _decorator, Component, Node } from 'cc';
import { UIMgr, UILayer } from './UIMgr';
import { HUD } from './HUD';
const { ccclass, property } = _decorator;

@ccclass('AppTs')
export class AppTs extends Component {
    start () {
        UIMgr.inst.setup(UILayer.NUM);
        UIMgr.inst.showUI(HUD);
    }
}