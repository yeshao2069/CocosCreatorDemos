
import { _decorator, Component, Label, Vec2, Vec3 } from 'cc';
import { CircularMenu } from './CircularMenu';
const { ccclass, property } = _decorator;

@ccclass('CircularItem')
export class CircularItem extends Component {

    @property(Label)
    label !: Label;
    
    isFollow !: boolean;
    index !: number;
    info : any;
    parent !: CircularMenu;
    centerIndex !: number;
    target : Vec2 = new Vec2();
    direction : number = 0;
    speed : number = 5;
    angle !: number;

    show (index: number, info: any, parent: CircularMenu) {
        this.index = index;
        this.parent = parent;
        this.target.set(this.parent.radius, 0);

        this.node.setPosition(this.parent.radius, 0, 0);
        this.refreshItem(info);
    }

    refreshItem (info: any) {
        this.info = info;
        this.label.string = this.info.name;
    }

    onClick () {
        this.angle = 0;
        this.direction = this.getDirection();
        this.parent.onClick(this);
    }

    follow (item: any) {
        this.centerIndex = item.index;

        if (item.index !== this.index) {
            this.angle = (this.index - item.index) * this.parent.interval;
            if (item.direction === 0) {
                this.direction = this.getDirection();
            } else {
                this.direction = item.direction;
            }
        }
        this.speed = 10;
        this.isFollow = true;
    }

    following(dt: number) {
        var scale = Vec3.angle(this.node.position, new Vec3(this.parent.radius, 0, 0)) / 3;
        this.node.setScale(1 - scale, 1 - scale, 1);
        var newOffset = this.angle * scale * 0.5;
        let tmpPos = this.target.clone().rotate(this.angle - newOffset);
        var angle = Vec3.angle(this.node.position, new Vec3(tmpPos.x, tmpPos.y));
        var pos = new Vec2(this.node.position.x, this.node.position.y).rotate(this.direction * angle * this.speed * 0.01);
        this.node.setPosition(pos.x, pos.y);

        if (this.parent.maxItemCount > 1) {
            var bound = 1.5;
            if (this.parent.maxItemCount === 2) {
                bound = 0.5;
            }
            if (this.parent.maxItemCount === 3) {
                bound = 0.9;
            }
            if (this.parent.maxItemCount === 4) {
                bound = 0.9;
            }
            if (this.parent.maxItemCount === 5) {
                bound = 1.3;
            }
            if (this.index === 0) {
                var left = Vec3.angle(this.node.position, new Vec3(this.parent.radius, 0));
                if (left > bound && this.direction === -1) {
                    this.parent.remIndexs(this);
                    this.angle = (this.parent.maxItemCount - this.centerIndex) * this.parent.interval;
                    this.speed += 3;
                }
            }
            if (this.index === this.parent.maxItemCount - 1) {
                var left = Vec3.angle(this.node.position, new Vec3(this.parent.radius, 0, 0));
                if (left > bound && this.direction === 1) {
                    this.parent.addIndexs(this);
                    this.angle = -(this.centerIndex + 1) * this.parent.interval;
                    this.speed += 3;
                }
            }
        }

        if (angle <= 0.01) {
            this.isFollow = false;
            this.parent.onCenter(this.info);
        }
    }

    resetPosScale(newOffset: number) {
        let tmpPos = this.target.clone().rotate(this.angle - newOffset);
        var angle = Vec3.angle(this.node.position, new Vec3(tmpPos.x, tmpPos.y, 0));
        var pos = new Vec2(this.node.position.x, this.node.position.y).rotate(this.direction * angle);
        this.node.setPosition(pos.x, pos.y, 0);
        var scale = Vec3.angle(this.node.position, new Vec3(this.parent.radius, 0, 0)) / 3;
        this.node.setScale(1 - scale, 1 - scale, 1);
    }

    addIndex(item: any) {
        if (this === item) {
            this.index = 0;
            return;
        }
        this.index++;
        this.centerIndex++;
    }
    
    remIndex(item: any) {
        if (this === item) {
            this.index = this.parent.maxItemCount - 1;
            return;
        }
        this.index--;
        this.centerIndex--;
    }

    update(dt: number) {
        if (this.isFollow) {
            this.following(dt);
        }
    }

    getDirection(): number {
        var normalizLocal = new Vec2(this.node.position.x, this.node.position.y).normalize();
        var newOffset = this.angle * this.node.scale.x * 0.5;
        var normalizParent = this.target.clone().rotate(this.angle - newOffset).normalize();
        var dir = normalizLocal.cross(normalizParent);
        if (dir > 0) {
            return 1;
        } else if (dir < 0) {
            return -1;
        }
        return 0;
    }
}