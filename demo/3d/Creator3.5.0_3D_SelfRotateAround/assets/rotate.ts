// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rotate')
export class Rotate extends Component {

    @property({ type: Node, tooltip: '旋转的目标' })
    world3D!: Node;

    @property({ type: Number, tooltip: '旋转的起始角度值，默认0' })
    rotateAngle = 0; // 旋转角度值

    @property({ type: Boolean, tooltip: '是否顺时针' })
    isPositive = false; // 是否顺时针

    start () {}

    update(dt: number) {

        if (this.world3D) {
            this.world3D.setRotationFromEuler(0, this.rotateAngle, 0);
        }

        if (this.isPositive) {
            this.rotateAngle ++;
        } else {
            this.rotateAngle --;
        }
        
        // 避免数值过大
        if (this.rotateAngle <= -360) {
            this.rotateAngle += 360;
        }
        if (this.rotateAngle >= 360) {
            this.rotateAngle -= 360;
        }
    }
}
