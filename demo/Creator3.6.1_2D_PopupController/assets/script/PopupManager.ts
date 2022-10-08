import { Canvas, director, game, instantiate, Layers, Node, Prefab, UITransform, Vec3, view } from "cc";
import { CCUtil } from "./CCUtil";
import { PopupBase } from "./PopupBase";

export class PopupManager {

    private static _instance: PopupManager;
    public static get instance() {
        if (null == this._instance) {
            this._instance = new PopupManager();
        }
        return this._instance;
    }

    private popupNode: Node | null = null;
    private blockInputNode: Node | null = null;
    private popups: Array<string>;
    private nodes: Map<string, Node>;
    private paths: Map<string, string>;
    private popupInit: boolean = false;

    private constructor() {
        this.popups = new Array();
        this.nodes = new Map();
        this.paths = new Map();
    }

    init() {
        this.setParent();
    }

    preLoad(option: { name?: string, prefab?: Prefab, url?: string }) {
        let name = option.name || option.prefab?.data._name || this.getNameByPath(option.url);
        if (null != name && null != this.nodes.get(name)) {
            console.warn(`${name}已经预加载了`);
            return;
        }
        if (null != option.prefab) {
            let node = instantiate(option.prefab);
            this.nodes.set(name, node);
            return;
        }
        if (null != option.url) {
            CCUtil.load({
                paths: option.url,
                type: Prefab,
                onComplete: (err: Error | null, prefab: Prefab) => {
                    if (err) {
                        console.error(`${option.url}加载失败`);
                        return;
                    }
                    this.setNameByPath(option.url!, prefab.data._name);
                    if (null == name) {
                        name = prefab.data._name;
                    }
                    let node = instantiate(prefab);
                    this.nodes.set(name, node);
                }
            });
        }
    }

    show(option: { name?: string, prefab?: Prefab, path?: string, priority?: number, params?: any, keep?: boolean }) {
        if (!this.popupInit) {
            throw new Error('请先初始化UIManager');
        }
        // 如果需要一个prefab对应两个弹框，则名字需要自行定义
        let name = option.name || option.prefab?.data._name || this.getNameByPath(option.path);
        if (null == name && null == option.path) {
            throw new Error('name、prefab、path不同同时为空');
        }
        // TODO 弹框过程中，背景不可以点击
        // this.blockInputNode!.active = true;
        let priority = option.priority || 0;
        let node: Node | undefined;
        if (null != name) {
            node = this.nodes.get(name);
        }
        if (null == node) {
            if (null == option.prefab) {
                if (null == option.path) {
                    throw new Error('首次创建必须传入prefab或者path');
                }
                CCUtil.load({
                    paths: option.path,
                    type: Prefab,
                    onComplete: (err: Error | null, prefab: Prefab) => {
                        if (err) {
                            console.error(`${option.path}加载失败`);
                            return;
                        }
                        this.setNameByPath(option.path!, prefab.data._name);
                        if (null == name) {
                            name = prefab.data._name;
                        }
                        node = instantiate(prefab);
                        this.nodes.set(name, node);
                        this._show(name, node, priority, option.params, option.keep || false);
                    }
                });
                return;
            }
            node = instantiate(option.prefab);
            this.nodes.set(name, node);
            this._show(name, node, priority, option.params, option.keep || false);
        } else {
            this._show(name, node, priority, option.params, option.keep || false);
        }
    }

    private _show(name: string, node: Node, priority: number, params: any, keep: boolean) {
        // 层级高的优先显示
        let curPriority = this.getCurrentPopup()?.getComponent(UITransform)?.priority || 0;
        if (priority < curPriority) {
            node.active = false;
            for (let i = 0; i <= this.popups.length - 1; i++) {
                let tempNode = this.nodes.get(this.popups[i]);
                if (priority <= (tempNode!.getComponent(UITransform)?.priority || 0)) {
                    this.popups.splice(i, 0, name);
                    break;
                }
            }
        } else if (!keep) {
            this._hideAll();
            let idx = this.popups.indexOf(name);
            if (idx >= 0) {
                this.popups.splice(idx, 1);
            }
            this.popups.push(name);
        }
        let popup = node.getComponent(PopupBase);
        if (null == popup) {
            throw new Error('请将Popup继承PopupBase');
        }
        popup._init(name, params);
        if (node.parent != this.popupNode) {
            node.removeFromParent();
            node.parent = this.popupNode;
        }
        let uiTransform = node.getComponent(UITransform);
        if (null == uiTransform) {
            uiTransform = node.addComponent(UITransform);
        }
        if (uiTransform.priority != priority) {
            uiTransform.priority = priority;
        }
        if (priority >= curPriority) {
            popup!._show();
        }
    }

