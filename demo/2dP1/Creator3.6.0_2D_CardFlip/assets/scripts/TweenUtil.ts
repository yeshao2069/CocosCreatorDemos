/**
* Tween 工具
* @author 陈皮皮 (ifaswind)
* @version 20210320
*/

import { _decorator, Node, tween, Vec3 } from 'cc';
export default class TweenUtil {
    /**
    * 水平翻转（卡片翻转）
    * @param node 节点
    * @param duration 总时长
    * @param onMiddle 中间状态回调
    * @param onComplete 完成回调
    */
    public static flip(node: Node, duration: number, round: number = 1, onMiddle?: Function, onComplete?: Function): Promise<void> {
        return new Promise<void>(res => {
            const time = 1 * round,
            t = tween,
            { x, z } = node.eulerAngles,
            eulerAngles = new Vec3(x, 360 * round, z);
            t(node)
                .by(time, { eulerAngles }, { easing: 'quadOut' })
                .call(res)
                .start();
        });
    }
}
