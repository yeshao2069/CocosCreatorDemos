import { _decorator, primitives } from 'cc';
import {BasePrimitive} from "./basePrimitive";
const { ccclass, property } = _decorator;

@ccclass('Sphere')
export class Sphere extends BasePrimitive {
    @property
    _radius = 25;
    @property
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        this.delayInit();
    }

    @property
    _segments = 32;
    @property
    get segments() {
        return this._segments;
    }
    set segments(value) {
        this._segments = value;
        this.delayInit();
    }

    _createData () {
        return primitives.sphere(this.radius, { segments: this.segments });
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const Primitive = require('./primitive');
// 
// cc.Class({
//     extends: Primitive,
// 
//     properties: {
//         radius: {
//             default: 25,
//             notify () {
//                 this.delayInit();
//             }
//         },
// 
//         segments: {
//             default: 32,
//             notify () {
//                 this.delayInit();
//             }
//         }
//     },
// 
//     _createData () {
//         return cc.primitive.sphere(this.radius, { segments: this.segments });
//     }
// });
