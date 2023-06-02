import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('ChargeUI')
export class ChargeUI extends Component {

    init (home: any, parentBtns: any) {
        this.home = home; 
        this.parentBtns = parentBtns; 
    }

    show () {
        this.node.active = true; 
        this.node.emit('fade-in'); 
        this.home.toggleHomeBtns(false); 
        director.getScheduler().pauseTarget(this.parentBtns); 
    }

    hide () {
        this.node.emit('fade-out'); 
        this.home.toggleHomeBtns(true); 
        director.getScheduler().resumeTarget(this.parentBtns); 
    }

}

