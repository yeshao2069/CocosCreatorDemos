import { _decorator, Sprite, Vec2, IAssembler, __private, dynamicAtlasManager } from 'cc';
const { ccclass, property } = _decorator;

// assembler 介绍ppt
// https://lamyoung.gitee.io/web/slidev/assembler-sprite-simple/dist

const simple: IAssembler = {
    createData(sprite: Sprite) {
        const renderData = sprite.requestRenderData();
        renderData.dataLength = 4;
        renderData.vertexCount = 4;
        renderData.indicesCount = 6;

        renderData.vData = new Float32Array(4 * 9);

        return renderData;
    },

    updateRenderData(sprite: ExSprite) {
        const frame = sprite.spriteFrame;

        // TODO: Material API design and export from editor could affect the material activation process
        // need to update the logic here
        // if (frame) {
        //     if (!frame._original && dynamicAtlasManager) {
        //         dynamicAtlasManager.insertSpriteFrame(frame);
        //     }
        //     if (sprite._material._texture !== frame._texture) {
        //         sprite._activateMaterial();
        //     }
        // }
        dynamicAtlasManager.packToDynamicAtlas(sprite, frame);

        const renderData = sprite.renderData;
        if (renderData && frame) {
            if (renderData.vertDirty) {
                this.updateVertexData(sprite);
            }
            if (renderData.uvDirty) {
                this.updateUvs(sprite);
            }
        }
    },

    fillBuffers(sprite: ExSprite, renderer: any) {
        if (sprite === null) {
            return;
        }

        // const buffer: MeshBuffer = renderer.createBuffer(
        //     sprite.renderData!.vertexCount,
        //     sprite.renderData!.indicesCount,
        // );
        // const commitBuffer: IUIRenderData = renderer.createUIRenderData();
        const dataList: any[] = sprite.renderData!.data;
        const node = sprite.node;

        let buffer = renderer.acquireBufferBatch()!;
        let vertexOffset = buffer.byteOffset >> 2;
        let indicesOffset = buffer.indicesOffset;
        let vertexId = buffer.vertexOffset;

        const isRecreate = buffer.request();
        if (!isRecreate) {
            buffer = renderer.currBufferBatch!;
            vertexOffset = 0;
            indicesOffset = 0;
            vertexId = 0;
        }

        // buffer data may be reallocated, need get reference after request.
        const vBuf = buffer.vData!;
        const iBuf = buffer.iData!;
        const vData = sprite.renderData!.vData!;
        const data0 = dataList[0];
        const data1 = dataList[1];
        const data2 = dataList[2];
        const data3 = dataList[3];
        const matrix = node.worldMatrix;
        const a = matrix.m00; const b = matrix.m01;
        const c = matrix.m04; const d = matrix.m05;
        const tx = matrix.m12; const ty = matrix.m13;
        // const vl = data0.x; const vr = data3.x;
        // const vb = data0.y; const vt = data3.y;
        // const al = a * vl; const ar = a * vr;
        // const bl = b * vl; const br = b * vr;
        // const cb = c * vb; const ct = c * vt;
        // const db = d * vb; const dt = d * vt;
        // left bottom
        vData[0] = a * data0.x + c * data0.y + tx;
        vData[1] = b * data0.x + d * data0.y + ty;
        // right bottom
        vData[9] = a * data1.x + c * data1.y + tx;
        vData[10] = b * data1.x + d * data1.y + ty;
        // left top
        vData[18] = a * data2.x + c * data2.y + tx;
        vData[19] = b * data2.x + d * data2.y + ty;
        // right top
        vData[27] = a * data3.x + c * data3.y + tx;
        vData[28] = b * data3.x + d * data3.y + ty;

        vBuf.set(vData, vertexOffset);

        // fill index data
        iBuf[indicesOffset++] = vertexId;
        iBuf[indicesOffset++] = vertexId + 1;
        iBuf[indicesOffset++] = vertexId + 2;
        iBuf[indicesOffset++] = vertexId + 2;
        iBuf[indicesOffset++] = vertexId + 1;
        iBuf[indicesOffset++] = vertexId + 3;
    },

    updateVertexData(sprite: ExSprite) {
        const renderData: any | null = sprite.renderData;
        if (!renderData) {
            return;
        }

        const uiTrans = sprite.node._uiProps.uiTransformComp!;
        const dataList: any[] = renderData.data;
        const cw = uiTrans.width;
        const ch = uiTrans.height;
        const appX = uiTrans.anchorX * cw;
        const appY = uiTrans.anchorY * ch;
        let l = 0;
        let b = 0;
        let r = 0;
        let t = 0;
        if (sprite.trim) {
            l = -appX;
            b = -appY;
            r = cw - appX;
            t = ch - appY;
        } else {
            const frame = sprite.spriteFrame!;
            const originSize = frame.getOriginalSize();
            const rect = frame.getRect();
            const ow = originSize.width;
            const oh = originSize.height;
            const rw = rect.width;
            const rh = rect.height;
            const offset = frame.getOffset();
            const scaleX = cw / ow;
            const scaleY = ch / oh;
            const trimLeft = offset.x + (ow - rw) / 2;
            const trimRight = offset.x - (ow - rw) / 2;
            const trimBottom = offset.y + (oh - rh) / 2;
            const trimTop = offset.y - (oh - rh) / 2;
            l = trimLeft * scaleX - appX;
            b = trimBottom * scaleY - appY;
            r = cw + trimRight * scaleX - appX;
            t = ch + trimTop * scaleY - appY;
        }

        dataList[0].x = l + sprite.offsetLeftBottom.x;
        dataList[0].y = b + sprite.offsetLeftBottom.y;;
        dataList[0].z = 0;

        dataList[1].x = r + sprite.offsetRightDown.x;
        dataList[1].y = b + sprite.offsetRightDown.y;;
        dataList[1].z = 0;

        dataList[2].x = l + sprite.offsetLeftTop.x;
        dataList[2].y = t + sprite.offsetLeftTop.y;;
        dataList[2].z = 0;

        dataList[3].x = r + sprite.offsetRightTop.x;
        dataList[3].y = t + sprite.offsetRightTop.y;
        dataList[3].z = 0;

        renderData.vertDirty = false;
    },

    updateUvs(sprite: ExSprite) {
        const renderData = sprite.renderData!;
        const vData = renderData.vData!;
        const uv = sprite.spriteFrame!.uv;
        vData[3] = uv[0];
        vData[4] = uv[1];
        vData[12] = uv[2];
        vData[13] = uv[3];
        vData[21] = uv[4];
        vData[22] = uv[5];
        vData[30] = uv[6];
        vData[31] = uv[7];

        renderData.uvDirty = false;
    },

    updateColor(sprite: ExSprite) {
        const vData = sprite.renderData!.vData;

        let colorOffset = 5;
        const color = sprite.color;
        const colorR = color.r / 255;
        const colorG = color.g / 255;
        const colorB = color.b / 255;
        const colorA = color.a / 255;
        for (let i = 0; i < 4; i++) {
            vData![colorOffset] = colorR;
            vData![colorOffset + 1] = colorG;
            vData![colorOffset + 2] = colorB;
            vData![colorOffset + 3] = colorA;

            colorOffset += 9;
        }
    },
};



