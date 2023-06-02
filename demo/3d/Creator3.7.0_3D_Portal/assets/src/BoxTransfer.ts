
import { _decorator, Component, Node, Collider, director } from 'cc';
import { BoxMove } from './BoxMove';
const { ccclass, property } = _decorator;

@ccclass('BoxTransfer')
export class BoxTransfer extends Component {
    @property(Node)
    target:Node = null;
    start () {
        const c = this.getComponent(Collider);
        c.on('onTriggerEnter',this.onTriggerEnter,this);
        c.on('onTriggerExit',this.onTriggerExit,this);
    }
    private onTriggerEnter(e:{selfCollider: Collider, otherCollider: Collider}){
        // 避免其他的碰撞，其实分组比较好，但是为了导出通用包，就用这种判定了
        // if(BoxTransfer.inTransfer || !e.otherCollider.getComponent(BoxMove)){
        //     return;
        // }
        // BoxTransfer.inTransfer = e.selfCollider;
        // director.emit("BoxTransfer");
        // const offset = e.otherCollider.node.worldPosition.clone().subtract(e.selfCollider.node.worldPosition);
        // e.otherCollider.node.setWorldPosition(offset.add(this.target.worldPosition));

        console.log("aaaaaaa");
        
        this.node.setWorldPosition(this.target.worldPosition);
    }
    private onTriggerExit(e:{selfCollider: Collider, otherCollider: Collider}){
        // 避免其他的碰撞，其实分组比较好，但是为了导出通用包，就用这种判定了
        // if(BoxTransfer.inTransfer == e.selfCollider || !e.otherCollider.getComponent(BoxMove)){
        //     return;
        // }
        
        // BoxTransfer.inTransfer = null;
    }
    private static inTransfer:Collider = null;
}