    private showLast() {
        let node: Node | null = null;
        if (this.popups.length > 0) {
            let name = this.popups[this.popups.length - 1];
            node = this.nodes.get(name) || null;
        }
        if (null == node) {
            // this.blockInputNode!.active = false;
            return;
        }
        if (!node.active) {
            let ui = node.getComponent(PopupBase)!;
            ui._show();
        }
    }

    hide(name: string) {
        let idx = this.popups.indexOf(name);
        let isLast = idx === this.popups.length - 1;
        if (idx >= 0) {
            this.popups.splice(idx, 1);
        }
        this._hideUI(name);
        if (isLast) {
            this.showLast();
        }
    }

    hideAll() {
        this._hideAll();
        this.popups.length = 0;
    }

    _hideAll() {
        for (let i = 0; i < this.popups.length; i++) {
            this._hideUI(this.popups[i]);
        }
        // this.blockInputNode!.active = false;
    }

    private _hideUI(name: string) {
        let node = this.nodes.get(name);
        if (null == node) {
            console.warn(`${name}已被销毁`);
            return;
        }
        let ui = node.getComponent(PopupBase);
        ui!._hide();
    }

    remove(name: string) {
        this.hide(name);
        let node = this.nodes.get(name);
        if (null == node) {
            return;
        }
        this.nodes.delete(name);
        let ui = node.getComponent(PopupBase);
        ui!._remove();
    }

    removeAll() {
        this.hideAll();
        for (let name in this.nodes) {
            this.remove(name);
        }
        // this.blockInputNode!.active = false;
    }

    getCurrentPopup() {
        let name = this.getCurrentName();
        if (null == name) {
            return null;
        }
        return this.nodes.get(name);
    }

    getCurrentName(): string | null {
        if (this.popups.length > 0) {
            return this.popups[this.popups.length - 1];
        }
        return null;
    }

    getPopup(name: string): Node | null {
        return this.nodes.get(name) || null;
    }

    private setNameByPath(path: string, name: string) {
        if (null == this.getNameByPath(path)) {
            this.paths.set(path, name);
        }
    }

    private getNameByPath(path: string | null | undefined): string | null | undefined {
        if (null == path) {
            return null;
        }
        return this.paths.get(path);
    }


    private setParent() {
        if (this.popupInit) {
            throw new Error('PopupManager已经初始化了');
        }
        this.popupNode = new Node('Popup');
        this.popupNode.layer = Layers.Enum.UI_2D;
        this.popupNode.addComponent(Canvas);
        director.getScene()?.addChild(this.popupNode);
        game.addPersistRootNode(this.popupNode);
        let size = view.getVisibleSize();
        let transform = this.popupNode.addComponent(UITransform);
        transform.priority = 99;
        transform.contentSize = size;
        // TODO widget无效
        // let widget = this.uiNode.addComponent(Widget);
        // widget.top = 0;
        // widget.bottom = 0;
        // widget.left = 0;
        // widget.right = 0;
        // widget.updateAlignment();
        // console.log(uiTransform.width, uiTransform.height);
        this.popupNode.position = new Vec3(size.width / 2, size.height / 2, 0);
        this.popupInit = true;

        // TODO 实现弹框过程中，背景不可以点击
        // this.blockInputNode = new Node('blockInputNode');
        // this.blockInputNode.parent = this.popupNode;
        // let blockInputTransform = this.blockInputNode.addComponent(UITransform);
        // blockInputTransform.contentSize = size;
        // blockInputTransform.priority = -1;
        // this.blockInputNode!.active = false;
    }
}

