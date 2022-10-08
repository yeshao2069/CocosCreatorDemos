import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('UIMeshRender')
export class UIMeshRender extends Component {
    @type(Node)
    player: Node = null;

    private isRotate: boolean = false;

    start() {
        this.isRotate = false;
        this.player.active = false;
    }

    update(deltaTime: number) {
        if (this.isRotate) {
            let eulerAngles: Vec3 = this.player.eulerAngles;
            eulerAngles.y++;
            this.player.eulerAngles = eulerAngles;
        }

    }
    btnShowPlayerEvent(): void {
        this.player.active = true;
    }
    btnHidePlayerEvent(): void {
        this.isRotate = false;
        this.player.active = false;
    }
    btnRotatePlayerEvent(): void {
        this.isRotate = true;
    }
}
