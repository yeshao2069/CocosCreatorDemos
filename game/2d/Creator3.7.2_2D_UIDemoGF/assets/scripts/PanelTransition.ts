import { _decorator, Component, Vec3, Color, UIRenderer } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export class PanelTransition extends Component {
    @property
    public duration = 0;

    public outOfWorld = new Vec3();

    private _color = new Color();

     // use this for initialization
    onLoad() {
        this.outOfWorld = new Vec3(3000, 0, 0);
        this.node.setPosition(this.outOfWorld);
        
        this.node.on('fade-in', this.startFadeIn, this);
    }

    startFadeIn() {
        this.node.setPosition(0, 0, 0);
        this.node.setScale(2, 2, 2);
        const renderComp = this.node.getComponent(UIRenderer)!;
        this._color.set(renderComp.color);
        this._color.a = 0;
        renderComp.color = this._color;
    }

    onFadeOutFinish() {
        this.node.setPosition(this.outOfWorld);
    }
}
