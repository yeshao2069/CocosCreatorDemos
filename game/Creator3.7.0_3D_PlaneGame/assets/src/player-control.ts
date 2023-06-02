import { _decorator, Component, Camera, v3, v2, find, Node,view, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number){
    let nv = Math.max(Math.min(v,vmax), vmin);
    let dv = vmax-vmin;
    let pc = (nv-vmin)/dv;
    let dt = tmax-tmin;
    let tv = tmin + (pc*dt);
    return tv;
}
@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property
    public moveSensivity = 5;
    @property
    public rotXSensivity = 0.8;
    @property
    public rotZSensivity = 0.4;
    @property
    public camera:Camera | null = null;
    @property
    public cameraSensivity = 2;
    
    angles = v3();
    touchPos = v2();
    planeCollisionDisplacementX = 0;
    planeCollisionSpeedX = 0;
    planeCollisionDisplacementY = 0;
    planeCollisionSpeedY = 0;

    onLoad () {
        this.reset();
    }

    reset () {
        this.angles = v3(0, 0, 0);
        // @ts-ignore
        this.node.position = v3(0, window.game.playerDefaultY, 0);
        this.touchPos = v2();
        this.planeCollisionDisplacementX = 0;
        this.planeCollisionSpeedX = 0;
        this.planeCollisionDisplacementY = 0;
        this.planeCollisionSpeedY = 0;
    }

    start () {
        let canvas = find('Canvas');
        if (canvas)
        {
            canvas.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            canvas.on(Node.EventType.MOUSE_MOVE, this.onMoseMove, this);
        }

        // @ts-ignore
        window.game.node.on('collide-enemy', this.onCollider, this);
    }

    onTouchMove (event: any) {
        let touches = event.getTouches();
        this._setTouchPos( touches[0].getLocation() );
    }

    onMoseMove (event: any) {
        this._setTouchPos (event.getLocation() );
    }

    onCollider ({dif, distance}: any) {
        this.planeCollisionSpeedX = 150 * dif.x / distance;
        this.planeCollisionSpeedY = 150 * dif.y / distance;
    }

    _setTouchPos (pos: any) {
        this.touchPos.x = -1 + pos.x / view.getVisibleSize().width * 2;
        this.touchPos.y = -1 + pos.y / view.getVisibleSize().height * 2;
    }

    update (dt: any) {
        let touchPos = this.touchPos;
        // @ts-ignore
        let game = window.game;
        let targetY = normalize(touchPos.y, -.75,.75, game.playerDefaultY-game.playerYRange, game.playerDefaultY+game.playerYRange);
        let targetX = normalize(touchPos.x, -1,1, -game.playerXRange*0.7, -game.playerXRange);
        this.planeCollisionDisplacementX += this.planeCollisionSpeedX;
        targetX += this.planeCollisionDisplacementX;
        this.planeCollisionDisplacementY += this.planeCollisionSpeedY;
        targetY += this.planeCollisionDisplacementY;
        this.node.position = new Vec3(this.node.position.x + (targetX - this.node.position.x) * dt * this.moveSensivity,
            this.node.position.y + (targetY - this.node.position.y) * dt * this.moveSensivity, 
            this.node.position.z);
        this.angles.z = (targetY - this.node.position.y) * dt * this.rotZSensivity;
        this.angles.x = (this.node.position.y - targetY) * dt * this.rotXSensivity;
        this.node.eulerAngles = this.angles;
        this.planeCollisionSpeedX += (0-this.planeCollisionSpeedX)*dt * 30;
        this.planeCollisionDisplacementX += (0-this.planeCollisionDisplacementX)*dt *10;
        this.planeCollisionSpeedY += (0-this.planeCollisionSpeedY)*dt * 30;
        this.planeCollisionDisplacementY += (0-this.planeCollisionDisplacementY)*dt *10;
        let camera = this.camera;
        if (camera)
        {
            camera.fov = normalize(touchPos.x, -1,1, 40,80);
            camera.node.position = new Vec3(camera.node.position.x,
                camera.node.position.y + (this.node.position.y - camera.node.position.y) * dt * this.cameraSensivity,
                camera.node.position.z);
        }
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// function normalize(v,vmin,vmax,tmin, tmax){
//     let nv = Math.max(Math.min(v,vmax), vmin);
//     let dv = vmax-vmin;
//     let pc = (nv-vmin)/dv;
//     let dt = tmax-tmin;
//     let tv = tmin + (pc*dt);
//     return tv;
// }
// 
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         moveSensivity: 5,
//         rotXSensivity: 0.8,
//         rotZSensivity: 0.4,
// 
//         camera: cc.Camera,
//         cameraSensivity: 2, 
//     },
//     
//     onLoad () {
//         this.reset();
//     },
//     reset () {
//         this.angles = cc.v3();
//         this.node.position = cc.v3(0, game.playerDefaultY, 0);
//         this.touchPos = cc.v2();
// 
//         this.planeCollisionDisplacementX = 0;
//         this.planeCollisionSpeedX = 0;
//         this.planeCollisionDisplacementY = 0;
//         this.planeCollisionSpeedY = 0;
//     },
// 
//     start () {
//         let canvas = cc.find('Canvas');
//         canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
//         canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onMoseMove, this);
// 
//         window.game.node.on('collide-enemy', this.onCollider, this);
//     },
// 
//     onTouchMove (event) {
//         let touches = event.getTouches();
//         this._setTouchPos( touches[0].getLocation() );
//     },
// 
//     onMoseMove (event) {
//         this._setTouchPos (event.getLocation() );
//     },
// 
//     onCollider ({dif, distance}) {
//         this.planeCollisionSpeedX = 150 * dif.x / distance;
//         this.planeCollisionSpeedY = 150 * dif.y / distance;
//     },
// 
//     _setTouchPos (pos) {
//         // the value range is -1 - 1
//         this.touchPos.x = -1 + pos.x / cc.visibleRect.width * 2;
//         this.touchPos.y = -1 + pos.y / cc.visibleRect.height * 2;
//     },
// 
//     update (dt) {
//         let touchPos = this.touchPos;
// 
//         let targetY = normalize(touchPos.y, -.75,.75, game.playerDefaultY-game.playerYRange, game.playerDefaultY+game.playerYRange);
//         let targetX = normalize(touchPos.x, -1,1, -game.playerXRange*0.7, -game.playerXRange);
// 
//         this.planeCollisionDisplacementX += this.planeCollisionSpeedX;
//         targetX += this.planeCollisionDisplacementX;
// 
//         this.planeCollisionDisplacementY += this.planeCollisionSpeedY;
//         targetY += this.planeCollisionDisplacementY;
//         
//         this.node.y += (targetY - this.node.y) * dt * this.moveSensivity;
//         this.node.x += (targetX - this.node.x) * dt * this.moveSensivity;
// 
//         this.angles.z = (targetY - this.node.y) * dt * this.rotZSensivity;
//         this.angles.x = (this.node.y - targetY) * dt * this.rotXSensivity;
//         this.node.eulerAngles = this.angles;
// 
//         this.planeCollisionSpeedX += (0-this.planeCollisionSpeedX)*dt * 30;
//         this.planeCollisionDisplacementX += (0-this.planeCollisionDisplacementX)*dt *10;
//         this.planeCollisionSpeedY += (0-this.planeCollisionSpeedY)*dt * 30;
//         this.planeCollisionDisplacementY += (0-this.planeCollisionDisplacementY)*dt *10;
// 
//         let camera = this.camera;
//         camera.fov = normalize(touchPos.x, -1,1, 40,80);
//         camera.node.y += (this.node.y - camera.node.y) * dt * this.cameraSensivity;
//     },
// });
