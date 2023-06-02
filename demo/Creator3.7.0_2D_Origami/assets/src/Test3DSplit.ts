
import { _decorator, Component, MeshRenderer, primitives, utils, Vec3, Quat, quat, EventTouch, Touch, Camera, geometry, Line, mat4, Slider, Input, input } from 'cc';
const { ccclass, property } = _decorator;

const _temp_v3 = new Vec3();
const _temp_v3_1 = new Vec3();
const _temp_v3_2 = new Vec3();
const _temp_v3_3 = new Vec3();
const _temp_quat = quat();
const _temp_m4 = mat4();
const deOpt: geometry.IRayMeshOptions = { distance: Infinity, doubleSided: false, mode: geometry.ERaycastMode.CLOSEST };

@ccclass('Test3DSplit')
export class Test3DSplit extends Component {
    @property(MeshRenderer)
    meshRenderer: MeshRenderer = null!;
    @property({ type: Camera })
    readonly cameraCom: Camera = null!;
    @property({ type: Line })
    readonly line: Line = null!;
    @property({ type: Slider })
    readonly slider: Slider = null!;

    private _gemotry: primitives.IGeometry = primitives.plane({ width: 10, length: 10, widthSegments: 99, lengthSegments: 99 });
    private _mesh = utils.createMesh(this._gemotry);
    private _selectedPos: Map<number, number[]> = new Map();
    private _selectedNormal: Map<number, number[]> = new Map();
    private _ray: geometry.Ray = new geometry.Ray();
    private _axiStart: Vec3 | null = null;
    private _axiEnd: Vec3 | null = null;

    start() {
        this.reset();
        this.meshRenderer.mesh = this._mesh;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchStart, this);
    }

    private reset() {
        this._gemotry = primitives.plane({ width: 10, length: 10, widthSegments: 99, lengthSegments: 99 });
        utils.createMesh(this._gemotry, this._mesh);
        this.renderMesh();
        this.line.positions = [];
        this._axiStart = this._axiEnd = null;
        this.cameraCom.node.parent!.eulerAngles = new Vec3(0, 0, 0);
    }

    private onTouchStart(event: EventTouch) {
        //todo 坐标转换，目前 meshRenderer 在原点
        const point = event.touch!.getLocation();
        this.cameraCom.screenPointToRay(point.x, point.y, this._ray);
        const minDis = geometry.intersect.rayMesh(this._ray, this._mesh, deOpt)
        if (minDis) {
            const pos = Vec3.add(_temp_v3, this._ray.o, Vec3.multiplyScalar(_temp_v3, this._ray.d, minDis));
            if (event.type === Input.EventType.TOUCH_START) {
                this._axiStart = new Vec3(pos);
            } else if (event.type === Input.EventType.TOUCH_END) {
                this._axiEnd = new Vec3(pos);
                this.calculateSelected();
            }
        } else {
            this._axiStart = this._axiEnd = null;
            this.line.positions = [];
        }
    }

    private calculateSelected() {
        const axiStart = this._axiStart;
        const axiEnd = this._axiEnd;
        this._selectedPos.clear();
        this._selectedNormal.clear();
        this.line.positions = [];
        if (!axiStart || !axiEnd) {
            return
        }
        // console.log('calculateSelected', axiStart, axiEnd);
        this.slider.progress = 0.5;
        //@ts-ignore
        this.line.positions = [axiStart, axiEnd];
        this._gemotry.positions.forEach((v, i, arr) => {
            if (i % 3 === 0) {
                const target = _temp_v3_1.set(arr[i], arr[i + 1], arr[i + 2]);
                const axi = Vec3.subtract(_temp_v3, axiEnd, axiStart).normalize();
                const targetVector = Vec3.subtract(_temp_v3_2, target, axiStart);
                if (Vec3.cross(_temp_v3_3, axi, targetVector).y > 0) {
                    this._selectedPos.set(i, [arr[i], arr[i + 1], arr[i + 2]]);
                    this._selectedNormal.set(i, [this._gemotry.normals![i], this._gemotry.normals![i + 1], this._gemotry.normals![i + 2]]);
                }
            }
        })
    }

    private rotateMesh(rad: number) {
        const axiStart = this._axiStart;
        const axiEnd = this._axiEnd;
        if (!axiStart || !axiEnd) return

        this._selectedPos.forEach((arr, i) => {
            _temp_v3_1.set(arr[0], arr[0 + 1], arr[0 + 2]);
            this.rotatePos(_temp_v3_1, axiStart, axiEnd, rad);
            this._gemotry.positions[i] = _temp_v3_1.x;
            this._gemotry.positions[i + 1] = _temp_v3_1.y;
            this._gemotry.positions[i + 2] = _temp_v3_1.z;
        })
        this.renderMesh();
    }

    private renderMesh() {
        this.meshRenderer.mesh = utils.createMesh(this._gemotry, this._mesh);
    }

    private rotatePos(target: Vec3, axiStart: Vec3, axiEnd: Vec3, rad: number) {
        const axi = Vec3.subtract(_temp_v3, axiEnd, axiStart).normalize();
        const targetVector = Vec3.subtract(_temp_v3_2, target, axiStart);
        Quat.fromAxisAngle(_temp_quat, axi, rad);
        Vec3.transformQuat(targetVector, targetVector, _temp_quat);
        Vec3.add(target, axiStart, targetVector);
        return target;
    }

    private rotateVector(target: Vec3, axiStart: Vec3, axiEnd: Vec3, rad: number) {
        const axi = Vec3.subtract(_temp_v3, axiEnd, axiStart).normalize();
        Quat.fromAxisAngle(_temp_quat, axi, rad);
        Vec3.transformQuat(target, target, _temp_quat);
        target.y = Math.abs(target.y);
        return target;
    }


    private sliderCallback(slider: Slider, customEventData: string) {
        switch (customEventData) {
            case 'camera': {
                this.cameraCom.node.parent!.eulerAngles = new Vec3(0, 0, slider.progress * 360 - 180);
                break
            }
            default: {
                this.rotateMesh((slider.progress * Math.PI * 2 - Math.PI) * 0.99);
            }
        }
    }
}

