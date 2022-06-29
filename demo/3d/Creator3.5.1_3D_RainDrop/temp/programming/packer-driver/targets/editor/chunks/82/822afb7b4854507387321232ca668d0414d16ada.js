System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Vec2, PPBaseStage, _dec, _class, _crd, ccclass, PPRaindropStage;

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "./PPBaseStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "./PPMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a30f5Ky4aFNYLyjWMpMJTKr", "PPRaindropStage", undefined);

      ({
        ccclass
      } = _decorator);

      _export("PPRaindropStage", PPRaindropStage = (_dec = ccclass('PPRaindropStage'), _dec(_class = class PPRaindropStage extends (_crd && PPBaseStage === void 0 ? (_reportPossibleCrUseOfPPBaseStage({
        error: Error()
      }), PPBaseStage) : PPBaseStage) {
        constructor() {
          super();
          this._name = "PPRaindropStage";
        }

        initWithStageDesc(mgr, pl) {
          this.paramTexs = ['screenTex'];
          this.outputTexName = '';
          super.initWithStageDesc(mgr, pl);
          const tex = mgr.getFrameBuffer('screenTex');
          const texSize = new Vec2(1, 1);

          if (tex && tex.colorTextures[0]) {
            texSize.x = tex.colorTextures[0].width;
            texSize.y = tex.colorTextures[0].height;
          }

          this.bindShaderParamsVec2('winSize', texSize);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=822afb7b4854507387321232ca668d0414d16ada.js.map