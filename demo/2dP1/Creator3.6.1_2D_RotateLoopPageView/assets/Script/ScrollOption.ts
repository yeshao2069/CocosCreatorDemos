import { _decorator, Component, Node, Vec2, NodePool, ScrollView, Rect, Mask, Layout, SystemEventType, systemEvent, SystemEvent, Vec3, log, UITransform, Size } from 'cc';
import { ScrollOptionCell } from './ScrollOptionCell';
const { ccclass, property, disallowMultiple, menu, requireComponent } = _decorator;

/**
 * 列表滚动方向枚举
 */
export enum SrcollOptionDirect {
    // 垂直滚动
    VERTICAL = 1,
    // 水平滚动
    HORIZONTAL = 2,
}

/**
 * cell节点平移方向
 */
export enum CellTranslationDirect {
    // 垂直滚动向左平移；水平滚动向下平移
    LEFT_OR_BOTTOM = 1,
    // 垂直滚动向右平移；水平滚动向上平移
    RIGHT_OR_TOP = 2,
}

/**
 * 滚动列表菜单初始定位位置，暂无用
 */
export enum DefaultLocation {
    // 初始滚动至列表开头
    START = 1,
    // 初始滚动至列表中间
    MIDDLE = 2,
    // 初始滚动至列表末尾
    END = 3,
}

/**
 * cell节点上下边界的距离
 */
interface GetSpacing {
    (): number;
}

/**
 * 通过数据的下标返回这个 Cell 的尺寸（垂直 List 为高度，水平 List 为宽度）
 */
interface GetCellSize {
    /**
	 * 通过数据的下标返回这个 Cell 的尺寸（垂直 List 为高度，水平 List 为宽度）
	 * @param dataIndex 当前 Cell 所渲染的数据在列表中的下标
	 */
    (dataIndex?: number): Array<number>;
}

/**
 * 返回这个 List 中数据的总数量
 */
interface GetCellNumber {
    (): number;
}

/**
 * 获取一个 Cell 的 View 实例，记住这个控件必须已经挂在一个存在的 Node 上
 */
interface GetCellView {
    /**
	 * 获取一个 Cell 的 View 实例，记住这个控件必须已经挂在一个存在的 Node 上
	 * @param dataIndex 当前 Cell 所渲染的数据在列表中的下标
	 * @param identifier 这个 Cell 的表现类型标志
	 * @param script 引用类
	 * 
	 * 这个回调函数只会出现在已经没有可以重用的 Cell 时，List 才会向这个函数请求新的 Cell 实例
	 * 所有已经请求的 Cell 实例都会被重复利用。
	 */
    (dataIndex?: number, script?: any): ScrollOptionCell;
}

/**
 * 根据一个 Cell 的下标获取一个 Cell 的数据，这个数据会作为 Cell 的 UpdateContent 的参数
 */
interface GetCellData {
    /**
	 * 根据一个 Cell 的下标获取一个 Cell 的数据，这个数据会作为 Cell 的 UpdateContent 的参数
	 * 这个回调是可选的，可以不提供，如果不提供的话，Cell 需要自己在 UpdateContent 中向其他模块获取更新自己内容的数据
	 * @param dataIndex 当前 Cell 所渲染的数据在列表中的下标
	 */
    (dataIndex?: number): any;
}

/**
 * cell缩放系数
 */
interface GetCellScale {
    (): number;
}

/**
 * 获取滚动列表滚动方向
 */
interface GetDirection {
    (): number;
}

/**
 * cell偏移方向及偏移系数
 */
interface GetTranslation {
    (): Array<number>;
}


/**
 * 列表初始定位
 */
interface GetDefaultLoaction {
    (): number;
}

/**
 * 初始化列表
 */
interface InitParam {
    getSpacing: GetSpacing,
    getCellSize: GetCellSize,
    getCellNumber: GetCellNumber,
    getCellView: GetCellView,
    getCellData: GetCellData,
    getCellScale: GetCellScale,
    getTranslation?: GetTranslation,
    getDirection?: GetDirection,
    getDefaultLoaction?: GetDefaultLoaction,
    script?: any,
}

