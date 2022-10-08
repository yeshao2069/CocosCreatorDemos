
import { _decorator, Component, director } from 'cc';
import { PopupManager } from './PopupManager';
const { ccclass, property } = _decorator;

@ccclass('LoadScene')
export class LoadScene extends Component {

    start() {
        PopupManager.instance.init();
        director.loadScene('PopupTest');
    }
}

