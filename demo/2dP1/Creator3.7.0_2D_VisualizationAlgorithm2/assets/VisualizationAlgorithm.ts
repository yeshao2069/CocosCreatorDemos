
import { _decorator, Component, Node, Graphics, Label } from 'cc';
const { ccclass, property } = _decorator;

// 柱形图的起始位置
const DRAW_POS = [
    [-390, 0], [-450, 0],
    [-320, 0], [-380, 0],
    [-250, 0], [-310, 0],
    [-180, 0], [-240, 0],
    [-110, 0], [-170, 0],
    [-40, 0], [-100, 0],
    [30, 0], [-30, 0],
    [100, 0], [40, 0],
    [170, 0], [110, 0],
    [240, 0], [180, 0],
    [310, 0], [250, 0],
    [380, 0], [320, 0],
    [450, 0], [390, 0]
];

@ccclass('VisualizationAlgorithm')
export class VisualizationAlgorithm extends Component {

    @property(Node)
    graphicsNode !: Node;
    @property(Node)
    labelNode !: Node;

    graphicsArray : Graphics[] = [];
    labelArray: Label[] = [];

    _data = [15, 56, 10, 13, 43, 20, 38, 9, 17, 22, 32, 21, 3];
    _lastData = [15, 56, 10, 13, 43, 20, 38, 9, 17, 22, 32, 21, 3];

    onLoad () {
        for (let i = 1; i < 14; i++) {
            this.graphicsArray.push(this.graphicsNode.getChildByName('g'+i)!.getComponent(Graphics)!);
            this.labelArray.push(this.labelNode.getChildByName('l'+i)!.getComponent(Label)!);
        }
    }

    start () {
        for (let i = 0; i < this.graphicsArray.length; i++) {
            let g = this.graphicsArray[i];
            g.lineWidth = 2;
            g.fillColor.fromHEX('#00FF00');
        }

        this.initData();
    }

    // 初始化
    initData () {
        for (let i = 0; i < this._data.length; i++) {
            let txt = this._data[i];
            this.drawNum(i, txt);
            this.changeLabel(i, txt);
        }
    }

    // 同步柱形图
    drawNum (index: number, num: number) {
        let mpos = DRAW_POS[index * 2 + 0];
        let tpos = DRAW_POS[index * 2 + 1];

        this.graphicsArray[index].moveTo(mpos[0], mpos[1]);
        this.graphicsArray[index].lineTo(tpos[0], tpos[1]);
        this.graphicsArray[index].lineTo(tpos[0], num * 5);
        this.graphicsArray[index].lineTo(mpos[0], num * 5);

        this.graphicsArray[index].fill();
        this.graphicsArray[index].stroke();
    }

    // 同步文本
    changeLabel (index: number, num: number) {
        this.labelArray[index].string = num + '';
    }

    // 绘制清除
    clear (index: number) {
        this.graphicsArray[index].clear();
    }

    // 绘制动画，将 n 到 m 的柱形图拆分为 size 次的动画过渡
    drawAnim (index: number, oldNum: number, newNum: number, timeAdd: number) {
        // 数据差
        let diff = newNum - oldNum;
        // 分成 10次
        let size = 16;
        const per = diff / size;
        // 间隔时间
        let time = 0.02;

        let total: number[] = [];
        for (let i = 0; i < size; i++) {
            total.push(oldNum + i * per);
        }

        for (let i = 0; i < total.length; i++) {
            let data = total[i];
            const that = this;
            this.changeLabel(index, newNum);
            this.scheduleOnce(()=>{
                that.clear(index);
                that.drawNum(index, data);
            }, time * i + timeAdd);
        }
    }

    // 绘制
    doSortDraw (total: number[][]) {
        let timeAdd = 0;
        for (let j = 0; j < total.length; j++) {
            let nums = total[j];
            for (let i = 0; i < nums.length; i++) {
                let newNum = nums[i];
                let oldNum = this._lastData[i];
                timeAdd += 0.01;
                this.drawAnim(i, oldNum, newNum, timeAdd);
                timeAdd += 0.5;
            }
            timeAdd += 1;
        }

        for (let j = 0; j < total.length; j++) {
            let nums = total[j];
            this._lastData = [];
            for (let i = 0; i < nums.length; i++) {
                this._lastData.push(nums[i]);
            }
        }
    }

    // 快速排序
    onQuickSort () {
        let nums = this._data;
        const that = this;
        let total: any[] = [];
        function quick(arr: any[], left: number, right: number) {
            if (left < right) {
                let x = arr[right];
                let i = left - 1;
                let temp;
                for (let j = left; j <= right; j++) {
                    if (arr[j] <= x) {
                        i++;
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }

                let a : number[] = [];
                for (let j = 0; j < arr.length; j++) {
                    a.push(arr[j]);
                }
                total.push(a);

                quick(nums, left, i - 1);
                quick(nums, i + 1, right);
            } else {
                that.doSortDraw(total);
            }
        }

        quick(nums, 0, nums.length - 1);
    }
}
