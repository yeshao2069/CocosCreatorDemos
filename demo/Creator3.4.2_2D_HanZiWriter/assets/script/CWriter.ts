
import { _decorator, Component, Node, Vec3, Color, Mat4, Rect, Label, game, log, view, UITransform, EventHandler, find,
    screen } from 'cc';
const { ccclass, property } = _decorator;

const _vec3 : Vec3 = new Vec3();
let _domCount : number = 0;
const LEFT_PADDING : number = -5;
const BOTTOM_PADDING : number = -20;

interface MISTAKE_STROKEDATA {
    strokeNum: number; // 这是汉字中的第几笔
    mistakesOnStroke: number; // 这一笔画错了多少次
    totalMistakes: number; // 前面几笔一共画错了多少次
    strokesRemaining: number; // 此字符中剩余的笔划数
    drawnPath: object; // 包含pathString用户绘制的对象以及points用于评分的对象
}
interface COMPLETE_STROKEDATA {
    character: string; // 画对的字符是什么
    totalMistakes: number; // 一共画错了多少笔
}

@ccclass('CWriter')
export class CWriter extends Component {
    public writer = null;

	private _label: string = '';
    private _writerActive = false;
	private _padding = 20; // 绘画区域的外扩面积
	private _m00 = 0;
	private _m01 = 0;
	private _m04 = 0;
	private _m05 = 0;
	private _m12 = 0;
	private _m13 = 0;
	private _w = 0;
	private _h = 0;
	private _scaleX = 1;
	private _scaleY = 0;
	private _labelWidth = 0;
	private _labelHeight = 0;
	private _elem !: HTMLElement;
	private _domId = '';
	private _hasInit = false;
	private _eventListeners: any = {};
    private _worldMat !: Mat4;
    private _cameraMat !: Mat4;
    private _mat4_temp_1 : Mat4 = new Mat4();

    private _cacheViewportRect !: Rect;
    private _showOutline: boolean = false;

    @property({ tooltip: '初始的颜色,即轮廓的颜色' })
	outlineColor: Color = new Color(221, 221, 221);
	@property({ tooltip: '填充的颜色' })
	strokeColor: Color = new Color(239, 42, 42);
	@property({ tooltip: '提示下一笔时，高亮的颜色' })
	highlightColor: Color = new Color(22, 143, 22);
	@property({ tooltip: '画图时笔迹的颜色' })
	drawingColor: Color = new Color(32, 215, 102);
    @property({ tooltip: '显示部首时，高亮的颜色' })
	radicalColor: Color = new Color(32, 215, 197);
    @property({ tooltip: '在自动填充时，增大此数字可以更快地绘制笔划，减小此速度可以更慢地绘制笔划' })
	strokeAnimationSpeed = 1;
    @property({ tooltip: '在自动填充时，增大此数字可以更快地突出显示，降低该速度可以突出显示较慢' })
	strokeHighlightSpeed = 2;
    @property({ tooltip: '设置动画时每个笔画之间的时间（以毫秒为单位）' })
	delayBetweenStrokes = 1000;
	@property({ tooltip: '每个动画循环之间的时间（以毫秒为单位）' })
	delayBetweenLoops = 2000;
    @property({ tooltip: '错误几次自动提示下一笔' })
	showHintAfterMisses = 1;
	@property({ tooltip: '画图时笔迹的粗细' })
	drawingWidth = 20;
    @property({ tooltip: '控制当用户完成绘制整个汉字时测验是否短暂高亮显示汉字' })
	highlightOnComplete = true;
	@property({ type: (Component as any).EventHandler as EventHandler, displayName: 'onComplete', tooltip: '完成一个字时触发' })
	onComplete = new (Component as any).EventHandler();
	@property({ type: (Component as any).EventHandler, displayName: 'onCorrectStroke', tooltip: '画对一笔时触发'})
	onCorrectStroke = new (Component as any).EventHandler();
    @property({ type: (Component as any).EventHandler, displayName: 'onMistake', tooltip: '当画错时触发' })
	onMistake = new (Component as any).EventHandler();

	public set writerActive(newVal: boolean) {
        if (this._writerActive == newVal) return;
        this._writerActive = newVal;
        this._updateActive();
	}

	public get writerActive() {
        return this._writerActive;
	}

	_init() {
        this._label = this.node.getComponent(Label)!.string;
        this._labelWidth = this.node.getComponent(UITransform)!.contentSize.width;
        this._labelHeight = this.node.getComponent(UITransform)!.contentSize.height;
        this._domId = `WriteBox${++_domCount}`;
        this._elem = null!;
        this._worldMat = new Mat4();
        this._cameraMat = new Mat4();
        this._m00 = 0;
        this._m01 = 0;
        this._m04 = 0;
        this._m05 = 0;
        this._m12 = 0;
        this._m13 = 0;
        this._w = 0;
        this._h = 0;
        this._cacheViewportRect = new Rect(0, 0, 0, 0);
        this.initHanzi();
        this.node.getComponent(Label)!.enabled = false;
        this._hasInit = true;
	}

