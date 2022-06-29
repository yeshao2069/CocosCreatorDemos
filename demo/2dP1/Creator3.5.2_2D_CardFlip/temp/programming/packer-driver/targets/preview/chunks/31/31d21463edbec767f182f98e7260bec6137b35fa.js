System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, TweenUtil, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c56feN05ThJQKJVb9TcoCoG", "TweenUtil", undefined);

      _export("default", TweenUtil = class TweenUtil {
        // /**
        // * 水平翻转（卡片翻转）
        // * @param node 节点
        // * @param duration 总时长
        // * @param onMiddle 中间状态回调
        // * @param onComplete 完成回调
        // */
        static flip(node, duration, onMiddle, onComplete) {
          return new Promise(res => {
            var tween = cc.tween,
                time = duration / 2,
                scaleX = node.scale,
                skewY = scaleX > 0 ? 20 : -20;
            tween(node).parallel(tween().to(time, {
              scaleX: 0
            }, {
              easing: 'quadIn'
            }), tween().to(time, {
              skewY: -skewY
            }, {
              easing: 'quadOut'
            })).call(() => {
              onMiddle && onMiddle();
            }).parallel(tween().to(time, {
              scaleX: -scaleX
            }, {
              easing: 'quadOut'
            }), tween().to(time, {
              skewY: 0
            }, {
              easing: 'quadIn'
            })).call(() => {
              onComplete && onComplete();
              res();
            }).start();
          });
        }

      });
      /**
       * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
       */
      // /**
      //  * Tween 工具
      //  * @author 陈皮皮 (ifaswind)
      //  * @version 20210320
      //  * @see TweenUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TweenUtil.ts
      //  */
      // export default class TweenUtil {
      // 
      //     /**
      //      * 水平翻转（卡片翻转）
      //      * @param node 节点
      //      * @param duration 总时长
      //      * @param onMiddle 中间状态回调
      //      * @param onComplete 完成回调
      //      */
      //     public static flip(node: cc.Node, duration: number, onMiddle?: Function, onComplete?: Function): Promise<void> {
      //         return new Promise<void>(res => {
      //             const tween = cc.tween,
      //                 time = duration / 2,
      //                 scaleX = node.scale,
      //                 skewY = scaleX > 0 ? 20 : -20;
      //             tween(node)
      //                 .parallel(
      //                     tween().to(time, { scaleX: 0 }, { easing: 'quadIn' }),
      //                     tween().to(time, { skewY: -skewY }, { easing: 'quadOut' }),
      //                 )
      //                 .call(() => {
      //                     onMiddle && onMiddle();
      //                 })
      //                 .parallel(
      //                     tween().to(time, { scaleX: -scaleX }, { easing: 'quadOut' }),
      //                     tween().to(time, { skewY: 0 }, { easing: 'quadIn' }),
      //                 )
      //                 .call(() => {
      //                     onComplete && onComplete();
      //                     res();
      //                 })
      //                 .start();
      //         });
      //     }
      // 
      // }


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=31d21463edbec767f182f98e7260bec6137b35fa.js.map