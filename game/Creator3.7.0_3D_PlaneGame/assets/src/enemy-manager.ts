import { _decorator, Component, Color, Primitive, primitives, Mesh, Node, v3 } from 'cc';
import {BasePrimitive} from "./primitive/basePrimitive";
// import {Primitive} from "./primitive/primitive";
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property
    public enemyCount = 10;
    @property
    public enemyColor:Color = new Color().fromHEX('0xf25346');
    @property
    public rotateSpeed = 360;
    enemies : Array<any>  = [];
    enemyPool : Array<any> = [];
    _mesh : Mesh = null!;

    _initMesh () {
        let data = primitives.box({ width:8, height:8, length:8 });
        let mesh = BasePrimitive.createMyMesh(data, this.enemyColor);
        this._mesh = mesh;
    }

    start () {
        this._initMesh();
        this.enemies = [];
        let enemyPool = this.enemyPool;
        for (let i = 0; i < this.enemyCount; i++) {
           let node = this.createEnemy() as Node;
            enemyPool.push(node);
        }
        this.spawnEnemy();
        //@ts-ignore
        window.game.node.on('level-upgrade', this.spawnEnemy, this);
        //@ts-ignore
        window.game.node.on('collide-enemy', this.onCollider, this);
    }

    createEnemy () {
        //@ts-ignore
        return window.game.createMeshNode('enemy', this._mesh, true) as Node;
    }

    spawnEnemy () {
        //@ts-ignore
        let nEnemies = window.game.level;
        let pool = this.enemyPool;
        let enemies = this.enemies;
        for (let i = 0; i < nEnemies; i++) {
           let enemy = pool.pop() as Node;
           if (!enemy) {
               enemy = this.createEnemy() as Node;
           }
           //@ts-ignore
           let angle = -window.game.angles.z - (i*0.1);
            //@ts-ignore
           let distance = window.game.seaHeight + window.game.playerDefaultY + (-1 + Math.random() * 2) * (window.game.playerYRange-20);
           enemy.position = v3(Math.cos(angle) * distance, Math.sin(angle) * distance, enemy.position.z);
           
           enemy.parent = this.node;
           
           enemies.push(enemy);
        }
    }

    onCollider ({enemy}: any) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.enemyPool.push(enemy);
        enemy.parent = null;
    }

    update (dt: any) {
        let enemies = this.enemies;
        for (let i = 0; i < enemies.length; i++) {
           let enemy = enemies[i] as Node;
           
           enemy.eulerAngles = v3(Math.random(), Math.random(), enemy.eulerAngles.z);
        }
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const Primitive = require('./primitive/primitive');
// 
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         enemyCount: 10,
//         enemyColor: cc.color().fromHEX('0xf25346'),
//         rotateSpeed: 360,
//     },
// 
//     _initMesh () {
//         let data = cc.primitive.polyhedron ? cc.primitive.polyhedron(4, 8) : cc.primitive.box(8, 8, 8);
//         let mesh = Primitive.createMesh(data, this.enemyColor);
//         this._mesh = mesh;
//     },
// 
//     start () {
//         this._initMesh();
// 
//         this.enemies = [];
//         let enemyPool = this.enemyPool = [];
//         for (let i = 0; i < this.enemyCount; i++) {
//             let node = this.createEnemy();
//             enemyPool.push(node);
//         }
// 
//         this.spawnEnemy();
// 
//         window.game.node.on('level-upgrade', this.spawnEnemy, this);
//         window.game.node.on('collide-enemy', this.onCollider, this);
//     },
// 
//     createEnemy () {
//         return window.game.createMeshNode('enemy', this._mesh, true);
//     },
// 
//     spawnEnemy () {
//         let nEnemies = window.game.level;
//         let pool = this.enemyPool;
//         let enemies = this.enemies;
//         for (let i = 0; i < nEnemies; i++) {
//             let enemy = pool.pop();
//             if (!enemy) {
//                 enemy = this.createEnemy();
//             }
//             let angle = -window.game.angles.z - (i*0.1);
//             let distance = game.seaHeight + game.playerDefaultY + (-1 + Math.random() * 2) * (game.playerYRange-20);
//             enemy.x = Math.cos(angle) * distance;
//             enemy.y = Math.sin(angle) * distance;
// 
//             enemy.parent = this.node;
//             enemies.push(enemy);
//         }
//     },
// 
//     onCollider ({enemy}) {
//         this.enemies.splice(this.enemies.indexOf(enemy), 1);
//         this.enemyPool.push(enemy);
//         enemy.parent = null;
//     },
// 
//     update (dt) {
//         let enemies = this.enemies;
//         for (let i = 0; i < enemies.length; i++) {
//             let enemy = enemies[i];
//             enemy._eulerAngles.x += Math.random() ;
//             enemy._eulerAngles.y += Math.random() ;
//             enemy.eulerAngles = enemy._eulerAngles;
//         }
//     }
// });
