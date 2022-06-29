import { _decorator,
    Component,
    Node,
    find,
    EventHandler,
    EventTouch,
    game, 
    Button} from 'cc';
import { UIMgr } from './UIMgr';

const { ccclass, property } = _decorator;

//按钮事件监听器
@ccclass('ButtonEventAgent')
export class ButtonEventAgent extends Component {
    start() {
        // Your initialization goes here.
    }

    onButtonClicked(evt: EventTouch, customEventData: string) {
        let btn = (evt.target as Node).getComponent(Button);
        let clickEvents = btn!.clickEvents;
        for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];
            
            if (h.customEventData === customEventData) {
                // @ts-ignore
                let cb = h['$cb$'];
                // @ts-ignore
                let target = h['$target$']
                // @ts-ignore
                let args = h['$args$'];
                cb.apply(target, [evt,args]);
            }
        }
    }
}

//自动管理事件，将在UI销毁时自动清理
export class AutoEventHandler {
    private _handlers = [{
        event : "",
        cb: ()=>{},
        target : undefined,
        once : false
    }];
    on(event: string, cb: ()=>{}, target?: any, once?: boolean) {
        let _handler = {
            event: event,
            cb: cb,
            target: target,
            once: once || false
        }
        this._handlers.push(_handler);
        game.on(event, cb, target, once);
    }

    off(event: string, cb: ()=>{}, target?: any, once?: boolean) {
        game.off(event, cb, target);
        for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];
            if (h.event == event && h.cb == cb && h.target == target && h.once == once) {
                this._handlers.splice(i, 1);
                return;
            }
        }
    }

    dispose() {
        for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];
            game.off(h.event, h.cb, h.target);
        }
    }
}

export class UIController extends AutoEventHandler {
    private static _idBase = 1000;

    private static _controllers: UIController[] = [];
    private _controllerId: number = 0;
    private _prefabUrl: string;
    private _layer: number;
    protected node: Node = new Node();
    constructor(prefabUrl: string, layer: number) {
        super();
        this._prefabUrl = prefabUrl;
        this._layer = layer;
        this._controllerId = UIController._idBase++;
        UIController._controllers.push(this);
    }

    public get prefabUrl(): string {
        return this._prefabUrl;
    }

    public get layer(): number {
        return this._layer;
    }

    public getRes(): [] {
        return [];
    }

    public static hideAll(){
        while(this._controllers.length){
            this._controllers[0].hide();
        }
    }

    public setup(node: Node) {
        this.node = node;
        let parent = UIMgr.inst.getLayerNode(this.layer) || find('Canvas');
        parent.addChild(node);
        //结点创建完毕，调用子类的处理函数。
        this.onCreated();
    }

    public hide() {
        this.node.removeFromParent();
        this.node.destroy();
        for (let i = 0; i < UIController._controllers.length; ++i) {
            if (UIController._controllers[i] == this) {
                UIController._controllers.splice(i, 1);
                break;
            }
        }
        this.dispose();
        this.onDispose();
    }

    //添加按钮事件
    onButtonEvent(relativeNodePath: string, cb: Function, target?: any,args?:any) {
        let buttonNode = find(relativeNodePath, this.node);
        if (!buttonNode) {
            return null;
        }

        //添加转发器
        let agent = this.node.getComponent(ButtonEventAgent);
        if (!agent) {
            agent = this.node.addComponent(ButtonEventAgent);
        }

        let btn = buttonNode.getComponent(Button);
        let clickEvents = btn!.clickEvents;
        let handler = new EventHandler();
        handler.target = this.node;
        handler.component = 'ButtonEventAgent';
        handler.handler = 'onButtonClicked';
        handler.customEventData = '' + UIController._idBase++;

        //附加额外信息 供事件转发使用
        // @ts-ignore
        handler['$cb$'] = cb;
        // @ts-ignore
        handler['$target$'] = target;
        // @ts-ignore
        handler['$args$'] = args;

        clickEvents.push(handler);
        btn!.clickEvents = clickEvents;
    }

    //移除按钮事件
    offButtonEvent(node: string | Object, cb: Function, target: any) {
        let buttonNode!: Node;
        if (typeof (node) == 'string') {
            buttonNode = find(node)!;
        }
        else {
            buttonNode = node as Node;
        }
        if (!buttonNode) {
            return;
        }

        //添加转发器
        let agent = this.node.getComponent(ButtonEventAgent);
        if (!agent) {
            return;
        }
        let btn = buttonNode.getComponent(Button);
        if (!btn) {
            return;
        }
        let clickEvents = btn.clickEvents;
        for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];
            // @ts-ignore
            if (h['$cb$'] == cb && h['$target$'] == target) {
                clickEvents.splice(i, 1);
                btn.clickEvents = clickEvents;
                break;
            }
        }
    }

    //子类的所有操作，需要在这个函数之后。
    protected onCreated() { }
    //销毁
    protected onDispose() { }
}