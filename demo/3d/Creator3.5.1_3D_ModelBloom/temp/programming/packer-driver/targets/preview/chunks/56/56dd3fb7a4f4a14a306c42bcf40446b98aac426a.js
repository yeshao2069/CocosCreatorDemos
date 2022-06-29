System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, PPBaseStage, _dec, _class, _crd, ccclass, PPMergeStage;

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
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bd762kAsaFGxonehf4TN/+X", "PPMergeStage", undefined);

      ({
        ccclass
      } = _decorator);

      _export("PPMergeStage", PPMergeStage = (_dec = ccclass('PPMergeStage'), _dec(_class = class PPMergeStage extends (_crd && PPBaseStage === void 0 ? (_reportPossibleCrUseOfPPBaseStage({
        error: Error()
      }), PPBaseStage) : PPBaseStage) {
        constructor() {
          super();
          this._name = "PPMergeStage";
        }

        initWithStageDesc(mgr, pl) {
          this.paramTexs = ['screenTex', 'tempTex'];
          this.outputTexName = '';
          super.initWithStageDesc(mgr, pl);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=56dd3fb7a4f4a14a306c42bcf40446b98aac426a.js.map