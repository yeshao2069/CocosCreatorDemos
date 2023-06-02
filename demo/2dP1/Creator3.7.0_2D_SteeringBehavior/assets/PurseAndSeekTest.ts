
import { _decorator, Component, Node, EventTouch, v2, v3, UITransform } from 'cc';
import { SteeredVehicle } from './src/SteeredVehicle';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()

@ccclass('PurseAndSeekTest')
export class PurseAndSeekTest extends Component {
 

    @property(SteeredVehicle)
    airplaneA: SteeredVehicle = null!

    @property(SteeredVehicle)
    airplaneB: SteeredVehicle = null!

    @property(SteeredVehicle)
    airplaneC: SteeredVehicle = null!

    onLoad() {
        console.info(
            `
    欢迎关注微信公众号  白玉无冰 
    
    导航：https://mp.weixin.qq.com/s/Ht0kIbaeBEds_wUeUlu8JQ
    
    █████████████████████████████████████
    █████████████████████████████████████
    ████ ▄▄▄▄▄ █▀█ █▄██▀▄ ▄▄██ ▄▄▄▄▄ ████
    ████ █   █ █▀▀▀█ ▀▄▀▀▀█▄▀█ █   █ ████
    ████ █▄▄▄█ █▀ █▀▀▀ ▀▄▄ ▄ █ █▄▄▄█ ████
    ████▄▄▄▄▄▄▄█▄▀ ▀▄█ ▀▄█▄▀ █▄▄▄▄▄▄▄████
    ████▄▄  ▄▀▄▄ ▄▀▄▀▀▄▄▄ █ █ ▀ ▀▄█▄▀████
    ████▀ ▄  █▄█▀█▄█▀█  ▀▄ █ ▀ ▄▄██▀█████
    ████ ▄▀▄▄▀▄ █▄▄█▄ ▀▄▀ ▀ ▀ ▀▀▀▄ █▀████
    ████▀ ██ ▀▄ ▄██ ▄█▀▄ ██▀ ▀ █▄█▄▀█████
    ████   ▄██▄▀ █▀▄▀▄▀▄▄▄▄ ▀█▀ ▀▀ █▀████
    ████ █▄ █ ▄ █▀ █▀▄█▄▄▄▄▀▄▄█▄▄▄▄▀█████
    ████▄█▄█▄█▄█▀ ▄█▄   ▀▄██ ▄▄▄ ▀   ████
    ████ ▄▄▄▄▄ █▄██ ▄█▀  ▄   █▄█  ▄▀█████
    ████ █   █ █ ▄█▄ ▀  ▀▀██ ▄▄▄▄ ▄▀ ████
    ████ █▄▄▄█ █ ▄▄▀ ▄█▄█▄█▄ ▀▄   ▄ █████
    ████▄▄▄▄▄▄▄█▄██▄▄██▄▄▄█████▄▄█▄██████
    █████████████████████████████████████
    █████████████████████████████████████
    `
        )
    }

    start() {
        this.reset()
    }

    reset() {
        this.airplaneA.velocity.set(Math.random() * 50 - 25, Math.random() * 50 - 25)
        this.airplaneA.position.set(Math.random() * 600 - 300, Math.random() * 400 - 200)

        this.airplaneB.velocity.set(Math.random() * 50 - 25, Math.random() * 50 - 25)
        this.airplaneB.position.set(Math.random() * 600 - 300, Math.random() * 400 - 200)

        this.airplaneC.velocity.set(Math.random() * 50 - 25, Math.random() * 50 - 25)
        this.airplaneC.position.set(Math.random() * 600 - 300, Math.random() * 400 - 200)
    }


 

    update() {
        _temp_v2.set(this.airplaneA.position.x, this.airplaneA.position.y)
        this.airplaneA.wander()
        this.airplaneB.seek(_temp_v2)
        this.airplaneC.pursue(this.airplaneA)
        
        this.airplaneA.fixedUpdate()
        this.airplaneB.fixedUpdate()
        this.airplaneC.fixedUpdate()
        this.airplaneA.wrap({ x: -480, y: -320, width: 960, height: 640 })
        this.airplaneB.wrap({ x: -480, y: -320, width: 960, height: 640 })
        this.airplaneC.wrap({ x: -480, y: -320, width: 960, height: 640 })
    }
}