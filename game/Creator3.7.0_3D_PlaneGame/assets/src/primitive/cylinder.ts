import { _decorator, primitives } from 'cc';
import {BasePrimitive} from "./basePrimitive";
const { ccclass, property } = _decorator;

@ccclass('Cylinder')
export class Cylinder extends BasePrimitive {
    @property
    _radiusTop = 30;
    @property
    get radiusTop() {
        return this._radiusTop;
    }
    set radiusTop(value) {
        this._radiusTop = value;
        this.delayInit();
    }

    @property
    _radiusBottom = 30;
    @property
    get radiusBottom() {
        return this._radiusBottom;
    }
    set radiusBottom(value) {
        this._radiusBottom = value;
        this.delayInit();
    }
    
    @property
    _height = 100;
    @property
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.delayInit();
    }

    @property
    _radialSegments = 32;
    @property
    get radialSegments() {
        return this._radialSegments;
    }
    set radialSegments(value) {
        this._radialSegments = value;
        this.delayInit();
    }

    @property
    _heightSegments = 1;
    @property
    get heightSegments() {
        return this._heightSegments;
    }
    set heightSegments(value) {
        this._heightSegments = value;
        this.delayInit();
    }

    _createData () {
        return primitives.cylinder(this.radiusTop, this.radiusBottom, this.height, {
           radialSegments: this.radialSegments,
           heightSegments: this.heightSegments,
           capped: true, 
           arc: 2.0 * Math.PI
        });
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
//         radiusTop: {
//             default: 30,
//             notify () {
//                 this.delayInit();
//             }
//         },
//         radiusBottom: {
//             default: 30,
//             notify () {
//                 this.delayInit();
//             }
//         },
//         height: {
//             default: 100,
//             notify () {
//                 this.delayInit();
//             }
//         },
//         radialSegments: {
//             default: 32,
//             notify () {
//                 this.delayInit();
//             }
//         },
//         heightSegments: {
//             default: 1,
//             notify () {
//                 this.delayInit();
//             }
//         }
//     },
//     _createData () {
//         return cc.primitive.cylinder(this.radiusTop, this.radiusBottom, this.height, {
//             radialSegments: this.radialSegments,
//             heightSegments: this.heightSegments,
//             capped: true, 
//             arc: 2.0 * Math.PI
//         });
//     }
// });
