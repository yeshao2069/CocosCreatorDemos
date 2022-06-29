System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, PPBaseStage, _dec, _class, _crd, ccclass, PPThresholdStage;

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "../PPBaseStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "../PPMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a11560ce9RI6LixpmF31dGv", "PPThresholdStage", undefined);

      ({
        ccclass
      } = _decorator);

      _export("PPThresholdStage", PPThresholdStage = (_dec = ccclass('PPThresholdStage'), _dec(_class = class PPThresholdStage extends (_crd && PPBaseStage === void 0 ? (_reportPossibleCrUseOfPPBaseStage({
        error: Error()
      }), PPBaseStage) : PPBaseStage) {
        constructor() {
          super();
          this._name = "PPThresholdStage";
        }

        initWithStageDesc(mgr, pl) {
          this.paramTexs = ['screenTex'];
          this.outputTexName = 'tempTex';
          super.initWithStageDesc(mgr, pl);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e111eda0e1b663baa41a8c5b317b8e47b901ec72.js.map