
import { _decorator, Component, UITransform } from 'cc';
import { KTVLabel } from "./KTVLabel";
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(KTVLabel)
    ktvLabel !: KTVLabel;

    private _lrc = ['木限东, 木限东', '大道至简，殊途同归', '欢迎关注，感谢支持'];
    private _speed = 0.1;
    private _index = 0;
    private _cur_lb_pos = 0;
    private _isCenter = false; // 是否居中显示

    onLoad() {
        this.ktvLabel.string = this._lrc[this._index];
        this.updatePosition();
    }

    update(dt: number) {
        let cur = this._lrc[this._index];
        this._cur_lb_pos = this._cur_lb_pos + this._speed;
        let cur_length = cur.length;
        this.ktvLabel.progress = (this._cur_lb_pos / cur_length);
        if (this._cur_lb_pos >= cur_length) {
            this._index = ((this._index + 1) % this._lrc.length);
            this._cur_lb_pos = 0;
            this.ktvLabel.string = this._lrc[this._index];
            this.ktvLabel.progress = 0;
            this.updatePosition();
        }
    }

    updatePosition() {
        if (this._isCenter) {
            this.scheduleOnce(()=>{
                let posX = this.ktvLabel.getTextWidth();
                this.ktvLabel.node.setPosition(-posX/2, 0, 0);
            }, 0.02);
        } else {
            this.ktvLabel.node.setPosition(-400, 0, 0);
        }
    }
}

