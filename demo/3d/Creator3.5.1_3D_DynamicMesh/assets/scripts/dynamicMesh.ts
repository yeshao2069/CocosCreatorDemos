
import { _decorator, Component, Node, MeshRenderer, Mesh, misc, utils, primitives, Primitive, gfx, Color } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('DynamicMesh')
export class DynamicMesh extends Component {

    @property(MeshRenderer)
    mr: MeshRenderer | null = null;

    start () {
    }

    onBtnChangeMesh() {
        console.log('auto generate dynamic mesh');
        if (null == this.mr) {
            return;
        }
        let mesh = this.mr.mesh;
        mesh?.reset(this.genMesh());
        this.mr.mesh = mesh;
    }

    genMesh(): Mesh.ICreateInfo {
        let geo: primitives.IGeometry = {
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_STRIP,
            positions: [
                -1,  1,  1,
                -1, -1,  1,
                 1, -1,  1,
                 1,  1,  1,

                 1,  1, -1,
                 1, -1, -1,
                -1, -1, -1,
                -1,  1, -1,

                 1,  1,  1,
                 1, -1,  1,
                 1, -1, -1,
                 1,  1, -1,

                -1,  1, -1,
                -1, -1, -1,
                -1, -1,  1,
                -1,  1,  1,

                -1,  1, -1,
                -1,  1,  1,
                 1,  1,  1,
                 1,  1, -1,

                -1, -1,  1,
                -1, -1, -1,
                 1, -1, -1,
                 1, -1,  1,
            ],
            colors: [
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                1, 1, 1, 1,
                1, 1, 0, 1,
                0, 1, 1, 1,
                1, 0, 1, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0, 0, 1,
                0, 0.5, 0, 1,
                0, 0, 0.5, 1,
                0.5, 0.5, 0, 1,
                0, 0.5, 0.5, 1,
                0.5, 0, 0.5, 1,
                0.2, 0.2, 0, 1,
                0, 0.2, 0.2, 1,
                0.2, 0, 0.2, 1,
                0.5, 0.8, 0, 1,
                0, 0.5, 0.8, 1,
                0.8, 0, 0.5, 1,
                0.7, 0.2, 0.5, 1,
                0.7, 0.5, 0.2, 1,
                0.2, 0.5, 0.7, 1,
                0.2, 0.7, 0.5, 1,

            ],
            normals: [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
            ],
            attributes: [
                new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F),
                new gfx.Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F),
                new gfx.Attribute(gfx.AttributeName.ATTR_NORMAL, gfx.Format.RGB32F),
            ],
            indices: [
                0, 1, 2, 3, 0, 2,
                4, 5, 6, 7, 4, 6,
                8, 9, 10, 11, 8, 10,
                12, 13, 14, 15, 12, 14,
                16, 17, 18, 19, 16, 18,
                20, 21, 22, 23, 20, 22
            ],
        };

        return utils.createMesh(geo, undefined, { calculateBounds: false });
    }

}

