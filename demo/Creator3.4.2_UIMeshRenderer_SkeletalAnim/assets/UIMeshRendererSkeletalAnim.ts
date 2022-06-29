import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('UIMeshRendererSkeletalAnim')
export class UIMeshRendererSkeletalAnim extends Component {
    @type(Node)
    player !: Node;

    private isRotate: boolean = false;

    start() {
        this.isRotate = false;
        this.player.active = false;
    }

    update(dt: number) {
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
