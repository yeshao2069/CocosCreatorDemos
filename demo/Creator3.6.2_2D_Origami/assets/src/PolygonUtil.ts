import { v2 } from "cc";
import { Vec2, Intersection2D } from "cc";

const Epsilon = 1e-6

const temp_v2_vector = new Vec2()
const temp_v2_vector_2 = new Vec2()
const temp_v2_vector_3 = new Vec2()
const temp_v2_vector_4 = new Vec2()
const temp_v2_pos = new Vec2()
const temp_v2_pos_2 = new Vec2()

export namespace PolygonUtil {
    export function splitPolygon(touchStart: Vec2, touchEnd: Vec2, polygon: Vec2[], uvs: Vec2[]) {
        console.log(touchStart, touchEnd, polygon, uvs)

        if (polygon.length < 3) return { splitPolygons: [], splitUvs: [] }
        Vec2.subtract(temp_v2_vector, touchEnd, touchStart)
        temp_v2_vector.multiplyScalar(0.5)//触摸向量
        Vec2.multiplyScalar(temp_v2_vector_2, temp_v2_vector, 1)
        temp_v2_vector_2.rotate(Math.PI / 2)//垂直向量
        Vec2.add(temp_v2_pos, touchStart, temp_v2_vector) //分割中点
        temp_v2_vector.normalize()
        // if (!Intersection2D.pointInPolygon(temp_v2_pos, polygon)) return [polygon]

        let splitPolygons: Vec2[][] = [[], []];
        let splitUvs: Vec2[][] = [[], []];
        for (let index = 0; index < polygon.length; index++) {
            const pos = polygon[index];
            const pos_next = polygon[(index + 1) % polygon.length];
            const uv = uvs[index];
            const uv_next = uvs[(index + 1) % uvs.length];

            Vec2.subtract(temp_v2_vector_3, pos, temp_v2_pos)
            const dotValue = dumpValue(temp_v2_vector.dot(temp_v2_vector_3))
            Vec2.subtract(temp_v2_vector_3, pos_next, temp_v2_pos)
            const dotValueNext = dumpValue(temp_v2_vector.dot(temp_v2_vector_3))
            Vec2.subtract(temp_v2_vector_3, pos_next, pos)

            if (Math.abs(dotValue) === 0) {
                // 刚好在点上
                splitPolygons[0].push(pos)
                splitPolygons[1].push(pos.clone())
                splitUvs[0].push(uv)
                splitUvs[1].push(uv_next.clone())
            } else if (dotValue > 0) {
                // 在前面
                splitPolygons[0].push(pos)
                splitUvs[0].push(uv)
                if (dotValueNext < 0) {
                    const [t1, t2] = linelinePoint(pos, temp_v2_vector_3, temp_v2_pos, temp_v2_vector_2)
                    temp_v2_pos_2.set(pos.x + temp_v2_vector_3.x * t1, pos.y + temp_v2_vector_3.y * t1)
                    splitPolygons[0].push(temp_v2_pos_2.clone())
                    splitPolygons[1].push(temp_v2_pos_2.clone())
                    Vec2.subtract(temp_v2_vector_3, uv_next, uv)
                    temp_v2_pos_2.set(uv.x + temp_v2_vector_3.x * t1, uv.y + temp_v2_vector_3.y * t1)
                    splitUvs[0].push(temp_v2_pos_2.clone())
                    splitUvs[1].push(temp_v2_pos_2.clone())
                }
            } else {
                // 在后面
                // splitPolygons[1].push(pos)
                Vec2.subtract(temp_v2_vector_4, temp_v2_pos, pos)
                const dotLength = temp_v2_vector_4.dot(temp_v2_vector) * 2
                temp_v2_pos_2.set((pos.x + temp_v2_vector.x * dotLength), pos.y + temp_v2_vector.y * dotLength)
                splitPolygons[1].push(temp_v2_pos_2.clone())

                splitUvs[1].push(uv)
                if (dotValueNext > 0) {
                    const [t1, t2] = linelinePoint(pos, temp_v2_vector_3, temp_v2_pos, temp_v2_vector_2)
                    temp_v2_pos_2.set(pos.x + temp_v2_vector_3.x * t1, pos.y + temp_v2_vector_3.y * t1)
                    splitPolygons[0].push(temp_v2_pos_2.clone())
                    splitPolygons[1].push(temp_v2_pos_2.clone())
                    Vec2.subtract(temp_v2_vector_3, uv_next, uv)
                    temp_v2_pos_2.set(uv.x + temp_v2_vector_3.x * t1, uv.y + temp_v2_vector_3.y * t1)
                    splitUvs[0].push(temp_v2_pos_2.clone())
                    splitUvs[1].push(temp_v2_pos_2.clone())
                }
            }
        }

        // if (splitPolygons.length < 3) splitPolygons.length = 0
        // if (splitUvs.length < 3) splitUvs.length = 0
        return { splitPolygons, splitUvs }
    }



    function dumpValue(value: number): number {
        if (Math.abs(value) < Epsilon) {
            return 0;
        } else if (value > 0) {
            return 1;
        } else {
            return -1;
        }
    }

    function linelinePoint(p1: Vec2, p1Dir: Vec2, p2: Vec2, p2Dir: Vec2) {
        const a1 = p1Dir.x, b1 = -p2Dir.x, c1 = p2.x - p1.x
        const a2 = p1Dir.y, b2 = -p2Dir.y, c2 = p2.y - p1.y
        const d = a1 * b2 - a2 * b1,
            d1 = c1 * b2 - c2 * b1,
            d2 = a1 * c2 - c1 * a2
        const t1 = d1 / d, t2 = d2 / d
        return [t1, t2]
    }
}