@ccclass('ScrollOption')
@disallowMultiple()
@requireComponent(ScrollView)
@menu("自定义组件/ScrollOption")
export default class ScrollOption extends Component {
    onLoad() {
        // 添加遮盖
        if (!this.node.getComponent(Mask))
            this.node.addComponent(Mask);

        // 滚动列表组件
        this._scrollView = this.node.getComponent(ScrollView)!;
        if (!this._scrollView) {
            this._scrollView = this.node.addComponent(ScrollView);
            this._scrollView.horizontal = false;
            this._scrollView.vertical = true;
            this._scrollView.inertia = false;
            this._scrollView.elastic = true;
            this._scrollView.bounceDuration = 0.2;
            this._scrollView.cancelInnerEvents = true;
        }
        // 一个菜单仅允许向一个方向滚动，如果两个方向都启用或都未启用，优先启用垂直方向滚动
        if ((this._scrollView.vertical && this._scrollView.horizontal)
        || !this._scrollView.vertical && !this._scrollView.horizontal) {
            this._scrollView.horizontal = false;
            this._scrollView.vertical = true;
        }

        // 未设置默认content容器时new一个
        if (!this._scrollView.content) {
            const content: Node = new Node();
            content.addComponent(UITransform);
            this.node.addChild(content);
            this._scrollView.content = content;
        }
        // 容器锚点必须设置为中心点
        let uiTransScrollview = this._scrollView.content.getComponent(UITransform)!;
        uiTransScrollview.anchorX = 0.5;
        uiTransScrollview.anchorY = 0.5;
        let contentSize = this.node.getComponent(UITransform)!.contentSize;
        uiTransScrollview.setContentSize(contentSize.width, contentSize.height);

        // 配置content容器Layout组件
        let layout: Layout = this._scrollView.content.getComponent(Layout)!;
        if (!layout)
            layout = this._scrollView.content.addComponent(Layout);
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
        if (this._scrollView.vertical) {
            layout.type = Layout.Type.VERTICAL;
            layout.verticalDirection = Layout.VerticalDirection.TOP_TO_BOTTOM;
        } else {
            layout.type = Layout.Type.HORIZONTAL;
            layout.horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT;
        }
        this.node_content = this._scrollView.content;
        this._inited = true;
    }

