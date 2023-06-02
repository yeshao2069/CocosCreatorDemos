
import { _decorator, Component, Node } from 'cc';
import { PoolManager } from './framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Explode
 * DateTime = Sun Dec 05 2021 17:42:54 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = Explode.ts
 * FileBasenameNoExtension = Explode
 * URL = db://assets/script/Explode.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Explode')
export class Explode extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onEnable () {
        this.scheduleOnce(this._putBack, 1);
    }

    private _putBack(){
        PoolManager.instance().putNode(this.node);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}


