
import { _decorator, Component, Node, Prefab, NodePool, instantiate, Vec2, Vec3, tween, view, Size, size, CCLoader, Toggle, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinFlyToWallet')
export class CoinFlyToWallet extends Component {
    @property(Node)
    startNode !: Node;

    @property(Node)
    endNode !: Node;

    @property(Prefab)
    coinPrefab !: Prefab;

    @property(Toggle)
    isRandomToggle !: Toggle;

    @property(EditBox)
    minNumEditBox !: EditBox;

    @property(EditBox)
    maxNumEditBox !: EditBox;

    @property(EditBox)
    radiusNumEditBox !: EditBox;

    coinPool !: NodePool;
    viewWinSize : Size = new Size();
    startNodeUIPos : Vec3 = new Vec3();
    endNodeUIPos : Vec3 = new Vec3();
    isCoinRandomGenerate : boolean = true;

    onLoad () {
        this.coinPool = new NodePool();
        this.viewWinSize = view.getVisibleSize();

        this.initCoinPool();
        this.isRandomToggle.isChecked = this.isCoinRandomGenerate;

        this.startNode.on(Node.EventType.TOUCH_MOVE, this.onNodeMoveEvent, this);
        this.endNode.on(Node.EventType.TOUCH_MOVE, this.onNodeMoveEvent, this);
    }

    initCoinPool (count : number = 20) : void {
        for (let i = 0; i < count; i++) {
            let coin = instantiate(this.coinPrefab);
            this.coinPool.put(coin);
        }
    }

    playAnim() {
        const minNum = parseInt(this.minNumEditBox.string) || 10;
        const maxNum = parseInt(this.maxNumEditBox.string) || 25;
        const diffNum = maxNum - minNum;
        const radiusNum = parseInt(this.radiusNumEditBox.string) || 130;

        let randomCount = Math.random() * diffNum + minNum;
        let startPos = this.startNode.getPosition();
        let endPos = this.endNode.getPosition();
        this.playCoinFlyAnim(randomCount, startPos, endPos, radiusNum);
    }
    
    playCoinFlyAnim(count: number, stPos: Vec3, edPos: Vec3, r: number = 130) {
        // 确保当前节点池有足够的金币
        const poolSize = this.coinPool.size();
        const reCreateCoinCount = poolSize > count ? 0 : count - poolSize;
        this.initCoinPool(reCreateCoinCount);

        // 生成圆，并且对圆上的点进行排序
        let points = this.getCirclePoints(r, stPos, count);
        let coinNodeList = points.map((pos) => {
            let coin = this.coinPool.get()!;
            coin.setPosition(stPos);
            this.node.addChild(coin);
            // 防止pos因为pos.subtract被更改，使用clone复制
            const tempPos = pos.clone(); 
            return {
                node: coin,
                stPos: stPos,
                mdPos: pos,
                edPos: edPos,
                dis: tempPos.subtract(edPos).length(),
            };
        });

        coinNodeList = coinNodeList.sort((a, b) => {
            if (a.dis - b.dis > 0) return 1;
            if (a.dis - b.dis < 0) return -1;
            return 0;
        });

    // 执行金币落袋的动画
    coinNodeList.forEach((item, idx) => {
        tween(item.node).stop();
        item.node.setPosition(item.stPos);
        tween(item.node)
            .to(0.3, { position: item.mdPos})
            .delay(idx * 0.01)
            .to(0.5, { position: item.edPos})
            .call(()=>{
                this.coinPool.put(item.node!);  
            }).start();
        });
    }

    /**
     * 以某点为圆心，生成圆周上等分点的坐标
     *
     * @param {number} r 半径
     * @param {cc.Vec3} pos 圆心坐标
     * @param {number} count 等分点数量
     * @param {number} [randomScope=80] 等分点的随机波动范围
     * @returns {cc.Vec2[]} 返回等分点坐标
     * 
     */
    getCirclePoints (r: number, pos: Vec3, count: number, randomScope: number = 60): Vec3[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            if (this.isCoinRandomGenerate) {
                points.unshift(new Vec3(x + Math.random() * randomScope, y + Math.random() * randomScope, 0));
            } else {
                points.unshift(new Vec3(x, y, 0));
            }
        }
        return points;
    }

    onNodeMoveEvent (evt: any) {
        let localPos = evt.getUILocation();
        let target = evt.target;
        let setPosX = localPos.x - this.viewWinSize.width / 2;
        let setPosY = localPos.y - this.viewWinSize.height / 2;
        target.setPosition(setPosX, setPosY, 0);
    }

    onToggleEvent (evt: any) {
        this.isCoinRandomGenerate = this.isRandomToggle.isChecked;
    }
}
