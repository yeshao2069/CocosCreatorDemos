System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, ClickToShowResPopup, ResourceInfo, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, executionOrder, executeInEditMode, CaseSettings;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfClickToShowResPopup(extras) {
    _reporterNs.report("ClickToShowResPopup", "./ClickToShowResPopup", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceInfo(extras) {
    _reporterNs.report("ResourceInfo", "./ClickToShowResPopup", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      ClickToShowResPopup = _unresolved_2.default;
      ResourceInfo = _unresolved_2.ResourceInfo;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01dcdWgNLxNz6ZURQJg9lu+", "CaseSettings", undefined);

      ({
        ccclass,
        property,
        executionOrder,
        executeInEditMode
      } = _decorator);

      _export("default", CaseSettings = ( // /**
      // * 示例设置
      // */
      _dec = ccclass('CaseSettings'), _dec2 = executionOrder(-1), _dec3 = executeInEditMode(), _dec4 = property(), _dec5 = property({
        displayName: CC_DEV && '标题'
      }), _dec6 = property(), _dec7 = property({
        type: [_crd && ResourceInfo === void 0 ? (_reportPossibleCrUseOfResourceInfo({
          error: Error()
        }), ResourceInfo) : ResourceInfo],
        displayName: CC_DEV && '资源列表'
      }), _dec8 = property({
        displayName: CC_DEV && '启用物理系统'
      }), _dec9 = property({
        visible() {
          return this.enablePhysics;
        },

        displayName: CC_DEV && '启用物理系统调试绘制'
      }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class CaseSettings extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "_title", _descriptor, this);

          _initializerDefineProperty(this, "_resources", _descriptor2, this);

          _initializerDefineProperty(this, "enablePhysics", _descriptor3, this);

          _initializerDefineProperty(this, "enablePhysicsDebugDraw", _descriptor4, this);
        }

        get title() {
          return this._title;
        }

        set title(value) {
          this._title = value;
          this.setTitle(value);
        }

        get resources() {
          return this._resources;
        }

        set resources(value) {
          this._resources = value;
          this.setResources(value);
        }

        // /**
        // * 生命周期：加载
        // */
        onLoad() {
          // // this.setTitle(this.title);
          // // this.setResources(this.resources);
          this.setPhysics(this.enablePhysics);
        } // /**
        // * 设置物理系统
        // * @param enable
        // */


        setPhysics(enable) {
          cc.director.getPhysicsManager().enabled = enable;

          if (enable) {
            if (this.enablePhysicsDebugDraw) {
              cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | // // cc.PhysicsManager.DrawBits.e_pairBit |
              // // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
              cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
            } else {
              cc.director.getPhysicsManager().debugDrawFlags = 0;
            }
          }
        } // /**
        // * 设置标题
        // * @param value
        // */


        setTitle(value) {
          var node = cc.find('Canvas/Main/UI/title/label') || cc.find('Canvas/Main/UI/Title/label'),
              label = node == null ? void 0 : node.getComponent(cc.Label);

          if (label) {
            label.string = value;
          }
        } // /**
        // * 设置资源列表
        // * @param value
        // */


        setResources(value) {
          var node = cc.find('Canvas/Main/UI/title') || cc.find('Canvas/Main/UI/Title'),
              component = node == null ? void 0 : node.getComponent(_crd && ClickToShowResPopup === void 0 ? (_reportPossibleCrUseOfClickToShowResPopup({
            error: Error()
          }), ClickToShowResPopup) : ClickToShowResPopup);

          if (component) {
            var list = component.resources = [];

            for (var i = 0; i < value.length; i++) {
              list[i] = new (_crd && ResourceInfo === void 0 ? (_reportPossibleCrUseOfResourceInfo({
                error: Error()
              }), ResourceInfo) : ResourceInfo)();
              list[i].title = value[i].title;
              list[i].url = value[i].url;
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_title", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '示例';
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "title"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_resources", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "resources", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "resources"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enablePhysics", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enablePhysicsDebugDraw", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2204792af85fcd9eae2686249e9a1143661a6601.js.map