System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, PopupManager, ResPopup, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _class4, _descriptor3, _crd, ccclass, property, ResourceInfo, ClickToShowResPopup;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "../../../eazax-ccore/PopupManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResPopup(extras) {
    _reporterNs.report("ResPopup", "./popups/resPopup/ResPopup", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResPopupOptions(extras) {
    _reporterNs.report("ResPopupOptions", "./popups/resPopup/ResPopup", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      PopupManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      ResPopup = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4eefcThCNNIv7Hni6oMtecW", "ClickToShowResPopup", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      // /**
      // * 点击展示资源弹窗
      // */
      _export("ResourceInfo", ResourceInfo = (_dec = ccclass('ClickToShowResPopup'), _dec2 = property({
        displayName: CC_DEV && '标题'
      }), _dec3 = property({
        multiline: true,
        displayName: CC_DEV && '地址'
      }), _dec(_class = (_class2 = class ResourceInfo {
        constructor() {
          _initializerDefineProperty(this, "title", _descriptor, this);

          _initializerDefineProperty(this, "url", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "url", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      })), _class2)) || _class));

      _export("default", ClickToShowResPopup = (_dec4 = property({
        type: [ResourceInfo],
        displayName: CC_DEV && '资源列表'
      }), (_class4 = class ClickToShowResPopup extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "resources", _descriptor3, this);
        }

        // /**
        // * 生命周期：加载
        // */
        onLoad() {
          this.registerEvent();
        } // /**
        // * 生命周期：销毁
        // */


        onDestroy() {
          this.unregisterEvent();
        } // /**
        // * 注册事件
        // */


        registerEvent() {
          this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        } // /**
        // * 反注册事件
        // */


        unregisterEvent() {
          this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
        } // /**
        // * 点击回调
        // */


        onClick() {
          const options = {
            items: []
          },
                resources = this.resources;

          for (let i = 0, l = resources.length; i < l; i++) {
            options.items.push({
              name: resources[i].title,
              url: resources[i].url
            });
          }

          const params = {
            mode: (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
              error: Error()
            }), PopupManager) : PopupManager).CacheMode.Frequent
          };
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).show((_crd && ResPopup === void 0 ? (_reportPossibleCrUseOfResPopup({
            error: Error()
          }), ResPopup) : ResPopup).path, options, params);
        }

      }, (_descriptor3 = _applyDecoratedDescriptor(_class4.prototype, "resources", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class4)));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b756e30607bba56b705f84c3f4b8a4807cf93611.js.map