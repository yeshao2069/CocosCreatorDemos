import { _decorator, Component, Node, RenderTexture, UITransformComponent, Sprite, Camera, view } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('rtAdapter')
@executeInEditMode
export class rtAdapter extends Component {
    @property(RenderTexture)
    protected rt: RenderTexture = null!;
    @property(Camera)
    protected cam: Camera = null!;

    @property({slide:true,step:0.05,min:0.1,max:1.0})
    get setRTscale(){
        return this.rtScale;
    }
    set setRTscale(v){
        if(this._isSetting) return
         this.rtScale=v;
         this.resetRT();
    }

    private rtScale:number=0.5;

    private _isSetting = false;



    onEnable() {

        this.resetRT();
 
    }

    resetRT(){
        this._isSetting=true;
       /* in Editor, somehow we have to clear the target first */
       EDITOR && (this.cam.targetTexture = null);
       this.scheduleOnce(() => {
           /* in Editor we use designed resolution, in run time, we use real content size */
           const size = EDITOR ? view.getDesignResolutionSize() : this.node.getComponent(UITransformComponent).contentSize;
           this.rt.resize(size.width*this.rtScale, size.height*this.rtScale);
           this.cam.targetTexture = this.rt;
           this._isSetting=false;

       })

    }


}