    onEnable() {
        this.node.on(Node.EventType.MOUSE_WHEEL, this._mouseWheel, this);
        this.node.on("scroll-began", this._scrollBegan, this);
        this.node.on("scrolling", this._updateScrollView, this);
        this.node.on("scroll-ended", this._scrollEnded, this);
    }
    onDisable() {
        this.node.off(Node.EventType.MOUSE_WHEEL, this._mouseWheel, this);
        this.node.off("scroll-began", this._scrollBegan, this);
        this.node.off("scrolling", this._updateScrollView, this);
        this.node.off("scroll-ended", this._scrollEnded, this);
        this.unscheduleAllCallbacks();
    }
	/**
	 * 初始化列表数据
	 * @param p 
	 */
    init(p: InitParam) {
        this._init(p);
    }
	/**
	 * Reload 整个 List，这时获取数据的回调函数会重新触发一遍，所有的 cell 也会更新一遍内容
	 * @param keepPos 是否保留当前位置显示，默认不保存
	 */
    reload(keepPos: boolean = false) {
        this._clear(keepPos);
        if (!this._delegate.getCellData || !this.node_content) return;
        this._load();
    }
	/**
	 * 初始化列表数据
	 * @param p 列表各项数据
	 */
    private _init(p: InitParam) {
        const needClear: boolean = !!this._delegate;
        this._delegate = p;
        if (!this._inited) return;
        if (needClear) this._clear(needClear);
        if (p.getDirection) {
            if (p.getDirection() === SrcollOptionDirect.VERTICAL) {
                this._scrollView.horizontal = false;
                this._scrollView.vertical = true;
            } else {
                this._scrollView.vertical = false;
                this._scrollView.horizontal = true;
            }
        }
        // 设置aabb包围盒坐标宽高，处列表中心位置
        const layout: Layout = this.node_content!.getComponent(Layout)!;
        const sellSize: Array<number> = p.getCellSize();
        const nodeSize = this.node.getComponent(UITransform)!.contentSize;
        if (this._scrollView.vertical) {
            layout.type = Layout.Type.VERTICAL;
            layout.paddingTop = (nodeSize.height - sellSize[1]) / 2;
            layout.paddingBottom = layout.paddingTop;
            layout.spacingY = p.getSpacing();
            this.middleItemRect = new Rect(-nodeSize.width / 2, -sellSize[1] / 2, nodeSize.width, sellSize[1]);
        } else {
            layout.type = Layout.Type.HORIZONTAL;
            layout.paddingLeft = (nodeSize.width - sellSize[0]) / 2;
            layout.paddingRight = layout.paddingLeft;
            layout.spacingX = p.getSpacing();
            this.middleItemRect = new Rect(-sellSize[0] / 2, -nodeSize.height / 2, sellSize[0], nodeSize.height);
        }
        this._load();
    }
	/**
	 * 清空列表数据
	 * @param keepPos 是否保留当前位置显示
	 */
    private _clear(keepPos: boolean = false) {
        if (!this.node_content) {
            this.node_content = new Node();
            return;
        }
        if (this._activeCellViews) {
            while (this._activeCellViews.length > 0) {
                this._recycleCell(this._activeCellViews.length - 1);
            }
        }
        this.node_content.setPosition(0, 0, 0);
    }
    /**
     * 加载数据
     * fixme 后期还可进行大量数据复用cell节点优化
     */
    private _load() {
        if (!this._delegate) return;
        const dataLen: number = this._delegate.getCellNumber();
        if (dataLen <= 0) return;

        let offset: number = 0;
        const spacing: number = this._delegate.getSpacing();
        const cellSize: number = this._scrollView.vertical ?
            this._delegate.getCellSize()[1] : this._delegate.getCellSize()[0];
        this._cellsOffset = new Array<number>(dataLen);
        for (let i = 0; i < dataLen; i++) {
            offset += (i === 0 ? 0 : ((cellSize + spacing) / 2));
            this._cellsOffset[i] = offset;
            this._addCellView(i);
            offset += ((cellSize + spacing) / 2);
        }

        // 因为content的size没有根据layout的变化而变化，需要手动计算
        const contentSize = this.node_content.getComponent(UITransform)!.contentSize;
        const tempSize = new Size();
        const layout = this.node_content.getComponent(Layout)!;
        if (this._scrollView.vertical) {
            tempSize.set(contentSize.width, dataLen*cellSize+(dataLen-1)*layout.spacingY+layout.paddingTop+layout.paddingBottom);
            this.node_content.getComponent(UITransform)!.setContentSize(tempSize);
        } else {
            tempSize.set(dataLen*cellSize+(dataLen-1)*layout.spacingX+layout.paddingLeft+layout.paddingRight, contentSize.height);
            this.node_content.getComponent(UITransform)!.setContentSize(tempSize);
        }
        layout['_doLayout']();

        // 刷新初始显示，这里需要停一下再刷新，保证滚动列表已加载完成
        this.scheduleOnce(() => {
            let index: number = (this._delegate as any).getDefaultLoaction();
            if (index < 0) index = 0;
            else if (index >= dataLen) index = dataLen - 1;
            switch (index) {
                case 0:
                    if (this._scrollView.vertical) {
                        this._scrollView.scrollToTop();
                    } else {
                        this._scrollView.scrollToLeft();
                    }
                break;
                case dataLen - 1:
                    if (this._scrollView.vertical) {
                        this._scrollView.scrollToBottom();
                    } else {
                        this._scrollView.scrollToRight();
                    }
                break;
                default:
                    if (this._scrollView.vertical) {
                        this._scrollView.scrollToOffset(new Vec3(0, this._cellsOffset[index], 0));
                    } else {
                        this._scrollView.scrollToOffset(new Vec3(this._cellsOffset[index], 0, 0));
                    }
                break;
            }
            this._updateScrollView();
        }, 0.05);
    }
    /**
     * 玩家鼠标滚轮操作
     */
    private _mouseWheel() {
        if (!this._inited) return;
        if (this.isMouseWheeling) return;
        this.isMouseWheeling = true;
        log("滚轮滚动列表");
    }
    private _scrollBegan() {
        if (!this._inited) return;
        if (this.isScrolling) return;
        this.isScrolling = true;
    }
    /**
     * 滚动结束后，自动吸附距离aabb包围盒最近的cell
     */
    private _scrollEnded() {
        if (!this._inited) return;
        if (this.isMouseWheeling) {
            this.isMouseWheeling = false;
            let index: number = this._currIndex;
            const maxLen: number = this._delegate.getCellNumber();
            // 当前偏移量
            const offset = this._scrollView.getScrollOffset();
            if (this._scrollView.vertical) {
                const endPos: number = Math.abs(offset.y);
                if (endPos > this._cellsOffset[index]) {
                    index += 1;
                    if (index >= maxLen - 1) {
                        this._scrollView.scrollToBottom(0.15);
                        this._updateScrollView();
                        return;
                    }
                    const p: Vec3 = new Vec3(0, this._cellsOffset[index], 0);
                    this._scrollView.scrollToOffset(p, 0.15);
                    this._updateScrollView();
                    return;
                }
                if (endPos < this._cellsOffset[index]) {
                    index -= 1;
                    if (index <= 0) {
                        this._scrollView.scrollToTop(0.15);
                        this._updateScrollView();
                        return;
                    }
                    const p: Vec3 = new Vec3(0, this._cellsOffset[index], 0);
                    this._scrollView.scrollToOffset(p, 0.15);
                    this._updateScrollView();
                    return;
                }
                return;
            }

            const endPos: number = Math.abs(offset.x);
            if (endPos > this._cellsOffset[index]) {
                index += 1;
                if (index >= maxLen - 1) {
                    this._scrollView.scrollToRight(0.15);
                    this._updateScrollView();
                    return;
                }
                const p: Vec3 = new Vec3(this._cellsOffset[index], 0, 0);
                this._scrollView.scrollToOffset(p, 0.15);
                this._updateScrollView();
                return;
            }
            if (endPos < this._cellsOffset[index]) {
                index -= 1;
                if (index <= 0) {
                    this._scrollView.scrollToLeft(0.15);
                    this._updateScrollView();
                    return;
                }
                const p: Vec3 = new Vec3(this._cellsOffset[index], 0, 0);
                this._scrollView.scrollToOffset(p, 0.15);
                this._updateScrollView();
                return;
            }
            return;
        }
        // 仅玩家做过操作后才会步入吸附逻辑
        if (!this.isScrolling) return;
        this.isScrolling = false;
        log("列表滚动结束");

        if (this._scrollView.vertical) {
            // 当前偏移量
            const endPos: number = Math.abs(this._scrollView.getScrollOffset().y);
            // cell行高
            const itemSize: number = this._delegate.getCellSize()[1];
            // cell间隔
            const spacing: number = this.node_content.getComponent(Layout)!.spacingY;
            if (endPos <= (itemSize + spacing) / 2) {
                this._scrollView.scrollToTop(0.15);
                this._updateScrollView();
                return;
            }
            const maxOffset: Vec3 = this._scrollView.getMaxScrollOffset();
            const bottom: number = maxOffset.y - (itemSize + spacing) / 2;
            if (endPos > bottom) {
                this._scrollView.scrollToBottom(0.15);
                this._updateScrollView();
                return;
            }
            let offset: number = (itemSize + spacing) / 2;
            for (let i = 1, len = this._delegate.getCellNumber() - 1; i < len; i++) {
                const h: number = itemSize + spacing;
                if (endPos <= offset + h) {
                    offset += h / 2;
                    const p: Vec3 = new Vec3(0, offset, 0);
                    this._scrollView.scrollToOffset(p, 0.15);
                    this._updateScrollView();
                    return;
                }
                offset += h;
            }
            return;
        }

        const endPos: number = Math.abs(this._scrollView.getScrollOffset().x);
        const itemSize: number = this._delegate.getCellSize()[0];
        const spacing: number = this.node_content.getComponent(Layout)!.spacingX;
        if (endPos <= (itemSize + spacing) / 2) {
            this._scrollView.scrollToLeft(0.15);
            this._updateScrollView();
            return;
        }
        const maxOffset: Vec3 = this._scrollView.getMaxScrollOffset();
        const bottom: number = maxOffset.x - (itemSize + spacing) / 2;
        if (endPos > bottom) {
            this._scrollView.scrollToRight(0.15);
            this._updateScrollView();
            return;
        }
        let offset: number = (itemSize + spacing) / 2;
        for (let i = 1, len = this._delegate.getCellNumber() - 1; i < len; i++) {
            const h: number = itemSize + spacing;
            if (endPos <= offset + h) {
                offset += h / 2;
                const p: Vec3 = new Vec3(offset, 0, 0);
                this._scrollView.scrollToOffset(p, 0.15);
                this._updateScrollView();
                return;
            }
            offset += h;
        }
    }

