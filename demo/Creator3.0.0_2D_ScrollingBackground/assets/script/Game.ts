
import { _decorator, Component, Node, Camera, Sprite, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    // 远景摄像机
    @property(Camera)
    farCamera!: Camera;

    // 近景摄像机
    @property(Camera)
    nearCamera!: Camera;

    @property(Sprite)
    bg01!: Sprite;

    @property(Sprite)
    bg02!: Sprite;

    // 地板
    @property(Sprite)
    nearbg01!: Sprite;

    @property(Sprite)
    nearbg02!: Sprite;


    farCount = 1;
    nearCount = 1;

    farSpeed = 30;
    nearSpeed = 300;

    tempPos1 = new Vec3();
    tempPos2 = new Vec3();

    update(dt: number) {
        // 更新摄像机
        this.updateFarCamera(dt)
        this.updateNearCamera(dt);
    }

    updateFarCamera(dt: number) {
        // this.farCamera.node.x += dt*this.farSpeed;
        
        let farCameraPos = this.farCamera.node.getPosition();
        this.tempPos1.set(farCameraPos.x + dt*this.farSpeed, farCameraPos.y, farCameraPos.z);
        this.farCamera.node.setPosition(this.tempPos1);

        let bg01UITransform = this.bg01.node.getComponent(UITransform);
        let bg02UITransform = this.bg02.node.getComponent(UITransform);
        let bg01ContentSize = bg01UITransform!.contentSize!;
        let bg02ContentSize = bg02UITransform!.contentSize!;

        let bg01Pos = this.bg01.node.getPosition();
        let bg02Pos = this.bg02.node.getPosition();
        
        let yu = this.farCount % 2;
        if (yu == 1) {
            if (farCameraPos.x > this.farCount * bg01ContentSize.width) {
                this.tempPos1.set((this.farCount+1) * bg01ContentSize.width, bg01Pos.y);
                this.bg01.node.setPosition(this.tempPos1);
                this.farCount++;
            }
        } else {
            if (farCameraPos.x > this.farCount * bg02ContentSize.width) {
                this.tempPos1.set((this.farCount+1) * bg02ContentSize.width, bg02Pos.y);
                this.bg02.node.setPosition(this.tempPos1);
                this.farCount++;
            }
        }
    }

    updateNearCamera(dt: number) {
        // this.nearCamera.node.x += dt*this.nearSpeed;

        let nearCameraPos = this.nearCamera.node.getPosition();
        this.tempPos2.set(nearCameraPos.x + dt*this.nearSpeed, nearCameraPos.y, nearCameraPos.z);
        this.nearCamera.node.setPosition(this.tempPos2);

        let nearbg01UITransform = this.nearbg01.getComponent(UITransform)!;
        let nearbg02UITransform = this.nearbg02.getComponent(UITransform)!;
        let nearbg01ContentSize = nearbg01UITransform.contentSize!;
        let nearbg02ContentSize = nearbg02UITransform.contentSize!;

        let nearbg01Pos = this.nearbg01.node.getPosition();
        let nearbg02Pos = this.nearbg02.node.getPosition();

        let yu = this.nearCount % 2;
        if (yu == 1) {
            if (nearCameraPos.x > this.nearCount * nearbg01ContentSize.width) {
                this.tempPos2.set((this.nearCount+1) * nearbg01ContentSize.width, nearbg01Pos.y);
                this.nearbg01.node.setPosition(this.tempPos2);
                this.nearCount++;
            }
        } else {
            if (nearCameraPos.x > this.nearCount * nearbg02ContentSize.width) {
                this.tempPos2.set((this.nearCount+1) * nearbg02ContentSize.width, nearbg02Pos.y);
                this.nearbg02.node.setPosition(this.tempPos2);
                this.nearCount++;
            }
        }
    }
}
