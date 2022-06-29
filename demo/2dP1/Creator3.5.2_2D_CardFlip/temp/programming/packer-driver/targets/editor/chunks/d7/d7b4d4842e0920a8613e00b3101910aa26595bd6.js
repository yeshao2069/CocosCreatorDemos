System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Label, ClickToLoadUrl, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SymbolMap, ResPopupItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfClickToLoadUrl(extras) {
    _reporterNs.report("ClickToLoadUrl", "./ClickToLoadUrl", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      ClickToLoadUrl = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7b337W92WlCu6btwC1TvGOE", "ResPopupItem", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      /**
       * 符号表
       */
      SymbolMap = {
        '': '📦',
        '.ts': '📄',
        '.effect': '🎨'
      };

      _export("default", ResPopupItem = (_dec = ccclass('ResPopupItem'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(_crd && ClickToLoadUrl === void 0 ? (_reportPossibleCrUseOfClickToLoadUrl({
        error: Error()
      }), ClickToLoadUrl) : ClickToLoadUrl), _dec(_class = (_class2 = class ResPopupItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "typeLabel", _descriptor, this);

          _initializerDefineProperty(this, "nameLabel", _descriptor2, this);

          _initializerDefineProperty(this, "clicker", _descriptor3, this);
        }

        /**
         * 设置
         * @param name
         * @param url
         */
        set(name, url) {
          const extname = name.slice(name.lastIndexOf('.'));
          this.typeLabel.string = SymbolMap[extname] || SymbolMap[''];
          this.nameLabel.string = name;
          this.clicker.url = url;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "typeLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clicker", [_dec4], {
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
//# sourceMappingURL=d7b4d4842e0920a8613e00b3101910aa26595bd6.js.map