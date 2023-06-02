import { _decorator, Sprite, Vec2, IAssembler, __private } from 'cc';
const { ccclass, property } = _decorator;

const simple: IAssembler = {
    createData(com: Sprite) {
        const renderData = com.requestRenderData();
        renderData.dataLength = 4;
        renderData.resize(4, 6);
        return renderData;
    },

    updateRenderData(com: ExSprite) {
        const renderData = com.renderData!;
        if (renderData.vertDirty) {
            this.updateVertexData(com);
            this.updateUvs(com);
            this.updateColor(com);
            renderData.updateRenderData(com, com.spriteFrame!);
        }
    },

    fillBuffers(com: ExSprite, renderer: any) {
        if (com === null) {
            return;
        }

        const chunk = com.renderData!.chunk;

        const dataList: any[] = com.renderData!.data;
        const node = com.node;

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
        const vData = com.renderData!.chunk.vb;
        const data0 = dataList[0];
        const data1 = dataList[1];
        const data2 = dataList[2];
        const data3 = dataList[3];
        const matrix = node.worldMatrix;
        const a = matrix.m00; const b = matrix.m01;
        const c = matrix.m04; const d = matrix.m05;
        const tx = matrix.m12; const ty = matrix.m13;

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

    updateVertexData(com: ExSprite) {
        const renderData: any | null = com.renderData;
        if (!renderData) {
            return;
        }

        const uiTrans = com.node._uiProps.uiTransformComp!;
        const dataList: any[] = renderData.data;
        const cw = uiTrans.width;
        const ch = uiTrans.height;
        const appX = uiTrans.anchorX * cw;
        const appY = uiTrans.anchorY * ch;
        let l = 0;
        let b = 0;
        let r = 0;
        let t = 0;
        if (com.trim) {
            l = -appX;
            b = -appY;
            r = cw - appX;
            t = ch - appY;
        } else {
            const frame = com.spriteFrame!;
            const originSize = frame.originalSize;
            const rect = frame.rect;
            const ow = originSize.width;
            const oh = originSize.height;
            const rw = rect.width;
            const rh = rect.height;
            const offset = frame.offset;
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

        dataList[0].x = l + com.offsetLeftBottom.x;
        dataList[0].y = b + com.offsetLeftBottom.y;;
        dataList[0].z = 0;

        dataList[1].x = r + com.offsetRightDown.x;
        dataList[1].y = b + com.offsetRightDown.y;;
        dataList[1].z = 0;

        dataList[2].x = l + com.offsetLeftTop.x;
        dataList[2].y = t + com.offsetLeftTop.y;;
        dataList[2].z = 0;

        dataList[3].x = r + com.offsetRightTop.x;
        dataList[3].y = t + com.offsetRightTop.y;
        dataList[3].z = 0;

        renderData.vertDirty = false;
    },

    updateUvs(com: ExSprite) {
        const renderData = com.renderData!;
        const vData = renderData.chunk.vb;
        const uv = com.spriteFrame!.uv;
        vData[3] = uv[0];
        vData[4] = uv[1];
        vData[12] = uv[2];
        vData[13] = uv[3];
        vData[21] = uv[4];
        vData[22] = uv[5];
        vData[30] = uv[6];
        vData[31] = uv[7];

        renderData.vertDirty = false;
    },

    updateColor(com: ExSprite) {
        let vData = com.renderData!.chunk.vb;
        let colorOffset = 5, floatsPerVert = 9;

        const color = com.color;
        const colorR = color.r / 255;
        const colorG = color.g / 255;
        const colorB = color.b / 255;
        const colorA = color.a / 255;
        for (let i = 0; i < 4; i++) {
            vData[colorOffset] = colorR;
            vData[colorOffset + 1] = colorG;
            vData[colorOffset + 2] = colorB;
            vData[colorOffset + 3] = colorA;
            colorOffset += floatsPerVert;
        }
    },
};

@ccclass('ExSprite')
export class ExSprite extends Sprite {

    @property
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

    @property
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


    @property
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

    @property
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
