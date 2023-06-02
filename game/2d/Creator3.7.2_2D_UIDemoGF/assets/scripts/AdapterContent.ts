
import { _decorator, Component, Node, ScrollView, UITransform, Vec3 } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('AdapterContent')
export class AdapterContent extends Component {
    @type(Node)
    scroll: Node = null!;

    start () {
        this.sizeChanged();
        this.scroll.on(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
    }

    sizeChanged(){
        const contentSize = this.scroll.getComponent(UITransform)!.contentSize;
        const pos = this.node.position;
        this.node.setPosition(new Vec3(pos.x, contentSize.height / 2));
    }
    
}