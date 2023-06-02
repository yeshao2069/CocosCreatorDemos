
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollOptionCell')
/**
 * 滚动列表菜单
 * @Author: Assassin
 * @Date: 2019-12-17 17:48:12
 */
/**
 * 使用ScrollOption时必须要实现的cell的interface
 */
 export abstract class ScrollOptionCell extends Component {
	/**
	 * cell节点索引
	 */
    public dataIndex: number = -1;
	/**
	 * 引用类
	 */
    public script: any = null;
    /**
     * cell当前是否已激活
     */
    public actived: boolean = false;
    public showed: boolean = false;
	/**
	 * 使用这个函数来更新当前的 Cell 内容，在这个函数被调用时，dataIndex 会指向正确的索引值，所以实现者，可以使用这个索引获得需要更新的数据
	 * 
	 * @param data 用来更新这个 Cell 的数据，由使用者的 GetCellData 回调函数提供，如果没有提供这个回调函数，data 就是 null
	 * 
	 * 需要注意的是，如果在 UpdateContent 中使用了异步函数获得结果来更新这个 Cell 时
	 * 很有可能返回时，当前的 Cell 已经不再用来显示之前的数据了，所以这时需要在函数中
	 * 使用一个本地变量记录当前的 dataIndex 并在回调函数返回时比较这两个值是否一致
	 */
    abstract updateContent(data: any): void;
	/**
	 * 节点进入aabb包围盒范围而被启用时要进行的操作，如高亮显示，开启按钮等
	 * @param data 所有cell数据
	 */
    abstract enableCell(data?: any): void;
	/**
	 * 节点被禁用时要进行的操作
	 * @param data 所有cell数据
	 */
    abstract disableCell(data?: any): void;
}