import { _decorator, Component, Label, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnergyCounter')
export class EnergyCounter extends Component {
    @property
    public timeToRecover = 0;
    @property
    public totalCount = 0;
    @property
    public currentCount = 0;
    @property(Label)
    public labelTimer = null;
    @property(Label)
    public labelCount = null;
    @property(ProgressBar)
    public progressBar = null;

    onLoad () {
        this.timer = 0; 
    }

    update (dt: any) {
        let ratio = this.timer/this.timeToRecover; 
        this.progressBar.progress = ratio; 
        if (this.currentCount > this.totalCount) this.currentCount = this.totalCount; 
        let timeLeft = Math.floor(this.timeToRecover - this.timer); 
        this.labelCount.string = this.currentCount + '/' + this.totalCount; 
        this.labelTimer.string = Math.floor(timeLeft/60).toString() + ':' + (timeLeft%60 < 10 ? '0' : '') + timeLeft%60; 
        this.timer += dt; 
        if (this.timer >= this.timeToRecover) { 
            this.timer = 0; 
            this.currentCount++; 
        } 
    }

}