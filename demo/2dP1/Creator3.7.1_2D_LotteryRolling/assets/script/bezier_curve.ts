
import { _decorator, Vec2, error } from 'cc';

export class bezier_curve {

    public control_point_os: Vec2[];

    constructor(point_os_?: Vec2[]) {
        this.control_point_os = point_os_!;
    }

    private _factorial(v_n_: number) : number {
        if (v_n_ <= 1) {
            return 1;
        } else {
            return v_n_ * this._factorial(v_n_ - 1);
        }
    }

    public point(pos_n_: number): Vec2 {
        if (!this.control_point_os) {
            error("不存在控制点");
            return null!;
        }
        if (this.control_point_os.length < 2) {
            error("控制点不能少于2");
            return null!;
        }
        if (pos_n_ < 0 || pos_n_ > 1) {
            pos_n_ = pos_n_ < 0 ? 0 : 1;
        }
        if (pos_n_ === 0) {
            return this.control_point_os[0];
        } else if (pos_n_ === 1) {
            return this.control_point_os[this.control_point_os.length - 1];
        }
        let result_o = new Vec2();
        let index1_n = this.control_point_os.length - 1;
        this.control_point_os.forEach((v1_o, k1_s)=> {
            if(!k1_s) {
                result_o.x += v1_o.x * Math.pow((1 - pos_n_), index1_n - k1_s) * Math.pow(pos_n_, k1_s);
                result_o.y += v1_o.y * Math.pow((1 - pos_n_), index1_n - k1_s) * Math.pow(pos_n_, k1_s);
            } else {
                result_o.x += this._factorial(index1_n) / this._factorial(k1_s) / this._factorial(index1_n - k1_s) * v1_o.x * Math.pow(( 1 - pos_n_ ), index1_n - k1_s) * Math.pow(pos_n_, k1_s) 
                result_o.y += this._factorial(index1_n) / this._factorial(k1_s) / this._factorial(index1_n - k1_s) * v1_o.y * Math.pow(( 1 - pos_n_ ), index1_n - k1_s) * Math.pow(pos_n_, k1_s) 
            }
        });
        return result_o;
    }
}