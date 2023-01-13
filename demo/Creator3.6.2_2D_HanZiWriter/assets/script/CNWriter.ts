import { _decorator,Component,Node,EventTouch,Label } from 'cc';
import { CWriter } from './CWriter';
const { ccclass, property } = _decorator;

@ccclass('writeTest')
export default class writeTest extends Component {

    private writerNode !: Node;

    start () {
        this.writerNode = this.node.getChildByName('writer')!;
        this.writerNode.setPosition(200, 450, 0);
    }

    onChangeShowStatusClick (evt : EventTouch) {
        let label = (evt.currentTarget! as Node).getChildByName("Label")!.getComponent(Label)!;
        if (label.string == '隐藏') {
            this.writerNode.active = false;
            label.string = '显示';
        } else if (label.string == '显示') {
            this.writerNode.active = true;
            label.string = '隐藏';
        }
    }

    onChangeLabelClick (evt: EventTouch) {
        this.writerNode.active = true;
        const str = '秦时明月汉时关万里长征人未还但使龙城飞将在不教胡马渡阴山';
        const labelText = str[Math.floor(Math.random() * str.length)];
        this.writerNode.getComponent(Label)!.string = labelText;
        this.writerNode.getComponent(CWriter)!.changeLabel();
    }

    onAnimateClick() {
        this.writerNode.getComponent(CWriter)!.animateCharacter();
	}
}