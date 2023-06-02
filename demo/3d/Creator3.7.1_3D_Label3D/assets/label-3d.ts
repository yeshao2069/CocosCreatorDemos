import { _decorator, Component, Node, Font, BitmapFont, CanvasPool, Vec2, ImageAsset, Texture2D, Asset, RenderTexture, MeshRenderer, Material, Vec3, Size, utils, geometry, EventHandler } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText
export const BASELINE_RATIO = 0.26;
const MAX_SIZE = 2048;
@ccclass('Label3D')
@executeInEditMode
export class Label3D extends Component {
    /**
     * 显示文字
     */
    @property
    private _string: string = "";
    @property({ displayOrder: 2, multiline: true })

    get string() {
        return this._string;
    }
    set string(val) {
        if (val === null || val === undefined) {
            val = '';
        } else {
            val = val.toString();
        }
        if (this._string === val) {
            return;
        }
        this._string = val;
        this.updateRenderData();
    }
    @property
    private _material: Material = null!;
    @property({ type: Material, displayOrder: 2 })
    public get material() {
        return this._material;
    }
    public set material(val) {
        this._material = val;
        this.updateMeshRenderMaterial();
    }

    private _splitStrings: string[] = [];
    private _assemblerData: any = null!;
    private _context: CanvasRenderingContext2D = null!
    private _canvas: HTMLCanvasElement = null!;
    private _texture: Texture2D = null!;
    private _meshRender: MeshRenderer = null!;
    private _canvasSize: Size = new Size();
    private _worldBounds: geometry.AABB = null!;

    /**
     * mesh uvs
     */
    private _uvs: number[] = [];
    /**
     * mesh 顶点坐标
     */
    private _positions: number[] = [];

    private _startPosition: Vec2 = new Vec2();

    onLoad() {
        this.initMeshRender();

    }
    onEnable() {
        this._assemblerData = CanvasPool.getInstance().get();
        this.updateRenderData();
    }
    start() {
        this.updateRenderData();
    }
    /**
     * 刷新渲染
     */
    private updateRenderData(): void {
        if (!this._assemblerData) return;
        this._context = this._assemblerData.context;
        this._canvas = this._assemblerData.canvas;

        this.initTexture2D();
        this.updateFontFormatting();
        this.updateFontCanvasSize();
        this.updateRenderMesh();
        this.updateFontRenderingStyle();
        this.updateTexture();
        this.updateMaterial();
        this.resetRenderData();
    }
    /**
     * 初始化渲染组件
     */
    private initMeshRender(): void {
        this._meshRender = this.node.getComponent(MeshRenderer)!;
        if (!this._meshRender) {
            this._meshRender = this.node.addComponent(MeshRenderer);
        }
        this.initRenderMesh();
    }
    /**
     * 初始话mesh的基础数据
     * 最少的面数 6个顶点
     */
    private initRenderMesh(): void {
        this._positions.push(-0.5, -0.5, 0);
        this._uvs.push(0, 1);
        this._positions.push(0.5, -0.5, 0);
        this._uvs.push(1, 1);
        this._positions.push(-0.5, 0.5, 0);
        this._uvs.push(0, 0);
        this._positions.push(-0.5, 0.5, 0);
        this._uvs.push(0, 0);
        this._positions.push(0.5, -0.5, 0);
        this._uvs.push(1, 1);
        this._positions.push(0.5, 0.5, 0);
        this._uvs.push(1, 0);
        // this._meshRender.mesh = utils.MeshUtils.createDynamicMesh(0, {
        //     positions: new Float32Array(this._positions),
        //     uvs: new Float32Array(this._uvs),
        //     indices32:new Uint32Array(),
        //     minPos: { x: -0.5, y: -0.5, z: 0 },
        //     maxPos: { x: 0.5, y: 0.5, z: 0 }
        // });
        this._meshRender.mesh = utils.MeshUtils.createMesh({
            positions: this._positions,
            uvs: this._uvs,
            minPos: { x: -0.5, y: -0.5, z: 0 },
            maxPos: { x: 0.5, y: 0.5, z: 0 }
        });
        this._meshRender.model?.updateWorldBound();
        // this._worldBounds = this._meshRender.model?.worldBounds!;
        // let a = new Vec3();
        // let b = new Vec3();
        // this._worldBounds.getBoundary(a, b);
        // console.log(a, b);
        this.updateMeshRenderMaterial();
    }
    private updateMeshRenderMaterial(): void {
        if (!this._meshRender || !this._material) return;
        this._meshRender.material = this._material;
    }

