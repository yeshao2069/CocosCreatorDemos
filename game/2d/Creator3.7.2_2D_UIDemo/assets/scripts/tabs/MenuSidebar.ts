import { _decorator, Component, SpriteFrame, Prefab, Node, instantiate, director, TweenSystem, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuSidebar')
export class MenuSidebar extends Component {
    @property([SpriteFrame])
    public tabIcons = [];
    @property(Prefab)
    public tabPrefab = null;
    @property(Node)
    public container = null;
    @property(Node)
    public highlight = null;
    @property
    public tabWidth = 0;

    mainMenu;
    tabSwitchDuration;
    curTabIdx;
    tabs = [];

    init (mainMenu: any) {
        this.mainMenu = mainMenu; 
        this.tabSwitchDuration = mainMenu.tabSwitchDuration; 
        this.curTabIdx = 0; 
        this.tabs = []; 
        for (let i = 0; i < this.tabIcons.length; ++i) { 
            let iconSF = this.tabIcons[i]; 
            let tab = instantiate(this.tabPrefab).getComponent('TabCtrl'); 
            this.container.addChild(tab.node); 
            tab.init({ 
                sidebar: this, 
                idx: i, 
                iconSF:iconSF 
            }); 
            this.tabs[i] = tab; 
        } 
        this.tabs[this.curTabIdx].turnBig(); 
        this.highlight.x = this.curTabIdx * this.tabWidth; 
    }

    tabPressed (idx: any) {
        for (let i = 0; i < this.tabs.length; ++i) { 
            let tab = this.tabs[i]; 
            if (tab.idx === idx) { 
                tab.turnBig(); 
                director.getScheduler().pauseTarget(tab.node); 
            } else if (this.curTabIdx === tab.idx) { 
                tab.turnSmall(); 
                director.getScheduler().resumeTarget(tab.node); 
            } 
        } 
        this.curTabIdx = idx; 

        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.highlight);
        tween(this.highlight)
            .to(this.tabSwitchDuration, { position: new Vec3(this.curTabIdx * this.tabWidth, 0, 0)}, { easing: "quintInOut"})
            .start();


        this.mainMenu.switchPanel(this.curTabIdx);
    }

}