import { _decorator, Component, Animation, Button, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SubBtnsUI')
export class SubBtnsUI extends Component {
    @property(Animation)
    public subBtnsAnim = null;
    @property(Button)
    public btnShowSub = null;
    @property(Button)
    public btnHideSub = null;
    @property(Node)
    public btnContainer = null;

    onLoad () {
        this.btnShowSub.node.active = true; 
        this.btnHideSub.node.active = false; 
    }

    showSubBtns () {
        this.btnContainer.active = true; 
        this.subBtnsAnim.play('sub_pop'); 
    }

    hideSubBtns () {
        this.subBtnsAnim.play('sub_fold'); 
    }

    onFinishAnim (finishFold: any) {
        this.btnShowSub.node.active = finishFold; 
        this.btnHideSub.node.active = !finishFold; 
    }

}
