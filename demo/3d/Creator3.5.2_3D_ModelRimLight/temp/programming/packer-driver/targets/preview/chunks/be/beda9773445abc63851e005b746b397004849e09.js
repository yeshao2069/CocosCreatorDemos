System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, ToggleComponent, SliderComponent, LabelComponent, SpriteComponent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, UILayoutRimLightHUD;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      ToggleComponent = _cc.ToggleComponent;
      SliderComponent = _cc.SliderComponent;
      LabelComponent = _cc.LabelComponent;
      SpriteComponent = _cc.SpriteComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "700e0N9KdNLR4ca9rhmNGl5", "UILayout_RimLight_HUD", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UILayoutRimLightHUD", UILayoutRimLightHUD = (_dec = ccclass('UILayoutRimLightHUD'), _dec2 = property({
        type: ToggleComponent
      }), _dec3 = property({
        type: SliderComponent
      }), _dec4 = property({
        type: SliderComponent
      }), _dec5 = property({
        type: SliderComponent
      }), _dec6 = property({
        type: SliderComponent
      }), _dec7 = property({
        type: LabelComponent
      }), _dec8 = property({
        type: LabelComponent
      }), _dec9 = property({
        type: LabelComponent
      }), _dec10 = property({
        type: LabelComponent
      }), _dec11 = property({
        type: SpriteComponent
      }), _dec(_class = (_class2 = class UILayoutRimLightHUD extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "chkEnabled", _descriptor, this);

          _initializerDefineProperty(this, "R", _descriptor2, this);

          _initializerDefineProperty(this, "G", _descriptor3, this);

          _initializerDefineProperty(this, "B", _descriptor4, this);

          _initializerDefineProperty(this, "A", _descriptor5, this);

          _initializerDefineProperty(this, "ValueR", _descriptor6, this);

          _initializerDefineProperty(this, "ValueG", _descriptor7, this);

          _initializerDefineProperty(this, "ValueB", _descriptor8, this);

          _initializerDefineProperty(this, "ValueA", _descriptor9, this);

          _initializerDefineProperty(this, "colorDisplay", _descriptor10, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "chkEnabled", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "R", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "G", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "B", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "A", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ValueR", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ValueG", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ValueB", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ValueA", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "colorDisplay", [_dec11], {
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
//# sourceMappingURL=beda9773445abc63851e005b746b397004849e09.js.map