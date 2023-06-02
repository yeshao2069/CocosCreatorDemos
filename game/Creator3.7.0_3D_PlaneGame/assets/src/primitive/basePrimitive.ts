import { _decorator, Mesh, MeshRenderer, Component, Color, gfx, UIVertexFormat, utils, primitives } from 'cc';
import  { EDITOR } from 'cc/env';
const { ccclass, executeInEditMode, requireComponent, property } = _decorator;

@ccclass('BasePrimitive')
@executeInEditMode
@requireComponent(MeshRenderer)
export class BasePrimitive extends Component {
    @property(Color)
    _color : Color = new Color().fromHEX('0xffffff');
    @property(Color)
    get color () {
        return this._color;
    }
    set color (value) {
        this._color = value;
        this.delayInit();
    }
    
    _delatIniting : boolean = false;
    
    data = {};
    
    
    onLoad () {
        this.init();
    }

    init () {
        let data = this._createData();
        // @ts-ignore
        let mesh = BasePrimitive.createMyMesh(data, this.color);
        let renderer = this.getComponent(MeshRenderer);
        renderer ? renderer.mesh = mesh : "";
        this.data = data;
        this._delatIniting = false;
    }

    delayInit () {
        if (EDITOR) {
           this.init();
           return;
        }
        if (this._delatIniting) return;
        this._delatIniting = true;
        this.scheduleOnce(this.init);
    }

    _createData () {
        return {};
    }

    static createMyMesh(data : primitives.IGeometry, color : Color)
    {
        let positionNum = data.positions.length / 3;
        let colors = [positionNum * 4];
        let j = 0;
        for (let i = 0; i < positionNum; i++) {
            colors[j++] = color.r;
            colors[j++] = color.g;
            colors[j++] = color.b;
            colors[j++] = color.a;
        }
        
        // data.primitiveMode = gfx.PrimitiveMode.TRIANGLE_LIST;
        data.colors = colors;
        // data.attributes = [
        //             new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F),
        //             new gfx.Attribute(gfx.AttributeName.ATTR_TEX_COORD, gfx.Format.RG32F),
        //             new gfx.Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA8UI, true),
        //         ];
        
        return utils.createMesh(data);

        // let vfmt =new gfx([
        //     { name: gfx.AttributeName.ATTR_POSITION, type: gfx.Type.FLOAT, num: 3 },
        //     { name: gfx.AttributeName.ATTR_NORMAL, type: gfx.Type.FLOAT, num: 3 },
        //     { name: gfx.AttributeName.ATTR_COLOR, type: gfx.Type.UINT, num: 4, normalize: true },
        // ]);
        //

        // let mesh = new Mesh();
        // mesh.init(vfmt, data.positions.length);
        // mesh.setVertices(gfx.ATTR_POSITION, data.positions);
        // mesh.setVertices(gfx.ATTR_NORMAL, data.normals);
        // mesh.setVertices(gfx.ATTR_COLOR, colors);
        // mesh.setIndices(data.indices);
        // mesh.setBoundingBox(data.minPos, data.maxPos);

        // this._mesh = createMesh({
        //     primitiveMode: PrimitiveMode.TRIANGLE_LIST,
        //     positions: [0, 0, 0,
        //         0, 0, 0,
        //         0, 0, 0,
        //         0, 0, 0],
        //     uvs: [0, 0,
        //         1, 0,
        //         0, 1,
        //         1, 1],
        //     colors: [
        //         Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a,
        //         Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a,
        //         Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a,
        //         Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a],
        //     attributes: [
        //         new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F),
        //         new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F),
        //         new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8UI, true),
        //     ],
        //     indices: [0, 1, 2, 1, 2, 3],
        // }, undefined, { calculateBounds: false });

    }
}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const Primitive = cc.Class({
//     extends: cc.Component,
// 
//     editor: {
//         executeInEditMode: true,
//         requireComponent: cc.MeshRenderer
//     },
// 
//     properties: {
//         color: {
//             default: cc.Color.WHITE,
//             notify () {
//                 this.delayInit();
//             }
//         }
//     },
// 
//     // LIFE-CYCLE CALLBACKS:
// 
//     onLoad () {
//         this.init();
//     },
// 
//     init () {
//         let data = this._createData();
//         let mesh = Primitive.createMesh(data, this.color);
// 
//         let renderer = this.getComponent(cc.MeshRenderer);
//         renderer.mesh = mesh;
// 
//         this.data = data;
//         this._delatIniting = false;
//     },
// 
//     delayInit () {
//         if (CC_EDITOR) {
//             this.init();
//             return;
//         }
// 
//         if (this._delatIniting) return;
//         this._delatIniting = true;
//         this.scheduleOnce(this.init);
//     },
// 
//     _createData () {
//         return {};
//     }
// });
// 
// Primitive.createMesh = function (data, color) {
//     let gfx = cc.gfx;
//     let vfmt = new gfx.VertexFormat([
//         { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
//         { name: gfx.ATTR_NORMAL, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
//         { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true },
//     ]);
// 
//     let colors = [];
//     for (let i = 0; i < data.positions.length; i++) {
//         colors.push(color);
//     }
// 
//     let mesh = new cc.Mesh();
//     mesh.init(vfmt, data.positions.length);
//     mesh.setVertices(gfx.ATTR_POSITION, data.positions);
//     mesh.setVertices(gfx.ATTR_NORMAL, data.normals);
//     mesh.setVertices(gfx.ATTR_COLOR, colors);
//     mesh.setIndices(data.indices);
//     mesh.setBoundingBox(data.minPos, data.maxPos);
// 
//     return mesh;
// };
// 
// module.exports = Primitive;
