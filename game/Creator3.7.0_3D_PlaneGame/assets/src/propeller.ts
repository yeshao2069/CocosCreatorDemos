import { _decorator, Component, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Propeller')
export class Propeller extends Component {
    @property
    public rotateSpeed = 360;
    angles = v3();
    
    start () {
        this.angles = v3();
    }

    update (dt: any) {
        this.angles.x += this.rotateSpeed * dt;
        this.node.eulerAngles = this.angles;
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         rotateSpeed: 360
//     },
// 
//     // LIFE-CYCLE CALLBACKS:
// 
//     // onLoad () {},
// 
//     start () {
//         this.angles = cc.v3();
//     },
// 
//     update (dt) {
//         this.angles.x += this.rotateSpeed * dt;
//         this.node.eulerAngles = this.angles;
//     },
// });
