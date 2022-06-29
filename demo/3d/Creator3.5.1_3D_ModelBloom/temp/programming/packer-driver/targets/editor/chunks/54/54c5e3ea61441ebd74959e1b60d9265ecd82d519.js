System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, PPMgr, PPThresholdStage, PPBlurXStage, PPBlurYStage, PPMergeStage, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Bloom;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "./PPBaseStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "./PPMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPThresholdStage(extras) {
    _reporterNs.report("PPThresholdStage", "./stage/PPThresholdStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPBlurXStage(extras) {
    _reporterNs.report("PPBlurXStage", "./stage/PPBlurXStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPBlurYStage(extras) {
    _reporterNs.report("PPBlurYStage", "./stage/PPBlurYStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMergeStage(extras) {
    _reporterNs.report("PPMergeStage", "./stage/PPMergeStage", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      PPMgr = _unresolved_2.PPMgr;
    }, function (_unresolved_3) {
      PPThresholdStage = _unresolved_3.PPThresholdStage;
    }, function (_unresolved_4) {
      PPBlurXStage = _unresolved_4.PPBlurXStage;
    }, function (_unresolved_5) {
      PPBlurYStage = _unresolved_5.PPBlurYStage;
    }, function (_unresolved_6) {
      PPMergeStage = _unresolved_6.PPMergeStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c0919p8KXRP8KihVq7JiY9z", "bloom", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Bloom", Bloom = (_dec = ccclass('Bloom'), _dec2 = property(_crd && PPMgr === void 0 ? (_reportPossibleCrUseOfPPMgr({
        error: Error()
      }), PPMgr) : PPMgr), _dec(_class = (_class2 = class Bloom extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mgr", _descriptor, this);
        }

        start() {
          var _this$mgr, _this$mgr2;

          (_this$mgr = this.mgr) == null ? void 0 : _this$mgr.registerCreateStage(stageDesc => {
            let stage = null;

            if ('PPThresholdStage' == stageDesc.stageName) {
              stage = new (_crd && PPThresholdStage === void 0 ? (_reportPossibleCrUseOfPPThresholdStage({
                error: Error()
              }), PPThresholdStage) : PPThresholdStage)();
            } else if ('PPBlurXStage' == stageDesc.stageName) {
              stage = new (_crd && PPBlurXStage === void 0 ? (_reportPossibleCrUseOfPPBlurXStage({
                error: Error()
              }), PPBlurXStage) : PPBlurXStage)();
            } else if ('PPBlurYStage' == stageDesc.stageName) {
              stage = new (_crd && PPBlurYStage === void 0 ? (_reportPossibleCrUseOfPPBlurYStage({
                error: Error()
              }), PPBlurYStage) : PPBlurYStage)();
            } else if ('PPMergeStage' == stageDesc.stageName) {
              stage = new (_crd && PPMergeStage === void 0 ? (_reportPossibleCrUseOfPPMergeStage({
                error: Error()
              }), PPMergeStage) : PPMergeStage)();
            }

            if (stage) {
              stage.mat = stageDesc.mat;
            }

            return stage;
          });
          (_this$mgr2 = this.mgr) == null ? void 0 : _this$mgr2.init();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mgr", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=54c5e3ea61441ebd74959e1b60d9265ecd82d519.js.map