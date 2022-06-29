System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, find, Bloom, _dec, _class, _crd, ccclass, property, game;

  function _reportPossibleCrUseOfBloom(extras) {
    _reporterNs.report("Bloom", "./bloom", _context.meta, extras);
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
      Bloom = _unresolved_2.Bloom;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b1be83bntKDJAjkSAJ4MJe", "game", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("game", game = (_dec = ccclass('game'), _dec(_class = class game extends Component {
        constructor(...args) {
          super(...args);
          this._boomOpen = true;
        }

        onLoad() {
          this.updateState();
        }

        onClick() {
          this._boomOpen = !this._boomOpen;
          this.updateState();
        }

        updateState() {
          let boomSrc = find('Main Camera').getComponent(_crd && Bloom === void 0 ? (_reportPossibleCrUseOfBloom({
            error: Error()
          }), Bloom) : Bloom);
          boomSrc.enabled = this._boomOpen;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3018c207c779da893d0ade003de707b998d74c40.js.map