    private initTexture2D(): void {
        if (!this._texture) {
            let image: ImageAsset = new ImageAsset(this._canvas);
            this._texture = new Texture2D();
            this._texture.image = image;
        }
    }
    private updateTexture(): void {
        if (!this._context || !this._canvas) return;
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        let textPosX: number = 0;
        let textPosY: number = 0;
        for (let i = 0; i < this._splitStrings.length; i++) {
            textPosY = this._startPosition.y + (i + 1) * this.getLineHeight();
            let len: number = this._context.measureText(this._splitStrings[i]).width;
            textPosX = (this._canvas.width - len) / 2;

            this._context.fillText(this._splitStrings[i], textPosX, textPosY);
        }
        let uploadAgain: boolean = this._canvas.width !== 0 && this._canvas.height !== 0;
        if (uploadAgain) {
            this._texture.reset({
                width: this._canvas.width,
                height: this._canvas.height,
                mipmapLevel: 1,
            });
            this._texture.uploadData(this._canvas);
            this._texture.setWrapMode(RenderTexture.WrapMode.CLAMP_TO_EDGE, RenderTexture.WrapMode.CLAMP_TO_EDGE);
        }
    }

    private updateMaterial(): void {
        if (!this._texture) return;
        if (!this._meshRender) return;
        if (!this._material) return;
        let material: Material = this._meshRender.getMaterialInstance(0)!;
        material.setProperty("mainTexture", this._texture);
    }
    /**
    * 字体格式化
    * “\n” 为换行符号
    */
    private updateFontFormatting(): void {
        if (!this._context) return;
        let strs: string[] = this._string.split("\\n");
        this._splitStrings = strs;
        for (let i = 0; i < strs.length; i++) {
            //获取文本的宽度
            let len: number = this._context.measureText(strs[i]).width;
            if (len > this._canvasSize.width) {
                this._canvasSize.width = len;
            }
        }
        this._canvasSize.height = strs.length * this.getLineHeight() + BASELINE_RATIO * this.getLineHeight();
    }
    /**
     * 根据字体的样式
     * 更新canvas的size
     */
    private updateFontCanvasSize(): void {
        this._canvasSize.width = Math.min(this._canvasSize.width, MAX_SIZE);
        this._canvasSize.height = Math.min(this._canvasSize.height, MAX_SIZE);
        if (this._canvas.width != this._canvasSize.width) {
            this._canvas.width = this._canvasSize.width;
        }
        if (this._canvas.height != this._canvasSize.height) {
            this._canvas.height = this._canvasSize.height;
        }
        this._context.font = this.getFontDesc();
    }
    private updateFontRenderingStyle(): void {
        this._context.font = this.getFontDesc();
        this._context.lineJoin = "round";
        this._context.textAlign = "left";
        this._context.textBaseline = "alphabetic";
        this._context.fillStyle = `rgba(${255}, ${255}, ${255}, ${255})`;
    }
    /**
     * 根据canvas的实际宽高
     * 动态的调整mesh的坐标
     */
    private updateRenderMesh(): void {
        let rate: number = this._canvas.width / this._canvas.height;
        this._positions = [];
        this._positions.push(-0.5 * rate, -0.5, 0);
        this._positions.push(0.5 * rate, -0.5, 0);
        this._positions.push(-0.5 * rate, 0.5, 0);
        this._positions.push(-0.5 * rate, 0.5, 0);
        this._positions.push(0.5 * rate, -0.5, 0);
        this._positions.push(0.5 * rate, 0.5, 0);
        // this._meshRender.mesh?.updateSubMesh(0, {
        //     positions: new Float32Array(this._positions),
        //     minPos: { x: -0.5 * rate, y: -0.5, z: 0 },
        //     maxPos: { x: 0.5 * rate, y: 0.5, z: 0 }
        // });
        this._meshRender.mesh = utils.MeshUtils.createMesh({
            positions: this._positions,
            uvs: this._uvs,
            minPos: { x: -0.5, y: -0.5, z: 0 },
            maxPos: { x: 0.5, y: 0.5, z: 0 }
        });
        this._meshRender.model?.updateWorldBound();
        this.updateMeshRenderMaterial();
    }
    /**
     * 获取行高
     */
    private getLineHeight(): number {
        return 50; //行高 -暂时写成40 
    }
    private getFontDesc() {
        let fontDesc: string = "";
        //字体大小
        fontDesc += "50px ";
        fontDesc += "Arial"
        return fontDesc;
    }

    private resetRenderData(): void {
        this._canvasSize.width = 0;
        this._canvasSize.height = 0;
    }

    update(deltaTime: number) {

    }

    onDisable() {
        if (this._assemblerData) {
            CanvasPool.getInstance().put(this._assemblerData);
        }
        this._meshRender = null!;
    }
}

