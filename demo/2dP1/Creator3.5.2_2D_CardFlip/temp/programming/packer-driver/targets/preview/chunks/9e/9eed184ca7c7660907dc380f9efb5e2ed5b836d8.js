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
        static flip(node, duration, onMiddle, onComplete) {
          return new Promise(res => {
            var t = tween,
                time = duration / 2,
                scale = node.scale,
                skewY = scale.x > 0 ? 20 : -20;
            t(node).parallel(t(node).to(time, {
              scale: new Vec3(0, scale.y, scale.z)
            }, {
              easing: 'quadIn'
            }) // t(node).to(time, { skewY: -skewY }, { easing: 'quadOut' }),
            ).call(() => {
              onMiddle && onMiddle();
            }).parallel(t(node).to(time, {
              scale: new Vec3(-scale.x, scale.y, scale.z)
            }, {
              easing: 'quadOut'
            }) // t(node).to(time, { skewY: 0 }, { easing: 'quadIn' }),
            ).call(() => {
              onComplete && onComplete();
              res();
            }).start();
          });
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9eed184ca7c7660907dc380f9efb5e2ed5b836d8.js.map