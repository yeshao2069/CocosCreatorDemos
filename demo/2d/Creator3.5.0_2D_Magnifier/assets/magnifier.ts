
import { _decorator, Component, Node, view, RenderTexture, SpriteFrame, Camera, Sprite, Vec3, Slider, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Magnifier')
export class Magnifier extends Component {
    @property(Node)
    magnifier !: Node;
    @property(Node)
    cameraNode !: Node;
    @property(Node)
    spriteNode !: Node;
    @property(Slider)
    sliderNode !: Slider;
    @property(Label)
    scaleLabel !: Label;

    touchStartPos = new Vec3();
    magnifierOriginPos = new Vec3();
    tempPos = new Vec3();
    viewSizeWidthHalf = 0;
    viewSizeHeightHalf = 0;
    scaleFactor = 2;
    BASE_FACTOR = 2; // 最低缩放因子

    onLoad () {
        const viewSize = view.getVisibleSize();
        this.viewSizeWidthHalf = viewSize.width / 2;
        this.viewSizeHeightHalf = viewSize.height / 2;
        this.scaleLabel.string = this.scaleFactor + "倍";

        this.initCamera();
        const magnifierPos = this.magnifier.getPosition();
        this.cameraNode.setPosition(magnifierPos.x, magnifierPos.y, this.cameraNode.getPosition().z);

        this.magnifier.on(Node.EventType.TOUCH_START, this.touchStartEvent, this);
        this.magnifier.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
    }

    touchStartEvent(event: any) {
        const localPos = event.getUILocation();
        this.touchStartPos.set(localPos.x, localPos.y, this.touchStartPos.z);
    }

    touchMoveEvent(event: any) {
        const localPos = event.getUILocation();
        this.tempPos.set(localPos.x - this.viewSizeWidthHalf, localPos.y - this.viewSizeHeightHalf, this.tempPos.z);

        this.magnifier.setPosition(this.tempPos);
        this.cameraNode.setPosition(this.tempPos.x, this.tempPos.y, this.cameraNode.getPosition().z);
    }

    initCamera (){
        const visibleRect = view.getVisibleSize();

        let rendertex = new RenderTexture();
        rendertex.initialize({ width: visibleRect.width, height:visibleRect.height });
        
        let sp = new SpriteFrame();
        this.cameraNode.getComponent(Camera)!.targetTexture = rendertex;
        sp.texture = rendertex;
        this.spriteNode.getComponent(Sprite)!.spriteFrame = sp;
        this.spriteNode.setScale(this.scaleFactor, this.scaleFactor, 1);
    }

    onSliderEvent (){
        let pb = Math.round(this.sliderNode.getComponent(Slider)!.progress * 10);
        this.scaleFactor = this.BASE_FACTOR + pb;
        this.scaleLabel.string = this.scaleFactor + "倍";
        this.spriteNode.setScale(this.scaleFactor, this.scaleFactor, 1);
    }
}
