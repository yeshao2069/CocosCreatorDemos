import { _decorator, Component, Node, Sprite, Vec4, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property([Sprite])
    picArray : Sprite[] = [];

    start() {

        for (let i = 0; i < this.picArray.length; i++) {
            const frame = this.picArray[i].spriteFrame;

            let l = 0;
            let r = 0;
            let b = 1;
            let t = 1;
            l = frame.uv[0];
            t = frame.uv[5];
            r = frame.uv[6];
            b = frame.uv[3];

            let u_uvOffset = new Vec4(l, t, r, b);
            let u_uvRotated = frame.rotated ? 1.0 : 0.0;

            console.log(u_uvOffset, u_uvRotated);

            const material = this.picArray[i].getMaterialInstance(0);
            material.setProperty("u_uvOffset", u_uvOffset);
            material.setProperty("u_uvRotated", u_uvRotated);

            // const pos = this.picArray[i].node.getPosition()
            // material.setProperty('center', new Vec2(pos.x, pos.y))
        }
    }
}

