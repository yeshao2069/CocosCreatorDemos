System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Node, Prefab, PopupBase, ResPopupItem, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ResPopup;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPopupBase(extras) {
    _reporterNs.report("PopupBase", "../../../../../eazax-ccomponents/popups/PopupBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResPopupItem(extras) {
    _reporterNs.report("ResPopupItem", "./ResPopupItem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      PopupBase = _unresolved_2.default;
    }, function (_unresolved_3) {
      ResPopupItem = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "342f2b0zQFF/YtFsX6a3E70", "ResPopup", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", ResPopup = (_dec = ccclass('ResPopup'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Prefab), _dec(_class = (_class2 = class ResPopup extends (_crd && PopupBase === void 0 ? (_reportPossibleCrUseOfPopupBase({
        error: Error()
      }), PopupBase) : PopupBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "closeBtn", _descriptor, this);

          _initializerDefineProperty(this, "content", _descriptor2, this);

          _initializerDefineProperty(this, "item", _descriptor3, this);

          this.items = [];
        }

        // /**
        // * 资源弹窗路径
        // */
        static get path() {
          return 'prefabs/ResPopup';
        } // /**
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
          this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
        } // /**
        // * 反注册事件
        // */


        unregisterEvent() {
          this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
        } // /**
        // * 更新显示
        // * @param options
        // */


        updateDisplay(options) {
          const existedItems = this.items,
                optionItems = options.items.filter(v => v.name !== '' || v.url !== ''),
                count = Math.max(optionItems.length, existedItems.length);

          for (let i = 0; i < count; i++) {
            // // 新生成
            if (optionItems[i] && !existedItems[i]) {
              // // 生成节点
              const node = cc.instantiate(this.item);
              node.setParent(this.content); // // 设置组件

              const item = node.getComponent(_crd && ResPopupItem === void 0 ? (_reportPossibleCrUseOfResPopupItem({
                error: Error()
              }), ResPopupItem) : ResPopupItem);
              item.set(optionItems[i].name, optionItems[i].url);
              item.node.active = true;
              existedItems.push(item);
            } // // 复用
            else if (optionItems[i] && existedItems[i]) {
              // // 复用组件
              const item = existedItems[i];
              item.set(optionItems[i].name, optionItems[i].url);
              item.node.active = true;
            } // // 隐藏
            else {
              // // 隐藏节点
              existedItems[i].node.active = false;
            }
          }
        } // /**
        // * 关闭按钮点击回调
        // */


        onCloseBtnClick() {
          this.hide();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "item", [_dec4], {
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
//# sourceMappingURL=da2d0d0335fb28a346182697a501dadb456a247e.js.map