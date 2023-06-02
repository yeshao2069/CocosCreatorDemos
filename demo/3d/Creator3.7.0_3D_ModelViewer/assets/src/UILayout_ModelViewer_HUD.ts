import { _decorator, Component, Node, Toggle, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UILayout_ModelViewer_HUD')
export class UILayout_ModelViewer_HUD extends Component {
    
    @property({type: Toggle})
    animLoop : Toggle = null;

    @property({type: Button})
    btnPrev:Button = null;

    @property({type: Button})
    btnNext:Button = null;

    @property({type: Label})
    txtCurAnim:Label = null;
}
