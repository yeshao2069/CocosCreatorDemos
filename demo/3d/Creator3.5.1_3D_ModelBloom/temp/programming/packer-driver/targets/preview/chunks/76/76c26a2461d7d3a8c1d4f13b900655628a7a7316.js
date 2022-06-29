System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _decorator, PPBaseStage, _dec, _class, _crd, ccclass, PPThresholdStage;

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "../../postprocess/PPBaseStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "../../postprocess/PPMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;
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

      _crd = false;
    }
  };
});
//# sourceMappingURL=76c26a2461d7d3a8c1d4f13b900655628a7a7316.js.map