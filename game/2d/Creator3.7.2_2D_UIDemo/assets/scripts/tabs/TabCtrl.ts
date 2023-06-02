import { _decorator, Component, Sprite, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TabCtrl')
export class TabCtrl extends Component {
    @property
    public idx = 0;
    @property(Sprite)
    public icon = null;
    @property(Node)
    public arrow = null;
    @property(Animation)
    public anim = null;

    init (tabInfo: any) {
        this.sidebar = tabInfo.sidebar; 
        this.idx = tabInfo.idx; 
        this.icon.spriteFrame = tabInfo.iconSF; 
        this.node.on('touchstart', this.onPressed.bind(this), this.node); 
        this.arrow.scale = cc.v2(0, 0); 
    }

    onPressed () {
        this.sidebar.tabPressed(this.idx); 
    }

    turnBig () {
        this.anim.play('tab_turn_big'); 
    }

    turnSmall () {
        this.anim.play('tab_turn_small'); 
    }

}
