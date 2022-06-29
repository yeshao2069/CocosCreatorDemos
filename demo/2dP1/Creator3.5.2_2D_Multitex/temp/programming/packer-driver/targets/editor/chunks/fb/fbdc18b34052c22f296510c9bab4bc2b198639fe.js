System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, find, _dec, _class, _crd, ccclass, property, game;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      find = _cc.find;
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

        onClick() {}

        updateState() {
          if (this._isON) {
            find('Canvas/');
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fbdc18b34052c22f296510c9bab4bc2b198639fe.js.map