    /**
     * 滚动到指定按钮
     */
    scrollTo(idx: number) {
        const dataLen: number = this._delegate.getCellNumber();
        // 刷新初始显示，这里需要停一下再刷新，保证滚动列表已加载完成
        let index: number = idx;
        if (index < 0) index = 0;
        else if (index >= dataLen) index = dataLen - 1;
        switch (index) {
            case 0:
                if (this._scrollView.vertical) {
                    this._scrollView.scrollToTop();
                } else {
                    this._scrollView.scrollToLeft();
                }
            break;
            case dataLen - 1:
                if (this._scrollView.vertical) {
                    this._scrollView.scrollToBottom();
                } else {
                    this._scrollView.scrollToRight();
                }
            break;
            default:
                if (this._scrollView.vertical) {
                    this._scrollView.scrollToOffset(new Vec3(0, this._cellsOffset[index], 0));
                } else {
                    this._scrollView.scrollToOffset(new Vec3(this._cellsOffset[index], 0, 0));
                }
            break;
        }
        this._updateScrollView();
    }

    /**
     * 返回当前索引
     */
    getCurrentLocation(): number {
        return this._currIndex;
    }

    /**
     * 滚动中更新滚动列表视图
     */
    private _updateScrollView() {
        if (!this._inited)
            return;

        for (let i = 0, len = this._activeCellViews.length; i < len; i++) {
            const cell: ScrollOptionCell = this._activeCellViews[i];
            const viewPos: Vec3 = this._getPositionInView(cell.node);
            const pos: number = this._scrollView.vertical ? Math.abs(viewPos.y) : Math.abs(viewPos.x);
            const translation: number = this._getTranslation(pos);
            let cellPos = cell.node.getPosition();
            if (this._scrollView.vertical) {
                // cellPos.x = translation;
                cell.node.setPosition(new Vec3(translation, cellPos.y, cellPos.z));
            } else {
                // cellPos.y = translation;
                cell.node.setPosition(new Vec3(cellPos.x, translation, cellPos.z));
                // cell.node.setPosition(cellPos);
            }
            const scale: number = this._getScaleRate(pos);
            cell.node.setScale(scale, scale);

            const isShow: boolean = this._isOnShow(cell.node);
            if (isShow) {
                this._currIndex = i;
                this._currItem = cell;
                this._enableCell(cell);
            } else {
                this._disableCell(cell);
            }
        }
    }

