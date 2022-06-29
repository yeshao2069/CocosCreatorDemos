
import { _decorator, Component, Prefab, warn, instantiate } from 'cc';
import { CircularItem } from './CircularItem';
const { ccclass, property } = _decorator;

const MIN_INTERVAL = 0;
const MAX_INTERVAL = 0.7;

@ccclass('CircularMenu')
export class CircularMenu extends Component {

    @property(Prefab)
    prefab !: Prefab;
    items: CircularItem[] = [];
    
    private _radius: number = 200;
    private _interval: number = 0.6;
    private _maxItemCount !: number;
    private currentMinIndex !: number;
    private currentMaxIndex !: number;
    private currentInfo: any;
    private total = 10;
    private config: any = [];

    public get radius() { return this._radius; }
    public get interval() { return this._interval; }
    public get maxItemCount() { return this._maxItemCount; }

    onLoad() {
        // 初始化 模拟数据
        for (let i = 0; i < this.total; i++) {
            this.config.push({ name: i });
        }
        // 限制间隔在允许范围内
        this._interval = Math.max(this._interval, MIN_INTERVAL);
        this._interval = Math.min(this._interval, MAX_INTERVAL);
        // 限制预制体最大可创建数量
        this._maxItemCount = this.config.length > 10 ? 10 : this.config.length;
        for (let i = 0; i < this.maxItemCount; i++) {
            const info = this.config[i];
            var item = this.getItem();
            item.node.name = `${i}`;
            item.show(i, info, this);
            this.items.push(item);
        }
        this.currentMinIndex = 0;
        this.currentMaxIndex = this.maxItemCount - 1;
        // 模拟一次点击
        var index = 1;
        this.items[index].onClick();
    }

    onClick(target: any) {
        if (this.currentInfo === target.info) {
            warn("不能重复点击");
            return;
        }
        this.currentInfo = target.info;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.follow(target);
        }
    }

    onCenter(info: any) {
        // cc.log("刷新", info)
    }

    getItem(): CircularItem {
        var obj = instantiate(this.prefab);
        this.node.addChild(obj);
        var item = obj.getComponent(CircularItem)!;
        return item;
    }

    addIndexs(item: any) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].addIndex(item);
        }
        this.currentMinIndex--;
        this.currentMaxIndex--;
        if (this.currentMinIndex < 0) {
            this.currentMinIndex = this.config.length - 1;
        }
        if (this.currentMaxIndex < 0) {
            this.currentMaxIndex = this.config.length - 1;
        }
        item.refreshItem(this.config[this.currentMinIndex]);
    }

    remIndexs(item: any) {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].remIndex(item);
        }
        this.currentMaxIndex++;
        this.currentMinIndex++;
        if (this.currentMaxIndex >= this.config.length) {
            this.currentMaxIndex = 0;
        }
        if (this.currentMinIndex >= this.config.length) {
            this.currentMinIndex = 0;
        }
        item.refreshItem(this.config[this.currentMaxIndex]);
    }
}
