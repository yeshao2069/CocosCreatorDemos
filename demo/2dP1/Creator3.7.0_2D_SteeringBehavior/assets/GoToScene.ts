import { Component, _decorator, Node, director } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class GoToScene extends Component {

    @property
    sceneName: string = 'test';

    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.gotoScene, this);
    }

    gotoScene() {
        director.loadScene(this.sceneName);
    }

}
