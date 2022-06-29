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
            const tween = tween,
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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8f7c3489f57f670dce09c3c9a914b9ef3b5b2feb.js.map