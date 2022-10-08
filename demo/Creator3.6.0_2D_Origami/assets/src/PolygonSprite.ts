import { _decorator, Sprite, Vec2, IAssembler, __private, dynamicAtlasManager, Color, Renderable2D } from 'cc';
const { ccclass, property } = _decorator;


class polygonAssembler implements IAssembler {
    createData(com: PolygonSprite) {
        let vertexCount = 4;
        let indexCount = 6;
        const renderData = com.requestRenderData();
        renderData.dataLength = vertexCount;
        renderData.resize(vertexCount, indexCount);
        return renderData;
    }

    resetData (com: PolygonSprite) {
        // let points = com.polygon;
    }

    updateRenderData(com: PolygonSprite) {
        // const frame = sprite.spriteFrame;
        // dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
        const renderData = com.renderData!;
        if (renderData.vertDirty) {
            this.updateVertexData(com);
            this.updateUvs(com);

            // renderData.updateRenderData(com, com.spriteFrame);
        }
    }

    fillBuffers(sprite: PolygonSprite, renderer: any) {
        if (sprite === null) {
            return;
        }

        const node = sprite.node;

        let buffer = renderer.acquireBufferBatch()!;
        let vertexOffset = buffer.byteOffset >> 2;
        let indicesOffset = buffer.indicesOffset;
        let vertexId = buffer.vertexOffset;
        const renderData = sprite.renderData!;
        const isRecreate = buffer.request(renderData.vertexCount, renderData.indexCount);
        if (!isRecreate) {
            buffer = renderer.currBufferBatch!;
            vertexOffset = 0;
            indicesOffset = 0;
            vertexId = 0;
        }

        // buffer data may be reallocated, need get reference after request.
        const vBuf = buffer.vData!;
        const iBuf = buffer.iData!;

        const matrix = node.worldMatrix;
        const a = matrix.m00; const b = matrix.m01;
        const c = matrix.m04; const d = matrix.m05;
        const tx = matrix.m12; const ty = matrix.m13;

        for (let i = 0; i < renderData.vertexCount; ++i) {
            const vert = renderData.data[i];
            vBuf![vertexOffset++] = a * vert.x + c * vert.y + tx;
            vBuf![vertexOffset++] = b * vert.x + d * vert.y + ty;
            vBuf![vertexOffset++] = vert.z;
            vBuf![vertexOffset++] = vert.u;
            vBuf![vertexOffset++] = vert.v;
            Color.toArray(vBuf!, sprite.color, vertexOffset);
            vertexOffset += 4;
        }

        for (let i = 0; i < sprite.vertices.length - 2; ++i) {
            const start = i;
            iBuf![indicesOffset++] = vertexId;
            iBuf![indicesOffset++] = start + 1 + vertexId;
            iBuf![indicesOffset++] = start + 2 + vertexId;
            // console.log(i)
        }
    }

    updateVertexData(sprite: PolygonSprite) {
        const renderData = sprite.renderData;
        if (!renderData) {
            return;
        }
        // renderData.vertexCount = renderData.dataLength = sprite.vertices.length
        // renderData.indexCount = (renderData.vertexCount - 2) * 3

        let vertextCount = renderData.dataLength = sprite.vertices.length
        let indexCount = (renderData.vertexCount - 2) * 3
        renderData.resize(vertextCount, indexCount);
        
        renderData.vertDirty = false;
        for (let i = 0; i < sprite.vertices.length; ++i) {
            const xy = sprite.vertices[i];
            renderData.data[i].x = xy.x
            renderData.data[i].y = xy.y
        }
    }

    updateUvs(com: PolygonSprite) {
        let uvOffset = 3, floatsPerVert = 9;
        const vData = com.renderData.chunk.vb;

        const renderData = sprite.renderData!;
        const uv = sprite.spriteFrame!.uv;
        const l = uv[0], b = uv[1], t = uv[7], r = uv[6]
        for (let i = 0; i < sprite.uvs.length; ++i) {
            const uvs = sprite.uvs[i];

            // @ts-ignore
            renderData.data[i].u = l + (r - l) * uvs.x;
            // @ts-ignore
            renderData.data[i].v = b + (t - b) * uvs.y;
        }
        renderData.textureDirty = false;
    }

};

// 仅限凸多边形
@ccclass('PolygonSprite')
export class PolygonSprite extends Renderable2D {
    @property({ type: [Vec2] })
    protected _vertices: Vec2[] = [new Vec2(-100, -100), new Vec2(100, -100), new Vec2(100, 100), new Vec2(-100, 100)];
    @property({ type: [Vec2] })
    get vertices() {
        return this._vertices;
    }
    set vertices(value) {
        this._vertices = value;
        this.markForUpdateRenderData();
    }

    @property({ type: [Vec2] })
    protected _uvs: Vec2[] = [new Vec2(0, 0), new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 1)];
    @property({ type: [Vec2] })
    get uvs() {
        return this._uvs;
    }
    set uvs(value) {
        this._uvs = value;
        //@ts-ignore
        this._markForUpdateUvDirty();
        this.markForUpdateRenderData();
    }

    protected _flushAssembler() {
        let assembler = polygonAssembler;
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