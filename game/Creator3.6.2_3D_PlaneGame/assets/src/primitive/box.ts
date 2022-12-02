import { _decorator, primitives, utils } from 'cc';
import { BasePrimitive } from './basePrimitive';
const { ccclass, property } = _decorator;

@ccclass('Box')
export class Box extends BasePrimitive {
    @property
    _width = 100;
    @property
    get width () {
        return this._width;
    }
    set width (value) {
        this._width = value;
        this.delayInit();
    }

    @property
    _height = 100;
    @property
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
        this.delayInit();
    }

    @property
    _length = 100;
    @property
    get length () {
        return this._length;
    }
    set length (value) {
        this._length = value;
        this.delayInit();
    }

    _createData () {
        return primitives.box({ width:this.width, height:this.height, length:this.length });
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
//         width: {
//             default: 100,
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
//         length: {
//             default: 100,
//             notify () {
//                 this.delayInit();
//             }
//         }
//     },
//     _createData () {
//         return cc.primitive.box(this.width, this.height, this.length);
//     }
// });
