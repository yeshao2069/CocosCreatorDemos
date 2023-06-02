
import { _decorator, Component, Node, EventTouch, v2, v3, UITransform } from 'cc';
import { SteeredVehicle } from './src/SteeredVehicle';
const { ccclass, property } = _decorator;


@ccclass('PurseAndEvadeTest')
export class PurseAndEvadeTest extends Component {
 

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
        this.airplaneA.pursue(this.airplaneB)
        this.airplaneA.evade(this.airplaneC)

        this.airplaneB.pursue(this.airplaneC)
        this.airplaneB.evade(this.airplaneA)

        this.airplaneC.pursue(this.airplaneA)
        this.airplaneC.evade(this.airplaneB)
        
        this.airplaneA.fixedUpdate()
        this.airplaneB.fixedUpdate()
        this.airplaneC.fixedUpdate()
        this.airplaneA.bounce({ x: -480, y: -320, width: 960, height: 640 })
        this.airplaneB.bounce({ x: -480, y: -320, width: 960, height: 640 })
        this.airplaneC.bounce({ x: -480, y: -320, width: 960, height: 640 })
    }
}