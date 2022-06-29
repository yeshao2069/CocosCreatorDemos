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
            const t = tween,
                  time = duration / 2,
                  scale = node.scale,
                  scaleX = scale.x,
                  skewY = scaleX > 0 ? 20 : -20;
            t(node).parallel(t().to(time, {
              scale: new Vec3(0, scale.y, scale.z)
            }, {
              easing: 'quadIn'
            }), t().to(time, {
              skewY: -skewY
            }, {
              easing: 'quadOut'
            })).call(() => {
              onMiddle && onMiddle();
            }).parallel(t().to(time, {
              scale: new Vec3(-scale.x, scale.y, scale.z)
            }, {
              easing: 'quadOut'
            }), t().to(time, {
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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e21d05d47a3df6cf899d9f31f07f302be99f21fb.js.map