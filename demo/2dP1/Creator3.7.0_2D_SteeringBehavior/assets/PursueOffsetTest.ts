
import { _decorator, Component, Node, EventTouch, v2, v3, UITransform, instantiate, ToggleContainer } from 'cc';
import { SteeredVehicle } from './src/SteeredVehicle';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v3 = v3()

@ccclass('PursueOffsetTest')
export class PursueOffsetTest extends Component {
    @property(Node)
    target: Node = null!

    @property(SteeredVehicle)
    header: SteeredVehicle = null!

    @property(ToggleContainer)
    toggleContainerPursueType: ToggleContainer = null!

    vehicleList: SteeredVehicle[] = []

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

        for (let index = 0; index < 9; index++) {
            const item = instantiate(this.header.node)
            this.header.node.parent?.addChild(item)
            this.vehicleList.push(item.getComponent(SteeredVehicle)!)
        }
        this.header.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1)
        this.header.position.set(Math.random() * 600 - 300, Math.random() * 600 - 300)
        this.vehicleList.forEach(f => {
            f.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1)
            f.position.set(Math.random() * 600 - 300, Math.random() * 400 - 200)
        })
    }


    private onTouchEnd(evt: EventTouch) {
        evt.getUILocation(_temp_v2)
        _temp_v3.set(_temp_v2.x, _temp_v2.y, 0)
        this.node.getComponent(UITransform)?.convertToNodeSpaceAR(_temp_v3, _temp_v3)
        this.target.setPosition(_temp_v3)
    }

    private getPurseType() {
        for (let index = 0; index < this.toggleContainerPursueType.toggleItems.length; index++) {
            const toggle = this.toggleContainerPursueType.toggleItems[index];
            if (toggle?.isChecked) {
                return index
            }
        }
        return 0
    }

    private _dt: number = 0
    update(dt: number) {
        this._dt += dt;
        _temp_v2.set(this.target.position.x, this.target.position.y)
        this.header.arrive(_temp_v2)
        this.header.fixedUpdate()

        let curMaxIndex = 2
        let curIndex = 0
        const purseType = this.getPurseType()
        for (let index = 0; index < this.vehicleList.length; index++) {
            const f = this.vehicleList[index];
            switch (purseType) {
                case 0: {
                    f.pursueOffset(this.header, v2(0, -50).multiplyScalar(index + 1))
                    break
                }
                case 1: {
                    if (curIndex >= curMaxIndex) {
                        curIndex = 0
                        curMaxIndex++
                    }
                    f.pursueOffset(this.header, v2(50 * curIndex - (curMaxIndex / 2 - 0.5) * 50, -50 * (curMaxIndex - 1)))
                    break
                }
                case 2: {
                    const row = Math.floor(index / 2) + 1;
                    const col = index % 2
                    f.pursueOffset(this.header, v2(-50 * (col == 0 ? 1 : -1) * row, -50 * row))
                    break
                }
            }
            f.enforceNonPenetrationConstraint(this.vehicleList)
            f.fixedUpdate()
            // f.bounce({ x: -480, y: -320, width: 960, height: 640 })
            curIndex++
        }

    }
}