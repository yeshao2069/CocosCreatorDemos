System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, find, MTSprite, _dec, _class, _crd, ccclass, property, game;

  function _reportPossibleCrUseOfMTSprite(extras) {
    _reporterNs.report("MTSprite", "./MTSprite", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      find = _cc.find;
    }, function (_unresolved_2) {
      MTSprite = _unresolved_2.MTSprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cbf06QGTzVEsYfBglaoaiND", "game", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("game", game = (_dec = ccclass('game'), _dec(_class = class game extends Component {
        constructor(...args) {
          super(...args);
          this._isON = true;
        }

        onLoad() {
          this.updateState();
        }

        onClick() {
          this._isON = !this._isON;
          this.updateState();
        }

        updateState() {
          let uinode = find('Canvas/ui');

          if (this._isON) {
            uinode.children.forEach(node => {
              node.getComponent(_crd && MTSprite === void 0 ? (_reportPossibleCrUseOfMTSprite({
                error: Error()
              }), MTSprite) : MTSprite).tagAsMTSprite();
            });
          } else {
            uinode.children.forEach(node => {
              node.getComponent(_crd && MTSprite === void 0 ? (_reportPossibleCrUseOfMTSprite({
                error: Error()
              }), MTSprite) : MTSprite).tagAsDefaultSprite();
            });
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=203d00a0ed6220e4d7a2d50d16b20fd7ea9fe441.js.map