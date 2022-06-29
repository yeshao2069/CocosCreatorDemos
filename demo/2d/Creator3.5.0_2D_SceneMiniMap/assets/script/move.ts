
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Move')
export class Move extends Component {

    @property(Node)
    man! : Node;

    @property(Node)
    woman! : Node;

    LIMIT_TOP : number = 260;
    LIMIT_BOTTOM : number = -260;
    LIMIT_LEFT : number = -410;
    LIMIT_RIGHT : number = 410;

    onLoad () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {

    }

    onKeyUp (event: EventKeyboard) {
        let posMan = this.man.getPosition();
        let posWoman = this.woman.getPosition();
        switch(event.keyCode) {
            case macro.KEY.a:
                this.man.setPosition(posMan.x - 10, posMan.y, posMan.z);
                this.fixPosition(this.man, 0);
                break;
            case macro.KEY.d:
                this.man.setPosition(posMan.x + 10, posMan.y, posMan.z);
                this.fixPosition(this.man, 1);
                break;
            case macro.KEY.w:
                this.man.setPosition(posMan.x, posMan.y + 10, posMan.z);
                this.fixPosition(this.man, 2);
                break;
            case macro.KEY.s:
                this.man.setPosition(posMan.x, posMan.y - 10, posMan.z);
                this.fixPosition(this.man, 3);
                break;
            case macro.KEY.left:
                this.woman.setPosition(posWoman.x - 10, posWoman.y, posWoman.z);
                this.fixPosition(this.woman, 0);
                break;
            case macro.KEY.right:
                this.woman.setPosition(posWoman.x + 10, posWoman.y, posWoman.z);
                this.fixPosition(this.woman, 1);
                break;
            case macro.KEY.up:
                this.woman.setPosition(posWoman.x, posWoman.y + 10, posWoman.z);
                this.fixPosition(this.woman, 2);
                break;
            case macro.KEY.down:
                this.woman.setPosition(posWoman.x, posWoman.y - 10, posWoman.z);
                this.fixPosition(this.woman, 3);
                break;
        }
    }

    fixPosition (player: any, direct: number) {
        let pos = player.getPosition();
        switch(direct){
            case 0:
                if (pos.x <= this.LIMIT_LEFT) 
                    pos.x = this.LIMIT_LEFT;
                break;
            case 1:
                if (pos.x >= this.LIMIT_RIGHT) 
                    pos.x = this.LIMIT_RIGHT;
                break;
            case 2:
                if (pos.y >= this.LIMIT_TOP) 
                    pos.y = this.LIMIT_TOP;
                break;
            case 3:
                if (pos.y <= this.LIMIT_BOTTOM) 
                    pos.y = this.LIMIT_BOTTOM;
                break;
        }
        player.setPosition(pos);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */

