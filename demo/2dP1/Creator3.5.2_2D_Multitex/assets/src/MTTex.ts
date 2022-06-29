
import { _decorator, Component, Node, director, Material } from 'cc';
import { MTBatcher2D } from './MTBatcher2D';
const { ccclass, property } = _decorator;
 
@ccclass('MTTex')
export class MTTex extends Component {
    private static gInstance: MTTex | null = null;

    @property(Material)
    mtMat: Material | null = null;

    static getInstance(): MTTex | null {
        return MTTex.gInstance;
    }

    start () {
        if (MTTex.gInstance) {
            console.log('ERROR! MTTex must just exist only one instance.');
        }
        if (director.root) {
            MTBatcher2D .getInstance().hackBatch2d(director.root.batcher2D);
        }
        this.loadTextureBindings();
        MTTex.gInstance = this;
    }

    loadTextureBindings() {
        if (null == this.mtMat) {
            return;
        }
        const pass = this.mtMat?.passes[0];
        const mtTexBindingMap = new Map<string, number>();
        for (let i = 1; i < 8; i++) {
            const name = 'spriteTexture' + i;
            const binding = pass.getBinding(name);
            if (binding >= 0) {
                mtTexBindingMap.set(name, binding);
            }
        }
        MTBatcher2D.getInstance().setTexturesBindingMap(mtTexBindingMap);
    }

}
