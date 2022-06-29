System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Vec2, PPBaseStage, _dec, _class, _crd, ccclass, PPBlurXStage;

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
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dd5e4TpYtRNlIz/hYcY1CLT", "PPBlurXStage", undefined);

      ({
        ccclass
      } = _decorator);

      _export("PPBlurXStage", PPBlurXStage = (_dec = ccclass('PPBlurXStage'), _dec(_class = class PPBlurXStage extends (_crd && PPBaseStage === void 0 ? (_reportPossibleCrUseOfPPBaseStage({
        error: Error()
      }), PPBaseStage) : PPBaseStage) {
        constructor() {
          super();
          this._name = "PPBlurXStage";
        }

        initWithStageDesc(mgr, pl) {
          this.outputTexName = 'tempTex2';
          var tex = mgr.getFrameBuffer('screenTex');
          var texSize = new Vec2(1, 1);

          if (tex && tex.colorTextures[0]) {
            texSize.x = tex.colorTextures[0].width;
            texSize.y = tex.colorTextures[0].height;
          }

          this.bindShaderParamsTexture(mgr, 'tempTex', 'tempTex');
          this.setOutputFramebuffer(mgr);
          this.bindShaderParamsVec2('texSize', texSize);
          this.bindShaderParamsVec2('direction', new Vec2(1, 0));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f404e72451ab311adaa6683670fcd9fb3423698a.js.map