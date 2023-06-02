import { _decorator, Component, Node, director, tween, Vec3, TweenSystem } from 'cc';
import { MenuSidebar } from './MenuSidebar';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property
    public sidebar : MenuSidebar;
    @property(Node)
    public roller = null;
    @property
    public panelWidth = 0;
    @property
    public tabSwitchDuration = 0;

    curPanelIdx;
    
    onLoad () {
        this.sidebar.init(this); 
        this.curPanelIdx = 0; 
        this.roller.x = this.curPanelIdx * -this.panelWidth; 
    }

    switchPanel (idx: any) {
        this.curPanelIdx = idx; 
        let newX = this.curPanelIdx * -this.panelWidth; 
        director.getScheduler().pauseTarget(this.roller); 

        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.roller);
        tween(this.roller).sequence(
            tween(this.roller).to(this.tabSwitchDuration, { position: new Vec3(newX, 0, 0) }, { easing: "quintInOut"}),
            tween(this.roller).call(()=>{
                this.onSwitchPanelFinished();
            })
        ).start();
    }

    onSwitchPanelFinished () {
        director.getScheduler().resumeTarget(this.roller); 
    }

}
