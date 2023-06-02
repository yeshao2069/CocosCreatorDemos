import { _decorator, Component, Node, director, v3, Vec3, UIOpacity, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PanelTransition')
export class PanelTransition extends Component {
    @property
    public duration = 0;

    outOfWorld : Vec3;


    onLoad () {
        this.outOfWorld = v3(3000, 0, 0); 
        this.node.setPosition(this.outOfWorld);
        this.node.on('fade-in', this.startFadeIn, this); 
        this.node.on('fade-out', this.startFadeOut, this); 
    }

    startFadeIn () {
        director.getScheduler().pauseTarget(this.node); 
        this.node.setPosition(0, 0, 0);
        this.node.setScale(2, 2, 1); 
        this.node.getComponent(UIOpacity).opacity = 0; 

        tween(this.node).sequence(
            tween(this.node.getComponent(UIOpacity) as any).to(this.duration, { opacity: 255 }),
            tween(this.node).to(this.duration, { scale: new Vec3(1, 1, 1) })
        ).call(()=>{
            this.onFadeInFinish();
        }).start();
    }

    startFadeOut () {
        director.getScheduler().pauseTarget(this.node); 
        tween(this.node).sequence(
            tween(this.node.getComponent(UIOpacity) as any).to(this.duration, { opacity: 0 }),
            tween(this.node).to(this.duration, { scale: new Vec3(2, 2, 1) })
        ).call(()=>{
            this.onFadeOutFinish();
        }).start();
    }

    onFadeInFinish () {
        director.getScheduler().resumeTarget(this.node); 
    }

    onFadeOutFinish () {
        this.node.setPosition(this.outOfWorld);
    }
}
