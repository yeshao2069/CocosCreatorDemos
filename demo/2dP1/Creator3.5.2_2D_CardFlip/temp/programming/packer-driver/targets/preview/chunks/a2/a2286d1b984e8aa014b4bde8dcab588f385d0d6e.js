System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, tween, Vec3, TweenUtil, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c56feN05ThJQKJVb9TcoCoG", "TweenUtil", undefined);

      _export("default", TweenUtil = class TweenUtil {
        /**
        * 水平翻转（卡片翻转）
        * @param node 节点
        * @param duration 总时长
        * @param onMiddle 中间状态回调
        * @param onComplete 完成回调
        */
        static flip(node, duration, round, onMiddle, onComplete) {
          if (round === void 0) {
            round = 1;
          }

          // return new Promise<void>(res => {
          //     const t = tween,
          //     time = duration / 2,
          //     scale = node.scale,
          //     skewY = scale.x > 0 ? 20 : -20;
          //     t(node)
          //         .parallel(
          //             t(node).to(time, { scale: new Vec3(0, scale.y, scale.z) }, { easing: 'quadIn' }),
          //             // t(node).to(time, { skewY: -skewY }, { easing: 'quadOut' }),
          //         )
          //         .call(() => {
          //             onMiddle && onMiddle();
          //         })
          //         .parallel(
          //             t(node).to(time, { scale: new Vec3(-scale.x, scale.y, scale.z) }, { easing: 'quadOut' }),
          //             // t(node).to(time, { skewY: 0 }, { easing: 'quadIn' }),
          //         )
          //         .call(() => {
          //             onComplete && onComplete();
          //             res();
          //         })
          //         .start();
          // });
          return new Promise(res => {
            var time = 1 * round,
                t = tween,
                {
              x,
              z
            } = node.eulerAngles,
                eulerAngles = new Vec3(x, 360 * round, z);
            t(node).by(time, {
              eulerAngles
            }, {
              easing: 'quadOut'
            }).call(res).start();
          });
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a2286d1b984e8aa014b4bde8dcab588f385d0d6e.js.map