    private _createDom() {
        this._elem = document.createElement('div');
    }

    private _initStyleSheet() {
        let elem = this._elem;
        // elem.style.display = 'none';
        elem.style.border = '0';
        elem.style.background = 'transparent';
        elem.style.width = '100%';
        elem.style.height = '100%';
        elem.style.padding = '0';
        elem.style.position = 'absolute';
        elem.style.bottom = BOTTOM_PADDING + 'px';
        elem.style.left = LEFT_PADDING + 'px';
        elem.id = this._domId;
    }

    private _addDomToGameContainer() {
        game.container!.appendChild(this._elem);
    }

    private _updateMatrix() {
        let node = this.node;
        log(this._worldMat);
        node.getWorldMatrix(this._worldMat);
        let worldMat = this._worldMat;
        let localView = view;
        // 检测是否需要挪动位置
        if (this._m00 === worldMat.m00 && this._m01 === worldMat.m01 &&
            this._m04 === worldMat.m04 && this._m05 === worldMat.m05 &&
            this._m12 === worldMat.m12 && this._m13 === worldMat.m13 &&
            this._w === node.getComponent(UITransform)!.contentSize.width &&
            this._h === node.getComponent(UITransform)!.contentSize.height &&
            this._cacheViewportRect.equals(localView.getViewportRect())
        ) {
            return;
        }
        
        // 更新矩阵缓存
        this._m00 = worldMat.m00;
        this._m01 = worldMat.m01;
        this._m04 = worldMat.m04;
        this._m05 = worldMat.m05;
        this._m12 = worldMat.m12;
        this._m13 = worldMat.m13;
        this._w = node.getComponent(UITransform)!.contentSize.width;
        this._h = node.getComponent(UITransform)!.contentSize.height;
        
        // 更新视图缓存 需要判断缩放和锚点
        this._cacheViewportRect.set(localView.getViewportRect());
        let scaleX = localView.getScaleX();
        let scaleY = localView.getScaleY();
        let viewport = localView.getViewportRect();
        let dpr = screen.devicePixelRatio;
        _vec3.x = -node.getComponent(UITransform)!.anchorX * this._w;
        _vec3.y = -node.getComponent(UITransform)!.anchorY * this._h;
        Mat4.transform(worldMat, worldMat, _vec3);
        
        this.getWorldToScreenMatrix2D(this._cameraMat);
        let cameraMat = this._cameraMat;
        Mat4.multiply(cameraMat, cameraMat, worldMat);
        
        scaleX /= dpr;
        scaleY /= dpr;
        
        let container = game.container!;
        let a = cameraMat.m00 * scaleX;
        let b = cameraMat.m01;
        let c = cameraMat.m04;
        let d = cameraMat.m05 * scaleY;
        this._scaleX = a;
        this._scaleY = d;
        let offsetX = (container && container.style.paddingLeft && parseInt(container.style.paddingLeft)) as number;
        offsetX += viewport.x / dpr;
        let offsetY = (container && container.style.paddingBottom && parseInt(container.style.paddingBottom)) as number;
        offsetY += viewport.y / dpr;
        let tx = cameraMat.m12 * scaleX + offsetX;
        let ty = cameraMat.m13 * scaleY + offsetY;
        
        let elem = this._elem;
        let matrix = 'matrix(' + 1 + ',' + -b + ',' + -c + ',' + 1 + ',' + tx + ',' + -ty + ')';
        elem.style['transform'] = matrix;
        elem.style['-webkit-transform'] = matrix;
        elem.style['transform-origin'] = '0px 100% 0px';
        elem.style['-webkit-transform-origin'] = '0px 100% 0px';
    }

    private _updateHanzi() {
        this._labelWidth = this.node.getComponent(UITransform)!.contentSize.width;
        this._labelHeight = this.node.getComponent(UITransform)!.contentSize.height;
        this.destroySelf();
        this.initHanzi();
    }

    private _updateActive() {
        if (this._writerActive) {
            if (!this._hasInit) {
                this._init();
            } else {
                this._showDom();
            }
        } else {
            this._hideDom();
        }
    }

    private _showDom() {
        this._updateMatrix();
        this._elem.style.display = '';
    }

    private _hideDom() {
        this._elem.style.display = 'none';
    }

    private _clear() {
        if (document.getElementById(this._domId)) {
            document.getElementById(this._domId)!.remove();
        }
    }

