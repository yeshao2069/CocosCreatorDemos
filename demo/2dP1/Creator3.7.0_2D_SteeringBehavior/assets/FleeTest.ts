
import { _decorator, Component, Node, EventTouch, v2, v3, UITransform } from 'cc';
import { SteeredVehicle } from './src/SteeredVehicle';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v3 = v3()

@ccclass('FleeTest')
export class FleeTest extends Component {
    @property(Node)
    target: Node = null!

    @property(SteeredVehicle)
    fleer: SteeredVehicle = null!

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
        this.node.on(Node.EventType.TOUCH_START, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.reset()
    }

    reset() {
        this.fleer.velocity.set(Math.random() * 50 - 25, Math.random() * 50 - 25)
        this.fleer.position.set(Math.random() * 600 - 300, Math.random() * 400 - 200)
    }


    private onTouchEnd(evt: EventTouch) {
        evt.getUILocation(_temp_v2)
        _temp_v3.set(_temp_v2.x, _temp_v2.y, 0)
        this.node.getComponent(UITransform)?.convertToNodeSpaceAR(_temp_v3, _temp_v3)
        this.target.setPosition(_temp_v3)
    }

    update() {
        _temp_v2.set(this.target.position.x, this.target.position.y)
        this.fleer.flee(_temp_v2)
        this.fleer.fixedUpdate()
        this.fleer.bounce({ x: -480, y: -320, width: 960, height: 640 })
    }
}