import { _decorator, Component, Node, ScrollView, UITransform, Size, view, Layout, dynamicAtlasManager, Layers, Sprite, SpriteFrame, find, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
dynamicAtlasManager.maxFrameSize = 1024
/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Tue Apr 12 2022 14:49:00 GMT+0800 (中国标准时间)
 * Author = Koei
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('TestDynamic')
export class TestDynamic extends Component {

    start () {
        // [3]
        this.showDebug(true);
    }

    showDebug(isShow:any){
        if(!isShow) return;
        let scNode = new Node('dynamicAtla');
        let scCom = scNode.addComponent(ScrollView);
        let uiTraCom = scNode.getComponent(UITransform);
        uiTraCom?.setContentSize(new Size(view.getVisibleSize().width,view.getVisibleSize().height));
        let content = new Node('content');
        let layout = content.addComponent(Layout);
        content.parent = scNode;
        content.getComponent(UITransform)!.anchorY =1;
        content.getComponent(UITransform)?.setContentSize(new Size(2048,2048));
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
        layout.type = Layout.Type.VERTICAL;
        //@ts-ignore
        let data = dynamicAtlasManager._atlases;
        let length = dynamicAtlasManager.atlasCount;
        scCom.content = content;
        scCom.horizontal = true;
        scCom.vertical = true;
        scNode.layer = Layers.Enum.PROFILER;
        for (let index = 0; index < length; index++) {
            let item = new Node('atlas');
            let sp = item.addComponent(Sprite);
            item.layer = Layers.Enum.PROFILER;
            let sprFra = new SpriteFrame();
            sprFra.texture = data[index]._texture;
            sp.spriteFrame = sprFra;
            content.addChild(item);
        }
        find('Canvas')?.addChild(scNode);
        scNode.setPosition(new Vec3(0,0,0))
    }
}