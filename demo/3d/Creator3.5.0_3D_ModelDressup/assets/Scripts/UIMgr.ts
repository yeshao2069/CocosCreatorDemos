import { _decorator,
    Node,
    instantiate,
    find,
    view,
    ResolutionPolicy, 
    resources,
    Widget,
    UITransform,
    Prefab} from 'cc';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;


export enum UILayer{
    SCENE,
    GAME,
    HUD,
    POPUP,
    ALERT,
    NOTICE,
    MASK,
    NUM
}

export class UIMgr {
    private static _inst: UIMgr;
    public static get inst(): UIMgr {
        if (!this._inst) {
            this._inst = new UIMgr();
        }
        return this._inst;
    }

    public resize() {
        //根据屏幕大小决定适配策略
        //想明白原理，请阅读本文 https://blog.csdn.net/qq_36720848/article/details/89742451

        let dr = view.getDesignResolutionSize();
        var s = view.getFrameSize();
        var rw = s.width;
        var rh = s.height;
        var finalW = rw;
        var finalH = rh;
 
        if((rw/rh) > (dr.width / dr.height)){
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            //cvs.fitHeight = true;
            
            //如果更长，则用定高
            finalH = dr.height;
            finalW = finalH * rw/rh;
        }
        else{
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            //cvs.fitWidth = true;
            //如果更短，则用定宽
            finalW = dr.width;
            finalH = rh/rw * finalW;
        }

        view.setDesignResolutionSize(finalW,finalH,ResolutionPolicy.UNKNOWN);
        let cvs = find('Canvas')!.getComponent(UITransform);
        cvs!.node.getComponent(UITransform)!.setContentSize(finalW, finalH);
    }

    public setup(maxLayers:number){
        
        this.resize();
        let canvas = find('Canvas')!.getComponent(UITransform);
        for(let i = 0; i < maxLayers; ++i){
            let layerNode = new Node();
            let uiTransfrom = layerNode.addComponent(UITransform);
            uiTransfrom.width = canvas!.width;
            uiTransfrom.height = canvas!.height;
            
            let widget = layerNode.addComponent(Widget);
            widget.isAlignBottom = true;
            widget.isAlignTop = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;

            widget.left = 0;
            widget.right = 0;
            widget.top = 0;
            widget.bottom = 0;
        }
    }

    public getLayerNode(layerIndex:number):Node{
        let canvas = find('Canvas');
        return canvas!.children[layerIndex];
    }

    public showUI(uiCls: any, cb?: Function,target?:any):any {
        let ui = new uiCls() as UIController;
        if (!ui.prefabUrl) {
            return;
        }
        let resArr = ui.getRes() || [];
        resArr.push(ui.prefabUrl as never);
        resources.load(resArr, () => {
            resources.load(ui.prefabUrl, Prefab, (err, data) => {
                let prefab = data;
                let node = instantiate(prefab);
                ui.setup(node);
            });
        });
        return ui;
    }
}
