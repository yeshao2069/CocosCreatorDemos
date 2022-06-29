System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, game;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b1be83bntKDJAjkSAJ4MJe", "game", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("game", game = (_dec = ccclass('game'), _dec(_class = class game extends Component {
        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=619d2a38807038f07e144c9273c87a185a2e7074.js.map