import { tween, Vec3, _decorator } from 'cc';
const { ccclass, property } = _decorator;

import CardArrayFlip_FrontCardBase from "./CardArrayFlip_FrontCardBase";

@ccclass('CardArrayFlipFrontCard3D')
export default class CardArrayFlip_FrontCard3D extends CardArrayFlip_FrontCardBase {
    public flipToFront() {
        return new Promise<void>(res => {
        const t = tween,
        duration = 1,
        half = duration / 2;
        t(this.node)
            .to(duration, { scale: new Vec3(1.1, 1.1, 1.1), eulerAngles: new Vec3(0, 0, 0) })
            .start();

        t(this.main)
            .to(half, { eulerAngles: new Vec3(0, -90, 0) })
            .call(() => {
                this.front.active = true;
                this.back.active = false;
            })
            .to(half, { eulerAngles: new Vec3(0, -180, 0) })
            .call(res)
            .start();
        });
    }
    public flipToBack() {
        return new Promise<void>(res => {
        const t = tween,
        duration = 1,
        half = duration / 2;
        t(this.node)
            .to(duration, { scale: new Vec3(0.8, 0.8, 0.8), eulerAngles: new Vec3(10, 0, 0) })
            .start();

        t(this.main)
            .to(half, { eulerAngles: new Vec3(0, -270, 0) })
            .call(() => {
                this.front.active = false;
                this.back.active = true;
            })
            .to(half, { eulerAngles: new Vec3(0, 0, 0) })
            .call(res)
            .start();
        });
    }
}
