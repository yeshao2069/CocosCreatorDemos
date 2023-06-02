/*
 * @Descripttion: 
 * @version: 
 * @Author: iwae
 * @Date: 2022-07-16 23:01:49
 * @LastEditors: iwae
 * @LastEditTime: 2022-07-16 23:59:21
 */
import { _decorator, Component, Node, LabelComponent } from 'cc';
import { SpAnimator } from './SpAnimator';
const { ccclass, property } = _decorator;

@ccclass('AnimatorTest')
export class AnimatorTest extends Component {

    @property(SpAnimator)
    anm: SpAnimator = null;
    @property(LabelComponent)
    text: LabelComponent = null;

    onEnable(){
        this.showAnmState();

    }

    playAnm(event: Event, customEventData: string) {

        this.anm.Anmimation = Number(customEventData);

        this.showAnmState();

    }

    showAnmState(){
        const duration = Math.floor(this.anm.duration*1000)/1000;
        this.text.string = "Anm:" + this.anm.Anmimation + " Duration:" + duration;

    }


}

