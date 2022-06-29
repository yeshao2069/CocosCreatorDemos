System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, ClickToLoadUrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ea72dfs9ulL86r9WCWSk1ts", "ClickToLoadUrl", undefined);

      ({
        ccclass,
        property
      } = _decorator); // /**
      // * 点击打开网页
      // */

      _export("default", ClickToLoadUrl = (_dec = ccclass('ClickToLoadUrl'), _dec2 = property({
        multiline: true
      }), _dec3 = property({
        tooltip: CC_DEV && '是否使用新窗口打开'
      }), _dec(_class = (_class2 = class ClickToLoadUrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "url", _descriptor, this);

          _initializerDefineProperty(this, "openInNewTap", _descriptor2, this);
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
          var url = this.url;

          if (!url || url === '') {
            return;
          } // // 是否使用新窗口打开


          if (this.openInNewTap) {
            // // 新窗口打开
            window.open(url);
          } else {
            // // 当前窗口打开
            window.location.href = url;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'https://gitee.com/ifaswind/eazax-ccc';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "openInNewTap", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8d07cdca52a93cd7f55316e69fd9d589047531ed.js.map