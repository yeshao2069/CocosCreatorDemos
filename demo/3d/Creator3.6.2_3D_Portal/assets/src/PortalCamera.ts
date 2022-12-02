
import { _decorator, Component, Node, Vec3, v3, RenderTexture, Camera, Material, MeshRenderer } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('PortalCamera')
export class PortalCamera extends Component {
    @property(MeshRenderer)
    model: MeshRenderer = null;
    // @property(Node)
    // fromDoor:Node = null;
    @property(Node)
    mainCamera:Node = null;
    start () {
        
        if (this.model) {
            const renderTex = new RenderTexture();
            renderTex.reset({
                width: 512 * 2.25,
                height: 512 * 1.5
            });
            const cameraComp = this.getComponent(Camera);
            cameraComp.targetTexture = renderTex;
            const pass = this.model.material.passes[0];
            const defines = { SAMPLE_FROM_RT: true, ...pass.defines };
            const renderMat = new Material();
            renderMat.initialize({
                effectAsset: this.model.material.effectAsset,
                defines,
            });
            this.model.setMaterial(renderMat, 0);
            renderMat.setProperty('mainTexture', renderTex, 0);
        }

        this.offset = this.node.worldPosition.clone().subtract(this.mainCamera.position);
    }
    private vec3 = v3();
    private offset:Vec3 = null;

    update(dt:number){
        // Vec3.subtract(this.vec3, this.mainCamera.worldPosition, this.fromDoor.worldPosition);
        Vec3.add(this.vec3,this.mainCamera.worldPosition, this.offset);

        this.node.setPosition(this.vec3);
        this.node.setRotation(this.mainCamera.worldRotation);
    }
}
