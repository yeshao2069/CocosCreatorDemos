import { _decorator, Component, Vec3, Node, tween, TweenSystem } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonScaler')
export class ButtonScaler extends Component {
    @property
    public pressedScale = 1;
    @property
    public transDuration = 0;

    private initScale : Vec3 = new Vec3(1, 1, 1);

    start () {
        this.initScale.x = this.node.scale.x;
        this.initScale.y = this.node.scale.y;

        function onTouchDown (event: TouchEvent) { 
            let node = event.target as any;
            TweenSystem.instance.ActionManager.removeAllActionsFromTarget(node);
            tween(node).to(this.transDuration, { scale: new Vec3(this.pressedScale, this.pressedScale, 1) }).start();
        } 
        function onTouchUp (event) { 
            let node = event.target as any;
            TweenSystem.instance.ActionManager.removeAllActionsFromTarget(node);
            tween(node).to(this.transDuration, { scale: this.initScale }).start();
        } 
        this.node.on(Node.EventType.TOUCH_START, onTouchDown, this); 
        this.node.on(Node.EventType.TOUCH_END, onTouchUp, this); 
        this.node.on(Node.EventType.TOUCH_CANCEL, onTouchUp, this); 
    }

}
