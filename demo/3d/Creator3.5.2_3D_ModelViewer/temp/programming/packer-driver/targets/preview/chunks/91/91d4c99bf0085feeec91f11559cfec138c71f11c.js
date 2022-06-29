System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Toggle, Button, Label, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, UILayout_ModelViewer_HUD;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Toggle = _cc.Toggle;
      Button = _cc.Button;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "40e5c1bbzxGPKijWxUoObvG", "UILayout_ModelViewer_HUD", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UILayout_ModelViewer_HUD", UILayout_ModelViewer_HUD = (_dec = ccclass('UILayout_ModelViewer_HUD'), _dec2 = property({
        type: Toggle
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: Button
      }), _dec5 = property({
        type: Label
      }), _dec(_class = (_class2 = class UILayout_ModelViewer_HUD extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "animLoop", _descriptor, this);

          _initializerDefineProperty(this, "btnPrev", _descriptor2, this);

          _initializerDefineProperty(this, "btnNext", _descriptor3, this);

          _initializerDefineProperty(this, "txtCurAnim", _descriptor4, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animLoop", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnPrev", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnNext", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "txtCurAnim", [_dec5], {
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
//# sourceMappingURL=91d4c99bf0085feeec91f11559cfec138c71f11c.js.map