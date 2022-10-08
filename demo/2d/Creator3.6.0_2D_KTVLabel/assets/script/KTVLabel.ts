const lb_uuid = 'lb';
const lb_top_uuid = 'lb_top';
const lb_mask_uuid = 'lb_mask';

import { _decorator, Component, Color, Node, Label, UITransform, Mask, CCFloat, Layout, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KTVLabel')
export class KTVLabel extends Component {

    private _string: string = '木限东';
    private _color: Color = Color.WHITE;
    private _color_mask: Color = Color.RED;
    private _progress: number = 0.5;
    private _fontSize = 40;

    @property({ multiline: false })
    set string(v) {
        this._string = v;
        this._updateRenderData();
    }
    get string() {
        return this._string;
    }
    @property({ tooltip: '底部字体颜色(默认为白色)'})
    set color(value) {
        if (!this._color.equals(value)) {
            this._color.set(value);
            this._updateRenderData();
        }
    }
    get color() {
        return this._color.clone();
    }
    @property({ tooltip: '上层字体颜色(默认为红色)' })
    set color_mask(value) {
        if (!this._color_mask.equals(value)) {
            this._color_mask.set(value);
            this._updateRenderData();
        }
    }
    get color_mask() {
        return this._color_mask.clone();
    }
    @property({ type: CCFloat, range: [0, 1], step: 0.01, slide: true, tooltip: '当前进度指引，范围从0到1'})
    set progress(value) {
        if (this._progress === value) return;

        this._progress = value;
        this._checkLabelInit();
        this._updateBarStatus();
    }
    get progress() {
        return this._progress;
    }
    @property({ tooltip: '文字尺寸' })
    set fontSize(value) {
        if (this._fontSize === value) return;
        this._fontSize = value;
        this._updateRenderData();
    }
    get fontSize() {
        return this._fontSize;
    }

    private _label !: Label;
    private _label_mask !: Label;
    private _node_mask !: Node;

    
    getTextWidth () {
        return this._label.getComponent(UITransform)!.contentSize.width || 0;
    }

    _checkLabelInit() {
        if (!this._label) {
            const node = this.node.getChildByName(lb_uuid) || new Node();
            const uiTrans = node.getComponent(UITransform) || node.addComponent(UITransform);
            node.getComponent(UITransform)!.setAnchorPoint(0, 0.5);
            node.name = lb_uuid;
            this._label = node.getComponent(Label) || node.addComponent(Label);
            if (node.parent !== this.node) {
                this.node.addChild(node);
            }  

        	node.off(Node.EventType.SIZE_CHANGED, this._updateBarStatus, this);
        	node.on(Node.EventType.SIZE_CHANGED, this._updateBarStatus, this);
        }

        if(!this._node_mask){
         	const node = this.node.getChildByName(lb_mask_uuid) || new Node();
             const uiTrans = node.getComponent(UITransform) || node.addComponent(UITransform);
         	node.getComponent(UITransform)!.setAnchorPoint(0, 0.5);
            node.name = lb_mask_uuid;
           	const mask = node.getComponent(Mask) || node.addComponent(Mask);
            this._node_mask = node;
            if (node.parent !== this.node) {
                this.node.addChild(node);
            } 
        }

        if (!this._label_mask) {
            const node = this._node_mask.getChildByName(lb_top_uuid) || new Node();
            const uiTrans = node.getComponent(UITransform) || node.addComponent(UITransform);
            node.getComponent(UITransform)!.setAnchorPoint(0, 0.5);
            node.name = lb_top_uuid;
            this._label_mask = node.getComponent(Label) || node.addComponent(Label);
            if (node.parent !== this._node_mask) {
                this._node_mask.addChild(node);
            }
        }
    }

    _updateRenderData() {
        this._checkLabelInit();
        this._label_mask.lineHeight = this._label_mask.fontSize = this.fontSize;
        this._label.lineHeight = this._label.fontSize = this.fontSize;
        this._label.color = this.color;
        this._label_mask.color = this.color_mask;
        this._label_mask.string = this._label.string = this._string;
        this._updateBarStatus();
    }

    _updateBarStatus() {
        // update the label content size
        this._node_mask.getComponent(UITransform)!.setContentSize(
            Math.round(this._label_mask.getComponent(UITransform)!.width * this.progress),
            this._label_mask.getComponent(UITransform)!.height);
    }
}
