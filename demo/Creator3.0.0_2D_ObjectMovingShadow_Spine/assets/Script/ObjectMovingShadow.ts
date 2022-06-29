import { _decorator,
    Component,
    Camera,
    Sprite,
    Node,
    macro, 
    RenderTexture,
    UITransform,
    SpriteFrame,
    tween,
    Vec3,
    GFXColorAttachment,
    GFXDepthStencilAttachment} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectMovingShadow')
export default class ObjectMovingShadow extends Component {
    @property([Camera])
    cameras: Camera[] = [];
    @property([Sprite])
    sp_cameras: Sprite[] = [];
    @property(Node)
    node_icon!: Node;

    onLoad() {
        
        const pos = this.sp_cameras[0].node.getComponent(UITransform)!.contentSize;
        this.sp_cameras.forEach((v, i) => {
            const _colorAttachment = new GFXColorAttachment();
            const _depthStencilAttachment = new GFXDepthStencilAttachment();

            let renderTex = new RenderTexture();
            renderTex.reset({
                width: pos.width,
                height: pos.height,
                passInfo: {
                    colorAttachments: [_colorAttachment],
                    depthStencilAttachment: _depthStencilAttachment,
                    subPasses: []
                }
            });

            let spriteFrame = v.spriteFrame!;
            let sp: SpriteFrame = new SpriteFrame();
            sp.reset({
                originalSize: spriteFrame.originalSize,
                rect: spriteFrame.rect,
                offset: spriteFrame.offset,
                isRotate: spriteFrame.rotated,
                borderTop: spriteFrame.insetTop,
                borderLeft: spriteFrame.insetLeft,
                borderRight: spriteFrame.insetRight,
                borderBottom: spriteFrame.insetBottom,
            });

            this.cameras[i]!.targetTexture = renderTex;
            sp.texture = renderTex;
            v.spriteFrame = sp;
        });

        this.node.on(Node.EventType.TOUCH_MOVE, this.onNodeIconTouchMove, this);
        this.schedule(this.shadowFollow, 0.1, macro.REPEAT_FOREVER);
    }
    private shadowFollow() {
        this.sp_cameras.forEach((v, i) => {
            const dis = this.node.position.subtract(v.node.position).length();
            if (dis > 0) {
                tween(v.node).stop();
                const pos = this.node_icon.getPosition();
                tween(v.node).to(i * 0.05 + 0.02, { position: new Vec3(pos)}).start();
            }
        })
    }

    private onNodeIconTouchMove(evt: any) {
        let pos = this.node_icon.getPosition();
        this.node_icon!.setPosition(pos.x + evt.getDeltaX(), pos.y + evt.getDeltaY(), pos.z);
    }
}
