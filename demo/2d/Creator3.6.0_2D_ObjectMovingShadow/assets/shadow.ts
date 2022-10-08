import { _decorator, Component, Node, Camera, Sprite, RenderTexture, 
    SpriteFrame, UITransform, macro, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('shadow')
export default class shadow extends Component {
    @property(Camera)
    camera: Camera | null = null;
 
    @property([Sprite])
    sp_cameras: Sprite[] = [];
 
    @property(Node)
    role: Node | null = null;
 
    onLoad() {
        this.role!.on(Node.EventType.TOUCH_MOVE, this.onRoleTouchMove, this);
        this.schedule(this.shadowFollow, 0.1, macro.REPEAT_FOREVER);
    }
 
    private shadowFollow() {
        this.sp_cameras.forEach((v, i) => {
            let nodePos = new Vec3(this.node.position);
            const dis = nodePos.subtract(v.node.position).length();
            let _tween = tween(v.node);
            if (dis > 0) {
                _tween.stop();
                let _x = this.role!.position.x;
                let _y = this.role!.position.y;
                let _pos = new Vec3(_x, _y, 0);
                _tween.to(i * 0.05 + 0.02, { position: _pos}).start();
            }
        })
    }

    private onRoleTouchMove(evt: any) {
        let pos = this.role!.position;
        
        this.role!.setPosition(pos.x + evt.getUIDelta().x, pos.y + evt.getUIDelta().y);
    }
    
}