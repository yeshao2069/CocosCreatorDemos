import { _decorator, Component, find, warn } from 'cc';
import { rolling_lottery } from './rolling_lottery';
const {ccclass, property} = _decorator;

@ccclass('Start')
export default class Start extends Component {
    private _rolling_lottery_os: rolling_lottery[] = [];

    // 节点数量
    childLength: number = 8;

    onLoad() {
        find("Canvas/machine")!.children.forEach((v1_o, k1_n)=> {
            let rlSrc = v1_o.getChildByName('rolling')!.getComponent(rolling_lottery)!
            this._rolling_lottery_os.push(rlSrc);
            this._rolling_lottery_os[k1_n].reset();
        });
    }

    /* ***************按钮事件*************** */
    public btn_mess(): void {
        this._rolling_lottery_os.forEach(v1_o=> {
            v1_o.random_order();
        });
    }

    public btn_random(): void {
        if (this._rolling_lottery_os.filter(v1_o => v1_o.scroll_b).length) {
            warn("动作未结束");
            return;
        }
        
        this._rolling_lottery_os.forEach(v1_o => {
            const v1_o_node = v1_o.node;
            if (v1_o_node) {
                // @ts-ignore
                v1_o_node.children.sort((a, b) => {
                    let index_a = parseInt(a.name.substring(1,1));
                    let index_b = parseInt(b.name.substring(1,1));
                    return index_b - index_a;
                });
            }

            let old_speed_n = v1_o.max_speed_n;
            // 修改速度让其更加真实
            v1_o.max_speed_n += Math.floor(Math.random() * 11) - 5;
            const rand = Math.floor(Math.random() * v1_o.node.children.length);
            console.log("rand =>>>", rand);
            v1_o.scroll(rand, {
                "rebound_finish_cb_f": ()=> {
                    v1_o.max_speed_n = old_speed_n;
                }
            });
        });
    }

    public btn_must(): void {
        if (this._rolling_lottery_os.filter(v1_o => v1_o.scroll_b).length) {
            warn("动作未结束");
            return;
        }
        const rand = Math.floor(Math.random() * (this.childLength - 1));
        this._rolling_lottery_os.forEach(v1_o=> {
            const old_speed_n = v1_o.max_speed_n;
            // 修改速度让其更加真实
            v1_o.max_speed_n += Math.floor(Math.random() * 11) - 5;
            console.log("rand number is =>", rand);
            v1_o.scroll(rand, {
                "rebound_finish_cb_f": ()=> {
                    v1_o.max_speed_n = old_speed_n;
                }
            });
        });
    }

}
