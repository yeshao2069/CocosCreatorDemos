
import { _decorator, Component, Node, Graphics, find, Color, TERRAIN_DATA_VERSION_DEFAULT, } from 'cc';
const { ccclass, property } = _decorator;

const POINT_COUNT = 360; // 个数
const SHOW_SCALE = 1; // 缩放比
const SHOW_TIME_NORMAL = 0.05; // 每次调整点的坐标

@ccclass('VisualizationAlgorithm')
export class VisualizationAlgorithm extends Component {

    _pointArray : number[]= []; // 点数组
    _graphics : any;

    start () {
        this._graphics = find("Canvas/Graphics")!.getComponent(Graphics)!;
        
        this.init();
    }

    // 初始化
    init () {
        this._graphics.clear();
        let data1 = this.generateMassArray();
        this._pointArray = data1;
        let data2 = this.doDataConversion(data1);;
        this.doOneDraw(data2);
    }

    // 生成乱序数组
    generateMassArray () {
        let arr = [];
        for (let i = 0; i < POINT_COUNT; i++) {
            arr.push(i);
        }
        const res = [];
        while (arr.length) {
            // 打乱
            const randomIndex = Math.random() * arr.length - 1;
            res.push(arr.splice(randomIndex, 1)[0]);
        }
        return res;
    }

    // 数据转化
    doDataConversion (arr: number[]) {
        let ret = [];
        for (let i = 0; i < arr.length; i++) {
            let index = arr[i];
            let xita = i;
            let p = index;

            // 极坐标
            // x = ρ * cosθ，因为x / ρ = cosθ
            // y = ρ * sinθ，因为y / ρ = sinθ
            let r = -Math.PI / 180 * xita;

            // 为了效果明显, 扩大 x,y
            let x = p * Math.cos(r) * SHOW_SCALE;
            let y = p * Math.sin(r) * SHOW_SCALE;
            
            // console.log(`(${index} -> θ = ${xita}°, p = ${p})`);
            // console.log(`(x = ${x}, y = ${y})`);

            let data = {
                x: x,
                y: y,
                xita: xita,
                p: p,
            }
            ret.push(data);
        }
        return ret;
    }