    private _registerEventListeners() {
        let impl = this;
        let cbs = this._eventListeners;

        cbs.onResize = function() {
            impl._updateMatrix();
        };
        cbs.POSITION_CHANGED = function() {
            impl._updateMatrix();
        };
        cbs.SIZE_CHANGED = function() {
            impl._updateHanzi();
        };
        cbs.ANCHOR_CHANGED = function() {
            impl._updateMatrix();
        };
        window.addEventListener('resize', cbs.onResize);
        window.addEventListener('orientationchange', cbs.onResize);

        this.node.on(Node.EventType.TRANSFORM_CHANGED, cbs.POSITION_CHANGED, this);
        this.node.on(Node.EventType.SIZE_CHANGED, cbs.SIZE_CHANGED, this);
        this.node.on(Node.EventType.ANCHOR_CHANGED, cbs.ANCHOR_CHANGED, this);
    }

    private _removeEventListeners() {
        let cbs = this._eventListeners;
        window.removeEventListener('resize', cbs.onResize);
        window.removeEventListener('orientationchange', cbs.onResize);
        this.node.off(Node.EventType.TRANSFORM_CHANGED, cbs.POSITION_CHANGED, this);
        this.node.off(Node.EventType.SIZE_CHANGED, cbs.SIZE_CHANGED, this);
        this.node.off(Node.EventType.ANCHOR_CHANGED, cbs.ANCHOR_CHANGED, this);
    }

    public initHanzi() {
        this._createDom();
        this._initStyleSheet();
        this._updateMatrix();
        this.setSize();
        this._addDomToGameContainer();
        this._registerEventListeners();

        this.writer = HanziWriter.create(this._domId, this._label, {
            width: (this._labelWidth + this._padding * 2) * this._scaleX,
            height: (this._labelHeight + this._padding * 2) * this._scaleY,
            padding: this._padding * this._scaleX,
            showHintAfterMisses: this.showHintAfterMisses,
            strokeColor: '#' + this.strokeColor.toHEX('#rrggbb'),
            highlightColor: '#' + this.highlightColor.toHEX('#rrggbb'),
            radicalColor: '#' + this.radicalColor.toHEX('#rrggbb'),
            outlineColor: '#' + this.outlineColor.toHEX('#rrggbb'),
            drawingColor: '#' + this.drawingColor.toHEX('#rrggbb'),
            drawingWidth: this.drawingWidth,
            strokeAnimationSpeed: this.strokeAnimationSpeed,
            delayBetweenStrokes: this.delayBetweenStrokes,
            highlightOnComplete: this.highlightOnComplete,
            strokeHighlightSpeed: this.strokeHighlightSpeed,
            delayBetweenLoops: this.delayBetweenLoops
        });
        const component = this;
        (this.writer as any).quiz({
            onComplete(summaryData: COMPLETE_STROKEDATA) {
                log('complete');
                (Component as any).EventHandler.emitEvents(
                    [component.onComplete],
                    summaryData,
                    component
                );
            },
            onCorrectStroke(strokeData: MISTAKE_STROKEDATA) {
                log('当前的笔画编号:' + strokeData.strokeNum);
                (Component as any).EventHandler.emitEvents(
                    [component.onCorrectStroke],
                    strokeData,
                    component
                );
            },
            onMistake(strokeData: MISTAKE_STROKEDATA) {
                log('error');
                (Component as any).EventHandler.emitEvents(
                    [component.onMistake],
                    strokeData,
                    component
                );
            }
        });
    }

    public show() {
        this._showDom();
    }

    public hide() {
        this._hideDom();
    }

    public destroySelf() {
        this._elem = null!;
        this._removeEventListeners();
        this._clear();
    }

    // 改变cocos内的label之后调用这个方法
    public changeLabel() {
        this._clear();
        this._init();
    }

    public animateCharacter() {
        (this.writer as any).animateCharacter();
    }

    public setSize() {
        let elem = this._elem;
        elem.style.width = (this._labelWidth + this._padding * 2) * this._scaleX + 'px';
        elem.style.height = (this._labelHeight + this._padding * 2) * this._scaleY + 'px';
    }

    onEnable() {
        this._init();
    }

    onDisable() {
        this.destroySelf();
    }

    getWorldToScreenMatrix2D (out: Mat4) {
        let camera = find('Canvas/Camera');
        camera!.getWorldRT(this._mat4_temp_1);

        let zoomRatio = 1; 
        this._mat4_temp_1.m00 *= zoomRatio;
        this._mat4_temp_1.m01 *= zoomRatio;
        this._mat4_temp_1.m04 *= zoomRatio;
        this._mat4_temp_1.m05 *= zoomRatio;

        const m00 = this._mat4_temp_1.m00;
        const m01 = this._mat4_temp_1.m01;
        const m04 = this._mat4_temp_1.m04;
        const m05 = this._mat4_temp_1.m05;
        const m12 = this._mat4_temp_1.m12;
        const m13 = this._mat4_temp_1.m13;

        let center = view.getViewportRect().center;
        this._mat4_temp_1.m12 = center.x - (m00 * m12 + m04 * m13);
        this._mat4_temp_1.m13 = center.y - (m01 * m12 + m05 * m13);

        if (out !== this._mat4_temp_1) {
            Mat4.copy(out, this._mat4_temp_1);
        }
        return out;
    }
}
