import { _decorator, Component, Animation, Sprite, Node, tween, Vec3 } from 'cc';
import { ChargeUI } from './ChargeUI';
import { HomeUI } from './HomeUI';
const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends Component {
    @property(Animation)
    public anim = null;
    @property(Sprite)
    public figure = null;
    @property(Node)
    public btnsNode = null;
    @property(ChargeUI)
    public chargeUI: ChargeUI;

    home: HomeUI;
    panelType;

    init (home: any, panelType: any) {
        this.home = home; 
        this.node.active = false; 
        this.anim.play('shop_reset'); 
        this.panelType = panelType; 
        
        tween(this.figure.node).repeatForever(
            tween(this.figure.node).sequence(
                tween(this.node).to(0.1, {scale: new Vec3(1, 1, 0.96)}),
                tween(this.node).to(0.1, {scale: new Vec3(1, 1, 1)})
            )
        ).start();

        this.chargeUI.init(home, this.btnsNode); 
    }

    show () {
        this.node.active = true; 
        this.anim.play('shop_intro'); 
    }

    hide () {
        this.anim.play('shop_outro'); 
    }

    onFinishShow () {
        this.home.curPanel = this.panelType; 
    }

    onFinishHide () {
        this.node.active = false; 
    }

}