    /**
     * 获取节点基于根节点的坐标
     * @param item 待计算坐标的cell节点
     */
    private _getPositionInView(item: Node): Vec3 {
        const itemPos = item.getPosition();
        const worldPos: Vec3 = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(itemPos);
        return this.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
    }
    /**
     * 缩放节点
     * @param pos 
     */
    private _getScaleRate(pos: number): number {
        let scale: number = 1;
        const contentSize = this.node_content.getComponent(UITransform)!.contentSize;
        if (this._scrollView.vertical) {
            scale = 1 - this._delegate.getCellScale() * pos / contentSize.height;
        } else {
            scale = 1 - this._delegate.getCellScale() * pos / contentSize.width;
        }
        return scale;
    }
    /**
     * 平移节点的偏移量
     * @param pos 
     */
    private _getTranslation(pos: number): number {
        const translation: Array<number> = (this._delegate as any).getTranslation();
        let value: number = 0;
        const cSize = this.node.getComponent(UITransform)!.contentSize;
        if (this._scrollView.vertical) {
            value = (cSize.width / 2 + this._delegate.getCellSize()[0]) * pos / cSize.height * translation[1];
        } else {
            value = (cSize.height / 2 + this._delegate.getCellSize()[1]) * pos / cSize.width * translation[1];
        }
        return translation[0] === CellTranslationDirect.LEFT_OR_BOTTOM ? -value : value;
    }
    /**
     * 坐标是否在包围盒内，在则高亮显示
     * @param item 待检查cell节点
     */
    private _isOnShow(item: Node): boolean {
        const tempPos = item.getPosition();
        const worldPos: Vec3 = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(tempPos);
        const itemPos: Vec3 = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
        return this.middleItemRect.contains(new Vec2(itemPos.x, itemPos.y));
    }
    /**
     * 构建cell节点，绑定数据
     * @param dataIndex cell索引
     */
    private _addCellView(dataIndex: number): ScrollOptionCell {
        let cell: ScrollOptionCell = this._getCellViewFromPool();
        if (!cell) {
            cell = this._delegate.getCellView(dataIndex);
            cell.node.getComponent(UITransform)!.setAnchorPoint(0.5, 0.5);
            let cellPos = cell.node.getPosition();
            if (this._scrollView.vertical) {
                cellPos.y = 0;
            } else {
                cellPos.y = 0;
            }
            cell.node.setPosition(cellPos);
        }
        cell.dataIndex = dataIndex;
        cell.script = this._delegate.script;
        cell.actived = false;
        const callback = () => {
            if (cell.actived)
                return;
            if (this._scrollView.vertical) {
                if (dataIndex === 0) {
                    this._scrollView.scrollToTop(0.5);
                } else if (dataIndex === this._cellsOffset.length - 1) {
                    this._scrollView.scrollToBottom(0.5);
                } else {
                    this._scrollView.scrollToOffset(new Vec3(0, this._cellsOffset[dataIndex], 0), 0.5);
                }
            } else {
                if (dataIndex === 0) {
                    this._scrollView.scrollToLeft(0.5);
                } else if (dataIndex === this._cellsOffset.length - 1) {
                    this._scrollView.scrollToRight(0.5);
                } else {
                    this._scrollView.scrollToOffset(new Vec3(this._cellsOffset[dataIndex], 0, 0), 0.5);
                }
            }
            this._updateScrollView();
        }
        cell.node.off(Node.EventType.TOUCH_END, callback, cell.node);
        cell.node.on(Node.EventType.TOUCH_END, callback, cell.node);
        cell.enabled = true;
        this._activeCellViews.push(cell);
        this.node_content.addChild(cell.node);

        this._updateCellContent(cell);
        return cell;
    }
    /**
     * 更新cell数据
     * @param cell cell节点
     */
    private _updateCellContent(cell: ScrollOptionCell) {
        let data: any = null;
        if (this._delegate.getCellData) {
            data = this._delegate.getCellData(cell.dataIndex);
        }
        cell.updateContent(data);
    }

