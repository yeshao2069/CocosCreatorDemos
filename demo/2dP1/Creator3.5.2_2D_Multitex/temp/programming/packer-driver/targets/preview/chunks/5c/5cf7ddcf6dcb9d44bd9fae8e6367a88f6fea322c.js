System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Sprite, Component, MTTex, _dec, _class, _crd, ccclass, property, MTSprite;

  function _reportPossibleCrUseOfMTTex(extras) {
    _reporterNs.report("MTTex", "./MTTex", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Sprite = _cc.Sprite;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      MTTex = _unresolved_2.MTTex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "de746r7jz9C+YVEorsdpA4s", "MTSprite", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MTSprite", MTSprite = (_dec = ccclass('MTSprite'), _dec(_class = class MTSprite extends Component {
        start() {
          this.tagAsMTSprite();
        }

        tagAsMTSprite() {
          var sp = this.getComponent(Sprite);

          if (null == sp) {
            return;
          }

          var mtTex = (_crd && MTTex === void 0 ? (_reportPossibleCrUseOfMTTex({
            error: Error()
          }), MTTex) : MTTex).getInstance();

          if (null == mtTex) {
            return;
          }

          sp._isMTSprite = true;
          sp.customMaterial = mtTex.mtMat;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5cf7ddcf6dcb9d44bd9fae8e6367a88f6fea322c.js.map