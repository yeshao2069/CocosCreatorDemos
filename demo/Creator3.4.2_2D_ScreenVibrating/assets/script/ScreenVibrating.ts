
import { _decorator, Component, Node, EventTouch, AnimationComponent, Animation, tween, Vec3, Tween, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenVibrating')
export class ScreenVibrating extends Component {

    @property(Node)
    bgNode !: Node;
    @property(Node)
    hitFeedback !: Node;

  onLoad() {
    this.shakeEffect(this.bgNode, 1);
  }

  hit(evt: EventTouch) {
    this.shakeEffect((evt.currentTarget as Node), 0.6);

    const tempPosVec3 = new Vec3(evt.getUILocation().x, evt.getUILocation().y, 0);
    let touchPos: Vec3 = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(tempPosVec3);
    
    this.hitFeedback.setPosition(touchPos);
    this.hitFeedback.active = true;

    let anim = this.hitFeedback.getComponent(AnimationComponent)!;
    anim.on(Animation.EventType.FINISHED, () => {
        this.hitFeedback.active = false;
        anim.getState(anim.defaultClip!.name).setTime(0);
        anim.stop();
    });
    anim.play();
  }

  shakeEffect(node: Node, duration: number) {
    Tween.stopAllByTarget(node);
    tween(node).repeatForever(
        tween(node)
            .to(0.02, {position: new Vec3(5, 7, 0)})
            .to(0.02, {position: new Vec3(-6, 7, 0)})
            .to(0.02, {position: new Vec3(-13, 3, 0)})
            .to(0.02, {position: new Vec3(3, -6, 0)})
            .to(0.02, {position: new Vec3(-5, 5, 0)})
            .to(0.02, {position: new Vec3(2, -8, 0)})
            .to(0.02, {position: new Vec3(-8, -10, 0)})
            .to(0.02, {position: new Vec3(3, 10, 0)})
            .to(0.02, {position: new Vec3(0, 0, 0)})
    ).start();

    this.scheduleOnce(() => {
        Tween.stopAllByTarget(node);
        node.setPosition(0, 0, 0);
    }, duration);
  }
}

