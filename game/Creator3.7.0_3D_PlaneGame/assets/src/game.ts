import { _decorator, Component, Node, Material, Label, ProgressBar, v3, MeshRenderer, UITransform, v2 } from 'cc';
import {EnemyManager} from "./enemy-manager";
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property
    public playerXRange = 100;
    @property
    public playerYRange = 80;
    @property
    public playerDefaultY = 100;
    @property
    public seaHeight = 600;
    @property
    public skyHeight = 150;
    @property
    public skyHeightRange = 200;
    @property(Node)
    world : Node = null!;
    @property
    public speed = 30;
    @property
    public ratioSpeedDistance = 0.05;
    @property(Material)
    public material = null!;
    @property
    public levelDistance = 500;
    @property
    public upgradeRatio = 1.2;
    @property(Label)
    public distanceLabel:Label = null!;
    @property(Label)
    public levelLabel:Label = null!;
    @property(ProgressBar)
    public energyProgress:ProgressBar = null!;
    @property
    public collisionDistance = 15;
    @property
    public energy = 1;
    @property
    public collisionDamage = 0.1;
    @property(Node)
    public player:Node = null!;
    @property(Node)
    public enemyManager:Node = null!;
    angles = v3();
    distance = 0;
    lastLevelDistance = 0;
    level = 1;
    
    onLoad () {
        //@ts-ignore
        window.game = this;
        this.reset();
    }

    reset () {
        this.angles = v3();
        this.distance = 0;
        this.lastLevelDistance = 0;
        this.level = 1;
    }

    createMeshNode (name: any, mesh: any, shadowCast: any) {
        let node = new Node(name);
        // node.is3DNode = true;
        let renderer = node.addComponent(MeshRenderer);
        renderer.setMaterial(this.material, 0);
        renderer.mesh = mesh;
        renderer.shadowCastingMode = shadowCast ? MeshRenderer.ShadowCastingMode.ON : MeshRenderer.ShadowCastingMode.OFF;
        return node;
    }

    update (dt: any) {
        this.angles.z += this.speed * dt;
        this.world ? this.world.eulerAngles = this.angles : '';
        
        this.checkCollision();
        
        let distance = this.speed * dt * this.ratioSpeedDistance;
        this.distance += distance;
        this.lastLevelDistance += distance;
        if (this.lastLevelDistance > this.levelDistance) {
           this.level ++;
           this.lastLevelDistance = this.lastLevelDistance % this.levelDistance;
           this.speed *= this.upgradeRatio;
           this.levelDistance *= this.upgradeRatio;
           this.node.emit('level-upgrade');
        }
        this.updateUI();
    }

    equal (a: number, b: number) {
        return Math.abs(a - b) < 10e-6;
    }

    updateUI () {
        if (this.distanceLabel)
            this.distanceLabel.string = this.distance.toFixed();
        
        if (this.levelLabel)
            this.levelLabel.string = this.level.toFixed();
        
        if (this.energyProgress && !this.equal(this.energyProgress.progress, this.energy)) {
           this.energyProgress.progress -= this.collisionDamage / 20;
        }
    }

    checkCollision ()
    {
        let zeroPos = v3();
        let playerPos = v3();
        let enemyPos = v3();
        let dif = v3();

        if (this.player && this.player.getComponent(UITransform))
        {
            let uiTransfrom = this.player.getComponent(UITransform);
            if (uiTransfrom) 
                playerPos = uiTransfrom.convertToWorldSpaceAR(zeroPos);
        }
            
        if (this.enemyManager && this.enemyManager.getComponent('enemy-manager'))
        {
            let nodeEnemyManager = this.enemyManager.getComponent('enemy-manager') as EnemyManager;
            if (nodeEnemyManager)
            {
                let enemies = nodeEnemyManager.enemies;
                for (let i = 0; i < enemies.length; i++) {
                    let enemy = enemies[i];
                    enemyPos = enemies[i].convertToWorldSpaceAR(zeroPos);
                    dif = playerPos.subtract(enemyPos);
                    let distance = dif.length();
                    if (distance < this.collisionDistance) {
                        this.energy -= this.collisionDamage;
                        this.node.emit('collide-enemy', {dif, enemy, distance});
                        break;
                    }
                }
            }
        }
    }
 
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// function equal (a, b) {
//     return Math.abs(a - b) < 10e-6;
// }
// 
// module.exports = cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         playerXRange: 100,
//         playerYRange: 80,
//         playerDefaultY: 100,
// 
//         seaHeight: 600, 
// 
//         skyHeight: 150,
//         skyHeightRange: 200,
// 
//         world: cc.Node,
//         speed: 30,
//         ratioSpeedDistance: 0.05,
// 
//         material: cc.Material,
//         levelDistance: 500,
//         
//         upgradeRatio: 1.2,
// 
//         distanceLabel: cc.Label,
//         levelLabel: cc.Label,
//         energyProgress: cc.ProgressBar,
// 
//         collisionDistance: 15,
// 
//         energy: 1,
//         collisionDamage: 0.1,
// 
//         player: cc.Node,
//         enemyManager: cc.Node
//     },
//     onLoad () {
//         window.game = this;
//         this.reset();
//     },
//     reset () {
//         this.angles = cc.v3();
//         this.distance = 0;
//         this.lastLevelDistance = 0;
// 
//         this.level = 1;
//     },
// 
//     createMeshNode (name, mesh, shadowCast) {
//         let node = new cc.Node(name);
//         node.is3DNode = true;
//         let renderer = node.addComponent(cc.MeshRenderer);
//         renderer.setMaterial(0, this.material);
//         renderer.mesh = mesh;
//         renderer.shadowCastingMode = shadowCast ? cc.MeshRenderer.ShadowCastingMode.ON : false;
//         return node;
//     },
// 
//     update (dt) {
//         this.angles.z += this.speed * dt;
//         this.world.eulerAngles = this.angles;
// 
//         this.checkCollision();
//         
//         let distance = this.speed * dt * this.ratioSpeedDistance;
//         this.distance += distance;
//         this.lastLevelDistance += distance;
//         
//         if (this.lastLevelDistance > this.levelDistance) {
//             this.level ++;
//             this.lastLevelDistance = this.lastLevelDistance % this.levelDistance;
//             this.speed *= this.upgradeRatio;
//             this.levelDistance *= this.upgradeRatio;
//             this.node.emit('level-upgrade');
//         }
//     
//         this.updateUI();
//     },
// 
//     updateUI () {
//         this.distanceLabel.string = this.distance | 0;
//         this.levelLabel.string = this.level;
//         if (!equal(this.energyProgress.progress, this.energy)) {
//             this.energyProgress.progress -= this.collisionDamage / 20;
//         }
//     },
// 
//     checkCollision: (function () {
//         let zeroPos = cc.v2();
//         let playerPos = cc.v2();
//         let enemyPos = cc.v2();
//         let dif = cc.v2();
//         return function () {
//             playerPos = this.player.convertToWorldSpaceAR(zeroPos, playerPos);
// 
//             let enemies = this.enemyManager.getComponent('enemy-manager').enemies;
//             for (let i = 0; i < enemies.length; i++) {
//                 let enemy = enemies[i];
//                 enemyPos = enemies[i].convertToWorldSpaceAR(zeroPos, enemyPos);
//                 let distance = playerPos.sub(enemyPos, dif).mag();
//                 if (distance < this.collisionDistance) {
//                     this.energy -= this.collisionDamage;
//                     this.node.emit('collide-enemy', {dif, enemy, distance});
//                     break;
//                 }
//             }
//         }
//     })()
// });