    /**
     * 激活cell
     * @param cell cell节点
     */
    private _enableCell(cell: ScrollOptionCell) {
        let data: any = null;
        if (this._delegate.getCellData) {
            data = this._delegate.getCellData(cell.dataIndex);
        }
        cell.actived = true;
        cell.enableCell(data);
    }

    /**
     * 禁用cell
     * @param cell cell节点
     */
    private _disableCell(cell: ScrollOptionCell) {
        let data: any = null;
        if (this._delegate.getCellData) {
            data = this._delegate.getCellData(cell.dataIndex);
        }
        cell.actived = false;
        cell.disableCell(data);
    }

	/**
	 * 从对象池获取cell实例
	 */
    private _getCellViewFromPool(): ScrollOptionCell {
        if (!this._cellPools)
            return null!;
        const cellNode: Node = this._cellPools.get()!;
        return cellNode ? cellNode.getComponent(ScrollOptionCell as any)! : null!;
    }
	/**
	 * 从可见cell列表回收指定索引节点
	 * @param cellIndex cell索引
	 */
    private _recycleCell(cellIndex: number) {
        const cell: ScrollOptionCell = this._activeCellViews[cellIndex];
        this._activeCellViews.splice(cellIndex, 1);
        cell.node.removeFromParent();
        cell.dataIndex = -1;

        if (!this._cellPools) {
            this._cellPools = new NodePool();
        }
        this._cellPools.put(cell.node);
    }
    /**
     * 组件是否加载完毕
     */
    private _inited: boolean = false;
    /**
     * 首次加载
     */
    _firstInited: boolean = false;
    /**
     * 滚动列表是否因鼠标滚轮而滚动中
     */
    private isMouseWheeling: boolean = false;
    /**
     * 玩家拖拽操作标记
     */
    private isScrolling: boolean = false;
    /**
     * cell对象池
     */
    private _cellPools !: NodePool;
    /**
     * 数据
     */
    private _delegate !: InitParam;
    /**
     * 滚动列表组件
     */
    private _scrollView !: ScrollView;
    /**
     * 列表容器
     */
    private node_content !: Node;
    /**
     * aabb包围盒
     */
    private middleItemRect: Rect = new Rect(0, 0, 5, 5);
    /**
     * 可见区域的cell列表
     */
    private _activeCellViews: Array<ScrollOptionCell> = [];
    /**
     * cell节点偏移列表，暂未用到
     */
    private _cellsOffset: Array<number> = [];
    /**
     * 当前激活的cell节点
     */
    private _currItem !: ScrollOptionCell;
    /**
     * 当前索引
     */
    private _currIndex: number = 0;
}
