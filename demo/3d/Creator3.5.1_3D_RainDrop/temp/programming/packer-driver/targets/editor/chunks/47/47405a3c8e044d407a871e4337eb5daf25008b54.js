System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, profiler, PPMgr, PPRaindropStage, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Raindrop;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPPBaseStage(extras) {
    _reporterNs.report("PPBaseStage", "./PPBaseStage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPMgr(extras) {
    _reporterNs.report("PPMgr", "./PPMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPPRaindropStage(extras) {
    _reporterNs.report("PPRaindropStage", "./PPRaindropStage", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      profiler = _cc.profiler;
    }, function (_unresolved_2) {
      PPMgr = _unresolved_2.PPMgr;
    }, function (_unresolved_3) {
      PPRaindropStage = _unresolved_3.PPRaindropStage;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "66ec8iWATVAJ7KQad7hn5XQ", "raindrop", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Raindrop", Raindrop = (_dec = ccclass('Raindrop'), _dec2 = property(_crd && PPMgr === void 0 ? (_reportPossibleCrUseOfPPMgr({
        error: Error()
      }), PPMgr) : PPMgr), _dec(_class = (_class2 = class Raindrop extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mgr", _descriptor, this);
        }

        start() {
          var _this$mgr, _this$mgr2;

          (_this$mgr = this.mgr) == null ? void 0 : _this$mgr.registerCreateStage(stageDesc => {
            let stage = null;

            if ('PPRaindropStage' == stageDesc.stageName) {
              stage = new (_crd && PPRaindropStage === void 0 ? (_reportPossibleCrUseOfPPRaindropStage({
                error: Error()
              }), PPRaindropStage) : PPRaindropStage)();
            }

            if (stage) {
              stage.mat = stageDesc.mat;
            }

            return stage;
          });
          (_this$mgr2 = this.mgr) == null ? void 0 : _this$mgr2.init();
          profiler.hideStats();
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
//# sourceMappingURL=47405a3c8e044d407a871e4337eb5daf25008b54.js.map