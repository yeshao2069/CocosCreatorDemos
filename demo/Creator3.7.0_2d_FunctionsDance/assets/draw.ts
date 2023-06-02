
import { _decorator, Component, Node, Vec2, Graphics, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Draw')
export class Draw extends Component {

    start () {
        this.createAxis();

        let posArray = this.getDrawPos();
        const g = this.getComponent(Graphics)!;
        g.lineWidth = 4;
        g.strokeColor.fromHEX('#FF0000');

        g.moveTo(posArray[0].x, posArray[0].y);
        for(let i=1; i<posArray.length; i++){
            let pos = posArray[i];
            g.lineTo(pos.x, pos.y);
            g.stroke();
        }
    }

    // 获取数据
    getDrawPos (){
        let minRange = 0;//-250;
        let maxRange = 250;
        let ranges = [];
        let jd = 0;

        let _range = maxRange - minRange;
        let _per = 1/(Math.pow(10,jd));
        let _num = Math.floor(_range / _per);
        let temp = minRange;
        for(let i=0; i<_num; i++){
            temp += _per;
            ranges.push(temp);
        }
        // console.log(ranges);

        let posArray = [];
        // for(let i=0; i<ranges.length; i++){
        //     let r = ranges[i];
        //     // let pos = this.getXY(r);
        //     // let pos = this.getNegativeAbsoluteValue(r);
        //     // let pos = this.getSquare(r);
        //     // let pos = this.getCube(r);
        //     // let pos = this.getPositiveReciprocal(r);
        //     // let pos = this.getNegativeReciprocal(r);
        //     // let pos = this.getLogax(r);
        //     // posArray.push(pos);
        // }

        for (let i = 0; i < 360; i++) {
            let pos = this.getDKE_Heart(52, i);
            posArray.push(pos);
        }

        console.log(posArray);
        return posArray;
    }

    // y = x
    getXY (x: number) {
        let y = x;
        return new Vec2(x, y);
    }

    // y = -|x|
    getNegativeAbsoluteValue (x: number) {
        let y = -Math.abs(x);
        return new Vec2(x, y);
    }

    // y = |x|
    getPositiveAbsoluteValue (x: number) {
        let y = Math.abs(x);
        return new Vec2(x, y);
    }

    // y = x^2
    getSquare (x: number) {
        // let y = Math.pow(x,2);
        let factor = 15; // 调整改函数在坐标轴的显示
        x /= factor;
        let y = Math.pow(x,2);
        x *= factor;
        return new Vec2(x, y);
    }

    // y = x^3
    getCube (x: number) {
        // let y = Math.pow(x,3);
        let factor = 30; // 调整改函数在坐标轴的显示
        x /= factor;
        let y = Math.pow(x,3);
        x *= factor;
        return new Vec2(x, y);
    }

    // y = 1/x
    getPositiveReciprocal (x: number) {
        // let y = 1/x;
        let factor = 5000; // 调整改函数在坐标轴的显示
        x /= factor;
        let y = 1/x;
        x *= factor;
        return new Vec2(x, y);
    }

    // y = 1/x
    getNegativeReciprocal (x: number) {
        // let y = -1/x;
        let factor = 5000; // 调整改函数在坐标轴的显示
        x /= factor;
        let y = -1/x;
        x *= factor;
        return new Vec2(x, y);
    }

    // y = loga(x)
    getLogax (x: number) {
        const factor = 10000; // 调整改函数在坐标轴的显示
        x /= factor;
        const y = Math.log(x);
        x *= factor;
        return new Vec2(x, y);
    }


    /**
     * 笛卡尔心形方程式
     * r = a(1-sinθ）
     * 水平方向： ρ=a(1-cosθ) 或 ρ=a(1+cosθ) (a>0) , 垂直方向： ρ=a(1-sinθ) 或 ρ=a(1+sinθ) (a>0)
     * x=a*(2*cos(t)-cos(2*t)), y=a*(2*sin(t)-sin(2*t))
     * -pi<=t<=pi 或 0<=t<=2*pi
     */
    getDKE_Heart (a: number, p: number) {
        const t = p * 2 * Math.PI / 360;
        const y = a * (2 * Math.cos(t) - Math.cos(2 * t));
        const x = a * (2 * Math.sin(t) - Math.sin(2 * t));
        return new Vec2(x, y);
    }

    // 建立坐标轴
    createAxis (){
        const g = this.getComponent(Graphics)!;

        g.lineWidth = 3;
        g.strokeColor.fromHEX('#FFFFFF');

        // x-axis
        g.moveTo(-250, 0);
        g.lineTo(250,0);
        g.stroke();
        // y-axis
        g.moveTo(0, -250);
        g.lineTo(0, 250);
        g.stroke();
    }
}

