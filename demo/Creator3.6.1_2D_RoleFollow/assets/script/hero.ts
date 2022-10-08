import { Component, Vec3, Node, _decorator, game } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export default class Hero extends Component {

    @property
    heroName: string = "刘备";

    paths = []; //移动路径
    @property
    pathLength: number = 30; //路径存储长度
    /**
     * 跟随者使用本英雄移动路径存储中的第N个位置 
     * 12这个值是图块大小32像素除以移动速度4* 3/2得到的一个适合的值
    */
    @property
    pathDiff: number = 12;

    @property (Node)
    followNode: Node

    follow: Hero;

    onLoad() {
        // @ts-ignore
        game.on("HeroMove", this.heroMove, this);
        game.on("HeroMoveStop", this.heroMoveStop, this);

        this.paths.push({
            position: this.node.position,
            dir: new Vec3(1, 1, 1)
        });
    }

    start() {
        if (this.followNode) {
            this.follow = this.followNode.getComponent(Hero);
        }
    }

    heroMove(obj: any) {
        console.log(" hero xxxx =>", obj);

        this.node.setPosition(obj.position);
        this.paths.push(obj);

        // 通知跟随都移动到当前英雄的移动路径中的第n个位置
        if (this.follow) {
            var length = this.paths.length;
            var index = 0;
            if (length >= this.pathDiff) {
                index = length - this.pathDiff;
            }
            this.follow.heroMove(this.paths[index]);
        }

        if (this.paths.length > this.pathLength) {
            this.paths.shift();
        }
    }

    heroMoveStop() {
        if (this.follow) {
            this.follow.heroMoveStop();
        }
    }
}