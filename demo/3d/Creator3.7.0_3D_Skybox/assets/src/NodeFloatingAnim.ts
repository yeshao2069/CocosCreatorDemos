import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodeFloatingAnim')
export class NodeFloatingAnim extends Component {
    private _angles:Vec3 = new Vec3(0,0,0);
    private _pos:Vec3 = new Vec3(0,0,0);
    private _lifeTime = Math.random();

    @property
    rotateSpeed:number = 10;

    @property
    updownSpeed:number = 1;

    start () {
        this._angles = this.node.eulerAngles.clone();
        this.node.getPosition(this._pos);
    }

    update (deltaTime: number) {
         if(this.rotateSpeed){
            this._angles.y += deltaTime * this.rotateSpeed;
            this.node.eulerAngles = this._angles;
         }

         if(this.updownSpeed){
            this._lifeTime += deltaTime;
         
            this.node.getPosition(this._pos);
            this._pos.y = Math.sin(this._lifeTime * this.updownSpeed);
            this.node.setPosition(this._pos);
         }
    }
}
