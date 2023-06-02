
import { _decorator, Component, Node, Vec2, Graphics, math, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DKR_HEART')
export class DKR_HEART extends Component {

    @property(Graphics)
    lineGraphics : Graphics = null!;
    @property(Graphics)
    axisGraphics : Graphics = null!;
    @property(Label)
    label : Label = null!;

    start () {
        this.createAxis();

        for (let i = 10; i <= 88; i++) {

            setTimeout(() => {
                let posArray = this.getDrawPos(i);
                const g = this.lineGraphics;
                g.lineWidth = 4;
                g.strokeColor.fromHEX('#FF0000');

                this.label.string = 'r = a(1-sinθ), a = ' + i;

                g.clear();
                g.moveTo(posArray[0].x, posArray[0].y);
                for(let i=1; i<posArray.length; i++){
                    let pos = posArray[i];
                    g.lineTo(pos.x, pos.y);
                    g.stroke();
                }
            }, 1500 * (10 - i))
        }
        
    }

    // 获取数据
    getDrawPos (a: number) {
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

        let posArray = [];

        for (let i = 0; i < 360; i++) {
            let pos = this.getDKE_Heart(a, i);
            posArray.push(pos);
        }

        console.log(posArray);
        return posArray;
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
        const g = this.axisGraphics;

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