    // 做一次绘制
    doOneDraw (arr: any[]) {
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];
            let x = d.x;
            let y = d.y;
            this.drawPoint(x, y);
        }
    }

    // 绘制点
    drawPoint (x: number, y: number, sc: Color = Color.WHITE, fc: Color = Color.WHITE, pointRadius: number = 2) {
        let g = this._graphics;

        g.circle(x, y, pointRadius);
        g.strokeColor = sc;
        g.fillColor = fc;
        g.stroke();
        g.fill();
    }

    // 排序后绘制
    doSortDraw (total: any[], time = SHOW_TIME_NORMAL) {
        for (let i = 0; i < total.length; i++) {
            let d1 = total[i];

            let ret = this.doDataConversion(d1);
            const that = this;

            this.scheduleOnce(()=>{
                that._graphics.clear();
                that.doOneDraw(ret);
            }, time * i);
        }
    }

    // 希尔排序
    onShellSort (){
        let nums = this._pointArray;
        const that = this;
        function shell (arr: number[]) {
            let len = arr.length;
            let temp, gap = 1;
            let total = [];

            while (gap < len / 5) {
                gap = gap * 5 + 1;
            }

            for (gap; gap > 0; gap = Math.floor(gap / 5)) {
                for (let i = gap; i < len; i++) {
                    temp = arr[i];
                    let j;
                    for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                        arr[j + gap] = arr[j];
                    }
                    arr[j + gap] = temp;

                    let a : number[] = [];
                    for (j = 0; j < arr.length; j++) {
                        a.push(arr[j]);
                    }
                    total.push(a);
                }
            }
            that.doSortDraw(total);
        }

        shell(nums);
    }

    // 基数排序
    // https://www.cnblogs.com/ming1025/p/13896645.html
    onRadixSort (){
        let nums = this._pointArray;
        const that = this;
        function radix (arr: number[]) {
            let bucket = new Array(10);
            for (let i = 0; i < bucket.length; i++) {
                bucket[i] = new Array(arr.length);
            }
    
            let buckeElementCounts = new Array(10).fill(0);
            let max = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i]
                }
            }
        
            let maxLength = (max + '').length;
            let total = [];
            for (let i = 0, n = 1; i < maxLength; i++, n = n * 10) {
                for (let j = 0; j < arr.length; j++) {
                    let digitOfElement = Math.floor(arr[j] / n) % 10;
                    bucket[digitOfElement][buckeElementCounts[digitOfElement]] = arr[j];
                    buckeElementCounts[digitOfElement]++;
                }
                let index = 0;
                for (let k = 0; k < buckeElementCounts.length; k++) {
                    if (buckeElementCounts[k] !== 0) {
                        for (let l = 0; l < buckeElementCounts[k]; l++) {
                            arr[index] = bucket[k][l];
                            index++;
                        }

                        let a : number[] = [];
                        for (let m = 0; m < arr.length; m++) {
                            a.push(arr[m]);
                        }
                        total.push(a);
                        
                        buckeElementCounts[k] = 0;
                    }
                }
            }
            that.doSortDraw(total, 0.1);
        }

        radix(nums);
    }

    // 快速排序
    onQuickSort (){
        let nums = this._pointArray;
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
    
    // 堆排序
    onHeapSort (){
        let arr = this._pointArray;
        
        function heapify(arr: number[], x: number, len: number) {
            var l = 2 * x + 1;
            var r = 2 * x + 2;
            var largest = x, temp;
            if (l < len && arr[l] > arr[largest]) {
                largest = l;
            }
            if (r < len && arr[r] > arr[largest]) {
                largest = r;
            }
            if (largest != x) {
                temp = arr[x];
                arr[x] = arr[largest];
                arr[largest] = temp;
                heapify(arr, largest, len);
            }
        }

        let total = [];
        // 建堆
        var heapSize = arr.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heapify(arr, i, heapSize);
            
            let a : number[] = [];
            for (let j = 0; j < arr.length; j++) {
                a.push(arr[j]);
            }

            total.push(a);
        }
        this.doSortDraw(total);

        // 堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = arr[0];
            arr[0] = arr[j];
            arr[j] = temp;
        
            let a : number[] = [];
            for (let k = 0; k < arr.length; k++) {
                a.push(arr[k]);
            }

            heapify(arr, 0, --heapSize);
            total.push(a);
        }
        this.doSortDraw(total);
    }

    // 插入排序
    onInsertionSort (){
        let arr = this._pointArray;
        
        let len = arr.length;
        let total = [];
        for (var i = 1; i < len; i++) {
            var key = arr[i];
            var j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;

            let a : number[] = [];
            for (let j = 0; j < arr.length; j++) {
                a.push(arr[j]);
            }
            total.push(a);
        }

        this.doSortDraw(total);
    }

    // 选择排序
    onSelectionSort (){
        let arr = this._pointArray;
        
        let len = arr.length;
        let minIndex, temp;
        let total = [];
        for (var i = 0; i < len - 1; i++) {
            minIndex = i;
            for (let j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            let a : number[] = [];
            for (let j = 0; j < arr.length; j++) {
                a.push(arr[j]);
            }
            total.push(a);
        }

        this.doSortDraw(total);
    }

    // 冒泡排序
    onBubbleSort (){
        let arr = this._pointArray;
        
        let len = arr.length;
        let total = [];
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
            let a : number[] = [];
            for (let j = 0; j < arr.length; j++) {
                a.push(arr[j]);
            }
            total.push(a);
        }

        this.doSortDraw(total);
    }

    // 打乱
    onMass () {
        this._graphics.clear();
        let data1 = this.generateMassArray();
        this._pointArray = data1;
        let data2 = this.doDataConversion(data1);;
        this.doOneDraw(data2);
    }
}
