import { _decorator, Component, Node, Camera, Sprite, RenderTexture, SpriteFrame, GFXColorAttachment, GFXTextureLayout, GFXDepthStencilAttachment, GFXFormat, GFXLoadOp, GFXStoreOp, Vec3 } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('ReaderTexture')
export class ReaderTexture extends Component {
    @type(Sprite)
    modelSprite!: Sprite;
    @type(Camera)
    camera!: Camera ;
    @type(Node)
    player!: Node;

    private isRotate: boolean = false;


    start() {
        this.isRotate = false;
        this.player.active = false;
        this.refreshRenderTexture();
    }
    btnShowPlayerEvent(): void {
        this.player.active = true;
    }
    btnHidePlayerEvent(): void {
        this.isRotate = false;
        this.player.active = false;
    }
    btnRotatePlayerEvent(): void {
        this.isRotate = true;
    }
    update(deltaTime: number) {
        if (this.isRotate) {
            let eulerAngles: Vec3 = this.player.eulerAngles;
            eulerAngles.y++;
            this.player.eulerAngles = eulerAngles;
        }
    }

    refreshRenderTexture(): void {
        this.isRotate = false;
        this.player.active = false;

        const _colorAttachment = new GFXColorAttachment();
        const _depthStencilAttachment = new GFXDepthStencilAttachment();

        let renderTex = new RenderTexture();
        renderTex.reset({
            width: 350,
            height: 610,
            passInfo: {
                colorAttachments: [_colorAttachment],
                depthStencilAttachment: _depthStencilAttachment,
                subPasses : []
            }
        });

        let spriteframe: SpriteFrame = this.modelSprite.spriteFrame!;
        let sp: SpriteFrame = new SpriteFrame();
        sp.reset({
            originalSize: spriteframe.originalSize,
            rect: spriteframe.rect,
            offset: spriteframe.offset,
            isRotate: spriteframe.rotated,
            borderTop: spriteframe.insetTop,
            borderLeft: spriteframe.insetLeft,
            borderBottom: spriteframe.insetBottom,
            borderRight: spriteframe.insetRight,
        });

        this.camera.targetTexture = renderTex;
        sp.texture = renderTex;
        this.modelSprite.spriteFrame = sp;
    }
}
