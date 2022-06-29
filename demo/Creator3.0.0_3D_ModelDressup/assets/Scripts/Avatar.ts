import { _decorator, 
    Component, 
    Node, 
    Prefab, 
    Texture2D,
    instantiate, 
    find,
    ImageAsset, 
    game, 
    MeshRenderer,
    SkinnedMeshRenderer,
    resources } from 'cc';
import { AvatarBodyparts } from './AvatarBodyparts';
const { ccclass, property } = _decorator;

@ccclass('Avatar')
export class Avatar extends Component {

    private bodyparts: Node[] = [];

    @property({ type: Texture2D })
    public tex!: Texture2D;

    start() {
        this.changeBodypart(AvatarBodyparts.HEAD, '004');
        this.changeBodypart(AvatarBodyparts.BODY, '004');
        this.changeBodypart(AvatarBodyparts.HAND, '004');
        this.changeBodypart(AvatarBodyparts.LEG, '004');
        this.changeBodypart(AvatarBodyparts.WEAPON, '004');

        game.on(AvatarBodyparts.EVENT_CHANGE_PART, <()=>{}>this.changeBodypart, this);
    }

    onDestroy() {
        game.off(AvatarBodyparts.EVENT_CHANGE_PART, this.changeBodypart, this);
    }

    changeBodypart(part: number, suitId: string) {
        let oldPart = this.bodyparts[part];
        if (oldPart) {
            oldPart.removeFromParent();
            oldPart.destroy();
            this.bodyparts[part] = null!;
        }

        let partName = 'ch_pc_hou_' + suitId + '_' + AvatarBodyparts.getPartName(part);
        
        resources.load('Prefabs/' + partName, Prefab, (err, prefab) => {
            let node = instantiate(prefab);
            if (part == AvatarBodyparts.WEAPON) {
                // 武器的初始位置需要调整
                node.setPosition(0.38, 0.63, 0.08);
                node.setRotationFromEuler(-60, 10, 0);
                this.node.addChild(node);
            }
            else {
                this.node.addChild(node);
            }
            this.bodyparts[part] = node;

            let meshNode! : Node;
            if (part == AvatarBodyparts.WEAPON) {
                meshNode = node!;
            } else {
                meshNode = find('RootNode/' + partName, node)!;
            }

            let albedoMapName = AvatarBodyparts.getNameOfBodypart(part, suitId) + '_d';
            resources.load('Textures/' + albedoMapName, ImageAsset, (err, tex: ImageAsset) => {
                if (tex) {
                    if (part == AvatarBodyparts.WEAPON) {
                        meshNode.getComponent(MeshRenderer)!.material!.setProperty('albedoMap', tex._texture);
                    } else {
                        meshNode.getComponent(SkinnedMeshRenderer)!.material!.setProperty('albedoMap', tex._texture);
                    }
                }
            });
        });
    }

    update(deltaTime: number) {
        // Your update function goes here.
        let r = this.node.eulerAngles.clone();
        r.y += deltaTime * 10;
        this.node.eulerAngles = r;
    }
}
