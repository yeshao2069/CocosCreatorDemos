
import { _decorator, Sprite, Component } from 'cc';
import { MTTex } from './MTTex';
const { ccclass, property } = _decorator;
 
@ccclass('MTSprite')
export class MTSprite extends Component {

    start () {
        this.tagAsMTSprite();
    }

    tagAsMTSprite() {
        const sp = this.getComponent(Sprite);
        if (null == sp) {
            return;
        }
        const mtTex = MTTex.getInstance();
        if (null == mtTex) {
            return;
        }
        sp._isMTSprite = true;
        sp.customMaterial = mtTex.mtMat;
    }

}

