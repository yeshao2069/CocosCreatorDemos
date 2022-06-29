
import { _decorator, Component, Node, SkeletalAnimation, SkeletalAnimationState, AnimationState, AnimationComponent, Vec3, Quat, instantiate, quat, Prefab, MeshRenderer, SkinnedMeshRenderer, Mesh, NodePool, tween, Material, Color, profiler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RemnantShadow')
export class RemnantShadow extends Component {
    @property(Node)
    rootNode: Node = null!;

    @property(Node)
    copyNodes: Node = null!;

    @property(Prefab)
    copyNode: Prefab = null!;

    private _rootSkeAni: SkeletalAnimation;
    private _rootSkeAniState: AnimationState;
    private _timeInterval: number = 0.3;
    private _SkeAniNodePool: NodePool;

    onLoad () {
        this._rootSkeAni = this.rootNode.getComponent(SkeletalAnimation);
        this._SkeAniNodePool = new NodePool("skeAni");
        this.initListener();
    }

    start () {
        profiler.showStats();
        this._rootSkeAniState = this._rootSkeAni.getState("Take 001");
    }

    initListener () {
        this._rootSkeAni.on(AnimationComponent.EventType.PLAY, this.onPlay.bind(this));
        this._rootSkeAni.on(AnimationComponent.EventType.LASTFRAME, this.onLastFrame.bind(this));
        this._rootSkeAni.on(AnimationComponent.EventType.STOP, this.onPauseOrStop.bind(this));
        this._rootSkeAni.on(AnimationComponent.EventType.PAUSE,this.onPauseOrStop.bind(this));
    }

    onPlay () {
        console.log("this._rootSkeAni is playing");
        this.schedule(this.createSkeAniNodeByTime.bind(this, this.copyNode), this._timeInterval);
    }

    onLastFrame () {
        console.log("skeletalAnimation lastFrame");
    }

    onPauseOrStop () {
        console.log("skeletalAnimation pause or stop");
    }

    createSkeAniNodeByTime (copyNode: Prefab) {
        var newNode = this._SkeAniNodePool.get() || instantiate(copyNode);
        
        this.copyNodes.addChild(newNode);
        console.log("created skeAni node");

        var time = this._rootSkeAniState.current;
        newNode.getComponent(SkeletalAnimation).getState("Take 001").playbackRange = {
            min: time,
            max: time + 0.001
        };
        newNode.getComponent(SkeletalAnimation).getState("Take 001").play();
        setTimeout(()=>{
            newNode.getComponent(SkeletalAnimation).getState("Take 001").stop();
        })

        for (let [key, value] of newNode.getComponent(SkeletalAnimation).getUsers().entries()) {
            var color = new Color(27,26,26,155);
            var fadeTo = tween(color);
            fadeTo.to(1.5, {a: 0}, {onUpdate: ()=>{
                var newMat = new Material();
                newMat.copy(value.material);
                newMat.setProperty("mainColor", color);
                value.material = newMat;
            }, onComplete: ()=>{
                this._SkeAniNodePool.put(newNode);
            }}).start();
        }
    }
}
