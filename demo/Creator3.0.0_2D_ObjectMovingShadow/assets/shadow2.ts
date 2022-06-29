import { _decorator, Component, Node, Camera, Sprite, RenderTexture, 
    SpriteFrame, UITransform, macro, Vec3, tween, EventTouch, Tween, GFXColorAttachment, GFXDepthStencilAttachment } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('shadow2')
export default class shadow2 extends Component {
    @property(Camera)
    roleCamera: Camera | null = null;
 
    @property([Sprite])
    ghostCanvasList: Sprite[] = [];
 
    @property(Node)
    role: Node | null = null;

    setAlpha : number = 200; // 设置阴影透明度的最大值
    alphaOffset : number = 30; // 每个阴影的渐变值
 
    onLoad() {
        this.ghostCanvasList.forEach((ghost, idx) => {
            let _color = ghost.node.getComponent(Sprite)!.color.clone();
            _color.a = this.setAlpha - idx * this.alphaOffset;
            ghost.node.getComponent(Sprite)!.color = _color;
          });

        this.schedule(this.ghostFollow, 0.1, macro.REPEAT_FOREVER);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    }
 
    touchMoveEvent(evt: EventTouch) {
        let pos = this.role!.getPosition();
        pos.x += evt.getUIDelta().x;
        pos.y += evt.getUIDelta().y;
        this.role!.setPosition(pos);
    }
    
    beforeDestroy() {
        this.unschedule(this.ghostFollow);
    }
    
    ghostFollow() {
        this.ghostCanvasList.forEach((ghost, i) => {
            const dis = ghost.node.position.clone().subtract(this.role!.position).length();
            console.log(dis);
            if (dis < 0.5) return; // 给个误差范围，涉及到浮点数，dis的计算不可能精准，小于0.5就可以认为是静止了
            Tween.stopAllByTarget(ghost.node);
            let pos = this.role!.getPosition();
            tween(ghost.node).to(i * 0.04 + 0.02, { position: pos}).start();
        });
    }
}