@ccclass('ExSprite')
export class ExSprite extends Sprite {

    @property({ type: Vec2 })
    protected _offsetLeftBottom: Vec2 = new Vec2(0, 0);
    @property
    get offsetLeftBottom() {
        return this._offsetLeftBottom;
    }
    set offsetLeftBottom(value) {
        this._offsetLeftBottom.x = value.x;
        this._offsetLeftBottom.y = value.y;
        this.markForUpdateRenderData();
    }

    @property({ type: Vec2 })
    protected _offsetRightDown: Vec2 = new Vec2(0, 0);
    @property
    get offsetRightDown() {
        return this._offsetRightDown;
    }
    set offsetRightDown(value) {
        this._offsetRightDown.x = value.x;
        this._offsetRightDown.y = value.y;
        this.markForUpdateRenderData();
    }


    @property({ type: Vec2 })
    protected _offsetLeftTop: Vec2 = new Vec2(0, 0);
    @property
    get offsetLeftTop() {
        return this._offsetLeftTop;
    }
    set offsetLeftTop(value) {
        this._offsetLeftTop.x = value.x;
        this._offsetLeftTop.y = value.y;
        this.markForUpdateRenderData();
    }

    @property({ type: Vec2 })
    protected _offsetRightTop: Vec2 = new Vec2(0, 0);
    @property
    get offsetRightTop() {
        return this._offsetRightTop;
    }
    set offsetRightTop(value) {
        this._offsetRightTop.x = value.x;
        this._offsetRightTop.y = value.y;
        this.markForUpdateRenderData();
    }
    protected _flushAssembler() {
        let assembler = simple;
        console.log(this.type)
        switch (this.type) {
            case 1:     
            case 2:
            case 3:
                assembler = Sprite.Assembler!.getAssembler(this);
                break;
            default:
                break;
        }


        if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
        }

        if (!this._renderData) {
            if (this._assembler && this._assembler.createData) {
                this._renderData = this._assembler.createData(this);
                this._renderData!.material = this.getRenderMaterial(0);
                this.markForUpdateRenderData();
                this._updateColor();
            }
        }
    }


}
