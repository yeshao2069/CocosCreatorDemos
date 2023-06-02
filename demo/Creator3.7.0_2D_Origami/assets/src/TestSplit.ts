
import { v3, Vec3 } from 'cc';
import { _decorator, Component, Node, Vec2, v2, instantiate, EventTouch, UITransform } from 'cc';
import { PolygonSprite } from './PolygonSprite';
import { PolygonUtil } from './PolygonUtil';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v2_2 = v2()
const _temp_v3 = v3()
const _temp_v3_2 = v3()

@ccclass('TestSplit')
export class TestSplit extends Component {
    @property(PolygonSprite)
    prefab_polygon: PolygonSprite = null!


    private _origin_polygons: Vec2[][] = [[]]
    private _origin_uvs: Vec2[][] = [[]]
    private _all_polygonSprites: PolygonSprite[] = []

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.reset()
    }

    private onTouchStart(evt: EventTouch) {
        
    }

    private onTouchEnd(evt: EventTouch) {
        // console.log(evt.type, 'onTouchEnd')
        evt.getUIStartLocation(_temp_v2);
        _temp_v3.set(_temp_v2.x, _temp_v2.y, 0);
        this.node.getComponent(UITransform)?.convertToNodeSpaceAR(_temp_v3, _temp_v3);
        const touchStartPos = _temp_v2.set(_temp_v3.x, _temp_v3.y);
        evt.getUILocation(_temp_v2_2);
        _temp_v3_2.set(_temp_v2_2.x, _temp_v2_2.y, 0);
        this.node.getComponent(UITransform)?.convertToNodeSpaceAR(_temp_v3_2, _temp_v3_2);
        const touchEndPos = _temp_v2_2.set(_temp_v3_2.x, _temp_v3_2.y);
        if (Vec2.squaredDistance(touchStartPos, touchEndPos) < 100) {
            // 触摸距离太小
            return
        }


        const splitPolygons0: Vec2[][] = [], splitPolygons1: Vec2[][] = []
            , splitUvs0: Vec2[][] = [], splitUvs1: Vec2[][] = []
        for (let index = 0; index < this._origin_polygons.length; index++) {
            const { splitUvs, splitPolygons } = PolygonUtil.splitPolygon(touchStartPos, touchEndPos, this._origin_polygons[index], this._origin_uvs[index])
            if (splitPolygons[0].length >= 3) {
                splitPolygons0.push(splitPolygons[0])
                splitUvs0.push(splitUvs[0])
            }
            if (splitPolygons[1].length >= 3) {
                splitPolygons1.unshift(splitPolygons[1])
                splitUvs1.unshift(splitUvs[1])
            }
        }
        const splitUvs = splitUvs0.concat(splitUvs1), splitPolygons = splitPolygons0.concat(splitPolygons1)
        // console.log(splitPolygons, splitUvs)
        this.renderPolygonSprite(splitPolygons, splitUvs)
        if (evt.type === Node.EventType.TOUCH_END) {
            this._origin_polygons = splitPolygons
            this._origin_uvs = splitUvs
        }
    }


    private reset() {
        this._all_polygonSprites.forEach(p => p.node.active = false)
        this._origin_polygons = [[]]
        this._origin_uvs = [[]]
        this.prefab_polygon.vertices.forEach(p => { this._origin_polygons[0].push(p.clone()) })
        this.prefab_polygon.uvs.forEach(p => { this._origin_uvs[0].push(p.clone()) })

        this.renderPolygonSprite(this._origin_polygons, this._origin_uvs)
    }

    private getPolygonSpriteByIndex(index: number) {
        let p = this._all_polygonSprites[index]
        if (!p) {
            const node = instantiate(this.prefab_polygon.node)
            this.node.addChild(node)
            p = node.getComponent(PolygonSprite)!
            this._all_polygonSprites.push(p)
        }
        return p
    }


    private renderPolygonSprite(origin_polygons: Vec2[][], origin_uvs: Vec2[][]) {
        this._all_polygonSprites.forEach(p => p.node.active = false)
        for (let index = 0; index < origin_polygons.length; index++) {
            const polygon = origin_polygons[index];
            const uvs = origin_uvs[index];
            const sprite = this.getPolygonSpriteByIndex(index)
            sprite.vertices = polygon
            sprite.uvs = uvs
            sprite.node.active = true
        }
    }

}


