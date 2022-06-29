System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, tween, TweenUtil, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      tween = _cc.tween;
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
                scaleX = node.scale.x,
                skewY = scaleX > 0 ? 20 : -20;
            t(node).parallel(t().to(time, {
              scaleX: 0
            }, {
              easing: 'quadIn'
            }), t().to(time, {
              skewY: -skewY
            }, {
              easing: 'quadOut'
            })).call(() => {
              onMiddle && onMiddle();
            }).parallel(t().to(time, {
              scaleX: -scaleX
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
//# sourceMappingURL=be9410256bb91250a32a2dbca794ab925c94c7d8.js.map