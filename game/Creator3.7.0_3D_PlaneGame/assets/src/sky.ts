import { _decorator, Component, v3, Color, primitives, Node } from 'cc';
import { BasePrimitive } from './primitive/basePrimitive';
const { ccclass, property } = _decorator;

//let v3_tmp = v3();
@ccclass('Sky')
export class Sky extends Component {
    @property
    public cloudCount = 20;
    @property
    public cloudColor:Color = new Color().fromHEX('0xF7D9AA');
    @property
    public rotateSpeed = 360;
    v3_tmp = v3();
    clouds = new Array(this.cloudCount);
    _mesh: any;

    start () {
        this._initMesh();
        let clouds = new Array(this.cloudCount);
        let stepAngle = Math.PI * 2 / this.cloudCount;
        for (let i = 0; i < this.cloudCount; i++) {
           let cloud = this.createCloud() as Node;
           clouds[i] = cloud;
           
           let a = stepAngle * i;
           // @ts-ignore
           let h = window.game.seaHeight + window.game.skyHeight + Math.random() * window.game.skyHeightRange;
            
           cloud.position = v3(Math.cos(a) * h, Math.sin(a) * h, -300 - Math.random() * 500);
           
           this.v3_tmp.x = this.v3_tmp.y = 0;
           this.v3_tmp.z = a + Math.PI / 2;
           cloud.eulerAngles = this.v3_tmp;
           
           let scaleNum = 1 + Math.random() * 2;
           cloud.scale = v3(scaleNum, scaleNum, scaleNum);
           
           cloud.parent = this.node;
        }
        
        this.clouds = clouds;
    }

    _initMesh () {
        let data = primitives.box({width:1, height:1, length:1});
        let mesh = BasePrimitive.createMyMesh(data, this.cloudColor);
        this._mesh = mesh;
    }

    createCloud () {
        let cloud = new Node('cloud');
        let nBlocks = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nBlocks; i++) {
           // @ts-ignore
           let block = window.game.createMeshNode('barrier', this._mesh) as Node;
           block.position = v3(i * 15, Math.random() * 10, Math.random() * 10);
           
           let angle = v3();
           angle.z = Math.random() * Math.PI * 2;
           angle.y = Math.random() * Math.PI * 2;
           block.eulerAngles = angle;
           
           let scaleNum = 20 * (0.3 + Math.random() * 0.7)
           block.scale = v3(scaleNum, scaleNum, scaleNum);
           
           block.parent = cloud;
        }
        return cloud;
    }

    update (dt: any) {
        for (let i = 0; i < this.clouds.length; i++) {
           let cloud = this.clouds[i];
           for (let j = 0; j < cloud.children.length; j++) {
               let block = cloud.children[j] as Node;
               let z = block.eulerAngles.z + Math.random() * 0.5 * (j + 1);
               let y = block.eulerAngles.y + Math.random() * 0.2 * (j + 1);
               
               block.eulerAngles = v3(block.eulerAngles.x, y, z);
           }
        }
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const Primitive = require('./primitive/primitive');
// 
// let v3_tmp = cc.v3();
// 
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         cloudCount: 20,
//         cloudColor: cc.color().fromHEX('0xF7D9AA'),
// 
//         rotateSpeed: 360,
//     },
// 
//     start () {
//         this._initMesh();
// 
//         let clouds = new Array(this.cloudCount);
//         let stepAngle = Math.PI * 2 / this.cloudCount;
//         for (let i = 0; i < this.cloudCount; i++) {
//             let cloud = this.createCloud();
//             clouds[i] = cloud;
// 
//             let a = stepAngle * i;
//             let h = game.seaHeight + game.skyHeight + Math.random() * game.skyHeightRange;
// 
//             cloud.y = Math.sin(a) * h;
//             cloud.x = Math.cos(a) * h;
//             cloud.z = -300 - Math.random() * 500;
// 
//             v3_tmp.x = v3_tmp.y = 0;
//             v3_tmp.z = a + Math.PI / 2;
//             cloud.eulerAngles = v3_tmp;
// 
//             cloud.scale = 1 + Math.random() * 2;
// 
//             cloud.parent = this.node;
//         }
// 
//         this.clouds = clouds;
//     },
// 
//     // for use the same mesh
//     _initMesh () {
//         let data = cc.primitive.box(1, 1, 1);
//         let mesh = Primitive.createMesh(data, this.cloudColor);
//         this._mesh = mesh;
//     },
// 
//     createCloud () {
//         let cloud = new cc.Node('cloud');
//         cloud.is3DNode = true;
// 
//         let nBlocks = 3 + Math.floor(Math.random() * 3);
//         for (let i = 0; i < nBlocks; i++) {
//             let block = window.game.createMeshNode('barrier', this._mesh);
// 
//             block.x = i * 15;
//             block.y = Math.random() * 10;
//             block.z = Math.random() * 10;
// 
//             let angle = cc.v3();
//             angle.z = Math.random() * Math.PI * 2;
//             angle.y = Math.random() * Math.PI * 2;
//             block._eulerAngles = angle;
// 
//             block.scale = 20 * (0.3 + Math.random() * 0.7);
// 
//             block.parent = cloud;
//         }
// 
//         return cloud;
//     },
// 
//     update (dt) {
//         for (let i = 0; i < this.clouds.length; i++) {
//             let cloud = this.clouds[i];
// 
//             for (let j = 0; j < cloud.children.length; j++) {
//                 let block = cloud.children[j];
//                 block._eulerAngles.z += Math.random() * 0.5 * (j + 1);
//                 block._eulerAngles.y += Math.random() * 0.2 * (j + 1);
//                 block.eulerAngles = block._eulerAngles;
//             }
//         }
//     },
// });
