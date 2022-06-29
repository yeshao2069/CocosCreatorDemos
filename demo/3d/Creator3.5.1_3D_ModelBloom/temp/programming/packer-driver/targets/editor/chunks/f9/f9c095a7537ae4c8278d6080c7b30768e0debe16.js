System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _decorator, Vec2, Material, PPBaseStage, _dec, _class, _crd, ccclass, PPBlurYStage;

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
      Vec2 = _cc.Vec2;
      Material = _cc.Material;
    }, function (_unresolved_2) {
      PPBaseStage = _unresolved_2.PPBaseStage;
    }],
    execute: function () {
      _crd = true;
      ({
        ccclass
      } = _decorator);

      _export("PPBlurYStage", PPBlurYStage = (_dec = ccclass('PPBlurYStage'), _dec(_class = class PPBlurYStage extends (_crd && PPBaseStage === void 0 ? (_reportPossibleCrUseOfPPBaseStage({
        error: Error()
      }), PPBaseStage) : PPBaseStage) {
        constructor() {
          super();
          this._name = "PPBlurYStage";
        }

        initWithStageDesc(mgr, pl) {
          this.outputTexName = 'tempTex';
          const originMat = this.mat;

          if (originMat) {
            this.mat = new Material();
            this.mat.copy(originMat);
          }

          const tex = mgr.getFrameBuffer('screenTex');
          const texSize = new Vec2(1, 1);

          if (tex && tex.colorTextures[0]) {
            texSize.x = tex.colorTextures[0].width;
            texSize.y = tex.colorTextures[0].height;
          }

          this.bindShaderParamsTexture(mgr, 'tempTex', 'tempTex2');
          this.setOutputFramebuffer(mgr);
          this.bindShaderParamsVec2('texSize', texSize);
          this.bindShaderParamsVec2('direction', new Vec2(0, 1));
        }

      }) || _class));

      _crd = false;
    }
  };
});
//# sourceMappingURL=f9c095a7537ae4c8278d6080c7b30768e0debe16.js.map