System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, director, Material, MTBatcher2D, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, MTTex;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMTBatcher2D(extras) {
    _reporterNs.report("MTBatcher2D", "./MTBatcher2D", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      Material = _cc.Material;
    }, function (_unresolved_2) {
      MTBatcher2D = _unresolved_2.MTBatcher2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "14524G0pQtFIZkrMRMbpXxq", "MTTex", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MTTex", MTTex = (_dec = ccclass('MTTex'), _dec2 = property(Material), _dec(_class = (_class2 = (_class3 = class MTTex extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "mtMat", _descriptor, this);
        }

        static getInstance() {
          return MTTex.gInstance;
        }

        start() {
          if (MTTex.gInstance) {
            console.log('ERROR! MTTex must just exist only one instance.');
          }

          if (director.root) {
            (_crd && MTBatcher2D === void 0 ? (_reportPossibleCrUseOfMTBatcher2D({
              error: Error()
            }), MTBatcher2D) : MTBatcher2D).getInstance().hackBatch2d(director.root.batcher2D);
          }

          this.loadTextureBindings();
          MTTex.gInstance = this;
        }

        loadTextureBindings() {
          var _this$mtMat;

          if (null == this.mtMat) {
            return;
          }

          var pass = (_this$mtMat = this.mtMat) == null ? void 0 : _this$mtMat.passes[0];
          var mtTexBindingMap = new Map();

          for (var i = 1; i < 8; i++) {
            var name = 'spriteTexture' + i;
            var binding = pass.getBinding(name);

            if (binding >= 0) {
              mtTexBindingMap.set(name, binding);
            }
          }

          (_crd && MTBatcher2D === void 0 ? (_reportPossibleCrUseOfMTBatcher2D({
            error: Error()
          }), MTBatcher2D) : MTBatcher2D).getInstance().setTexturesBindingMap(mtTexBindingMap);
        }

      }, _class3.gInstance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mtMat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6242a777a8e2c18dc2c6b485cdfaea74dc1d8e79.js.map