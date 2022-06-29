System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PopupBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4f06bMKddJh4jxlZJ7rcMt", "PopupBase", undefined);

      ({
        ccclass,
        property
      } = _decorator); // /**
      // * 弹窗基类
      // * @author 陈皮皮 (ifaswind)
      // * @version 20220122
      // * @see PopupBase.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/popups/PopupBase.ts
      // * @see PopupManager.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/PopupManager.ts
      // */

      _export("default", PopupBase = (_dec = ccclass('PopupBase'), _dec2 = property({
        type: Node,
        tooltip: CC_DEV && '背景遮罩'
      }), _dec3 = property({
        type: Node,
        tooltip: CC_DEV && '弹窗主体'
      }), _dec(_class = (_class2 = class PopupBase extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "background", _descriptor, this);

          _initializerDefineProperty(this, "main", _descriptor2, this);

          this.animationDuration = 0.3;
          this.blocker = null;
          this.options = null;
          this.finishCallback = null;
        }

        // /**
        // * 展示弹窗
        // * @param options 弹窗选项
        // * @param duration 动画时长
        // */
        async show(options, duration) {
          // // 储存选项
          this.options = options; // // 初始化

          this.init(options); // // 更新样式

          this.updateDisplay(options); // // 弹窗回调

          this.onBeforeShow && (await this.onBeforeShow()); // // 展示动画

          if (duration == undefined) {
            duration = duration < 0 ? 0 : this.animationDuration;
          }

          await this.playShowAnimation(duration); // // 弹窗回调

          this.onAfterShow && this.onAfterShow();
        } // /**
        // * 隐藏弹窗
        // * @param suspended 是否被挂起
        // * @param duration 动画时长
        // */


        async hide(suspended = false, duration) {
          const node = this.node; // // 动画时长不为 0 时拦截点击事件（避免误操作）

          if (duration !== 0) {
            let blocker = this.blocker;

            if (!blocker) {
              blocker = this.blocker = new cc.Node('blocker');
              blocker.addComponent(cc.BlockInputEvents);
              blocker.setParent(node);
              blocker.setContentSize(node.getContentSize());
            }

            blocker.active = true;
          } // // 弹窗回调


          this.onBeforeHide && (await this.onBeforeHide(suspended)); // // 播放隐藏动画

          if (duration == undefined) {
            duration = duration < 0 ? 0 : this.animationDuration;
          }

          await this.playHideAnimation(duration); // // 关闭拦截

          this.blocker && (this.blocker.active = false); // // 关闭节点

          node.active = false; // // 弹窗回调

          this.onAfterHide && this.onAfterHide(suspended); // // 弹窗完成回调

          this.finishCallback && this.finishCallback(suspended);
        } // /**
        // * 播放弹窗展示动画（派生类请重写此函数以实现自定义逻辑）
        // * @param duration 动画时长
        // */


        playShowAnimation(duration) {
          return new Promise(res => {
            // // 初始化节点
            const background = this.background,
                  main = this.main;
            this.node.active = true;
            background.active = true;
            background.opacity = 0;
            main.active = true;
            main.scale = 0.5;
            main.opacity = 0; // // 背景遮罩

            cc.tween(background).to(duration * 0.5, {
              opacity: 150
            }).start(); // // 弹窗主体

            cc.tween(main).to(duration, {
              scale: 1,
              opacity: 255
            }, {
              easing: 'backOut'
            }).call(res).start();
          });
        } // /**
        // * 播放弹窗隐藏动画（派生类请重写此函数以实现自定义逻辑）
        // * @param duration 动画时长
        // */


        playHideAnimation(duration) {
          return new Promise(res => {
            // // 背景遮罩
            cc.tween(this.background).delay(duration * 0.5).to(duration * 0.5, {
              opacity: 0
            }).start(); // // 弹窗主体

            cc.tween(this.main).to(duration, {
              scale: 0.5,
              opacity: 0
            }, {
              easing: 'backIn'
            }).call(res).start();
          });
        } // /**
        // * 初始化（派生类请重写此函数以实现自定义逻辑）
        // * @param options 弹窗选项
        // */


        init(options) {} // /**
        // * 更新样式（派生类请重写此函数以实现自定义逻辑）
        // * @param options 弹窗选项
        // */


        updateDisplay(options) {} // /**
        // * 弹窗展示前（派生类请重写此函数以实现自定义逻辑）
        // */


        onBeforeShow() {
          return new Promise(res => res());
        } // /**
        // * 弹窗展示后（派生类请重写此函数以实现自定义逻辑）
        // */


        onAfterShow() {} // /**
        // * 弹窗隐藏前（派生类请重写此函数以实现自定义逻辑）
        // * @param suspended 是否被挂起
        // */


        onBeforeHide(suspended) {
          return new Promise(res => res());
        } // /**
        // * 弹窗隐藏后（派生类请重写此函数以实现自定义逻辑）
        // * @param suspended 是否被挂起
        // */


        onAfterHide(suspended) {} // /**
        // * 弹窗被挂起（派生类请重写此函数以实现自定义逻辑）
        // */


        onSuspended() {
          return new Promise(res => res());
        } // /**
        // * 弹窗流程结束回调（注意：该回调为 PopupManager 专用，重写 hide 函数时记得调用该回调）
        // */


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "main", [_dec3], {
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
//# sourceMappingURL=dda318b1ff14d08956a48b06aea6ffdad7756a33.js.map