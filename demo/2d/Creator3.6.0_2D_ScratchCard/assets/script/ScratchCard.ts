
import { _decorator, Component, Node, Vec2, Rect, Mask, Label, Graphics, UITransform, Vec3, Color } from 'cc';
const { ccclass, property } = _decorator;
import { Intersection } from './Intersection';
const CALC_RECT_WIDTH = 40;
const CLEAR_LINE_WIDTH = 40;

@ccclass('ScratchCard')
export class ScratchCard extends Component {

    @property(Node)
    maskNode !: Node;

    @property(Node)
    cardNode !: Node;

    @property(Label)
    progress !: Label;

    tempDrawPoints : Vec3[] = [];
    tempPos : Vec3 = new Vec3();
    polygonPointsList: { rect: Rect; isHit: boolean }[] = [];
    calcDebugger: boolean = false; // 辅助开关，开启则会绘制划开涂层所属的小格子

    onLoad () {
        this.reset();
        this.cardNode.on(Node.EventType.TOUCH_START, this.touchStartEvent, this);
        this.cardNode.on(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        this.cardNode.on(Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.cardNode.on(Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }

    beforeDestroy () {
        this.cardNode.off(Node.EventType.TOUCH_START, this.touchStartEvent, this);
        this.cardNode.off(Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        this.cardNode.off(Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.cardNode.off(Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }

    touchStartEvent (evt: any) {
        let cardNodeUITransform = this.cardNode.getComponent(UITransform)!;
        const localPos = evt.getUILocation();
        this.tempPos.set(localPos.x, localPos.y, 0);
        let point = cardNodeUITransform.convertToNodeSpaceAR(this.tempPos);
        this.clearMask(point);
    }

    touchMoveEvent (evt: any) {
        let cardNodeUITransform = this.cardNode.getComponent(UITransform)!;
        const localPos = evt.getUILocation();
        this.tempPos.set(localPos.x, localPos.y, 0);
        let point = cardNodeUITransform.convertToNodeSpaceAR(this.tempPos);
        this.clearMask(point);
    }

    touchEndEvent (evt: any) {
        this.tempDrawPoints = [];
        this.calcProgress();
    }

    reset () {
        this.scheduleOnce(() => {
            let mask: Mask = this.maskNode.getComponent(Mask)!;
            mask.graphics!.clear();

            let _graphics = this.cardNode.getComponent(Graphics);
            _graphics!.clear();
        }, 0.2);
        

        this.tempDrawPoints = [];
        this.polygonPointsList = [];
        this.progress.string = '已经刮开了 0%';
        

        // 生成小格子，用来辅助统计涂层的刮开比例
        let cardNodeContentSize = this.cardNode.getComponent(UITransform)!.contentSize;
        for (let x = 0; x < cardNodeContentSize.width; x += CALC_RECT_WIDTH) {
            for (let y = 0; y < cardNodeContentSize.height; y += CALC_RECT_WIDTH) {
              this.polygonPointsList.push({
                rect: new Rect(x - cardNodeContentSize.width / 2,
                            y - cardNodeContentSize.height / 2,
                            CALC_RECT_WIDTH,
                            CALC_RECT_WIDTH
                        ),
                isHit: false
              });
            }
        }
    }

    clearMask (pos: Vec3) {
        let mask: Mask = this.maskNode.getComponent(Mask)!;
        let stencil = mask.graphics!;
        const len = this.tempDrawPoints.length;
        this.tempDrawPoints.push(pos);

        if (len <= 1) {
            // 只有一个点，用圆来清除涂层
            stencil.circle(pos.x, pos.y, CLEAR_LINE_WIDTH / 2);
            stencil.fill();

            // 记录点所在的格子
            this.polygonPointsList.forEach((item) => {
                if (item.isHit) return;
                const xFlag = pos.x > item.rect.x && pos.x < item.rect.x + item.rect.width;
                const yFlag = pos.y > item.rect.y && pos.y < item.rect.y + item.rect.height;
                if (xFlag && yFlag) item.isHit = true;
            });
        } else {
            // 存在多个点，用线段来清除涂层
            let prevPos = this.tempDrawPoints[len - 2];
            let curPos = this.tempDrawPoints[len - 1];

            stencil.moveTo(prevPos.x, prevPos.y);
            stencil.lineTo(curPos.x, curPos.y);
            stencil.lineWidth = CLEAR_LINE_WIDTH;
            stencil.lineCap = Graphics.LineCap.ROUND;
            stencil.lineJoin = Graphics.LineJoin.ROUND;
            stencil.strokeColor = new Color(255, 255, 255, 255);
            stencil.stroke();

            const prevPosVec2 = new Vec2(prevPos.x, prevPos.y);
            const curPosVec2 = new Vec2(curPos.x, curPos.y);
            // 记录线段经过的格子
            this.polygonPointsList.forEach((item) => {
                item.isHit = item.isHit || Intersection.lineRect(prevPosVec2, curPosVec2, item.rect);
            });
        }
    }

    calcProgress() {
        let hitItemCount = 0;
        let ctx = this.cardNode.getComponent(Graphics)!;
        this.polygonPointsList.forEach((item) => {
          if (!item.isHit) return;
          hitItemCount += 1;
    
          if (!this.calcDebugger) return;
          ctx.rect(item.rect.x, item.rect.y, item.rect.width, item.rect.height);
          ctx.fillColor = new Color(216, 18, 18, 255);
          ctx.fill();
        });
    
        this.progress.string = `已经刮开了 ${Math.ceil((hitItemCount / this.polygonPointsList.length) * 100)}%`;
      }

}