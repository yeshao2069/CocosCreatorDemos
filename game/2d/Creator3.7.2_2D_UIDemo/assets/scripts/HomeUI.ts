import { _decorator, Component, Animation, Node, Enum, director } from 'cc';
import { BackPackUI } from './BackPackUI';
import { ShopUI } from './ShopUI';
const { ccclass, property } = _decorator;

const PanelType = Enum({
    Home: -1,
    Shop: -1,
});
@ccclass('HomeUI')
export class HomeUI extends Component {
    @property(Animation)
    public menuAnim = null;
    @property([Node])
    public homeBtnGroups = [];
    @property(BackPackUI)
    public backPackUI = null!;
    @property(ShopUI)
    public shopUI: ShopUI = null!;

    curPanel = null;

    onLoad () {
        this.curPanel = PanelType.Home; 
        this.menuAnim.play('menu_reset'); 
    }

    start () {
        this.backPackUI.init(this); 
        this.shopUI.init(this, PanelType.Shop); 
        this.scheduleOnce ( function() { 
            this.menuAnim.play('menu_intro'); 
        }.bind(this), 0.5); 
    }

    toggleHomeBtns (enable: any) {
        for (let i = 0; i < this.homeBtnGroups.length; ++i) { 
            let group = this.homeBtnGroups[i]; 
            if (!enable) { 
                director.getScheduler().pauseTarget(group); 
            } else { 
                director.getScheduler().resumeTarget(group); 
            } 
        } 
    }

    gotoShop () {
        if (this.curPanel !== PanelType.Shop) { 
            this.shopUI.show(); 
        } 
    }

    gotoHome () {
        if (this.curPanel === PanelType.Shop) { 
            this.shopUI.hide(); 
            this.curPanel = PanelType.Home; 
        } 
    }
}