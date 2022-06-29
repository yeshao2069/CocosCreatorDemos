System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Color, TweenUtil, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Case_CardFlip;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTweenUtil(extras) {
    _reporterNs.report("TweenUtil", "../../../eazax-cutils/TweenUtil", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      TweenUtil = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3cf8arMOblOeL4UxCUU8QcT", "Case_CardFlip", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", Case_CardFlip = ( // /**
      // * 卡片翻转
      // * @see TweenUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TweenUtil.ts
      // * @version 20210320
      // */
      _dec = ccclass('CaseCardFlip'), _dec2 = property({
        displayName: CC_DEV && '卡片',
        type: Node
      }), _dec3 = property({
        displayName: CC_DEV && '翻转按钮',
        type: Node
      }), _dec(_class = (_class2 = class Case_CardFlip extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "card", _descriptor, this);

          _initializerDefineProperty(this, "flipBtn", _descriptor2, this);

          this.button = null;
          this.frontColor = Color.WHITE;
          this.backColor = Color.GRAY;
        }

        onLoad() {
          this.init();
          this.registerEvent();
        }

        start() {
          this.reset();
        }

        onDestroy() {
          this.unregisterEvent();
        } // /**
        // * 注册事件
        // */


        registerEvent() {
          this.flipBtn.on(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        } // /**
        // * 反注册事件
        // */


        unregisterEvent() {
          this.flipBtn.off(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        } // /**
        // * 初始化
        // */


        init() {
          this.button = this.flipBtn.getComponent(cc.Button) || this.flipBtn.addComponent(cc.Button);
        } // /**
        // * 重置
        // */


        reset() {
          this.card.color = this.frontColor;
          this.setButtonState(true);
        } // /**
        // * 翻转按钮点击回调
        // */


        async onFlipBtnClick() {
          if (!this.button.interactable) return;
          this.setButtonState(false);
          await (_crd && TweenUtil === void 0 ? (_reportPossibleCrUseOfTweenUtil({
            error: Error()
          }), TweenUtil) : TweenUtil).flip(this.card, 2, () => {
            if (this.card.color.equals(this.frontColor)) {
              this.card.color = this.backColor;
            } else {
              this.card.color = this.frontColor;
            }
          });
          this.setButtonState(true);
        } // /**
        // * 设置按钮状态
        // * @param interactable 是否可点击
        // */


        setButtonState(interactable) {
          this.button.interactable = interactable;
          this.flipBtn.color = interactable ? cc.Color.WHITE : cc.Color.GRAY;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "card", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "flipBtn", [_dec3], {
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
//# sourceMappingURL=652fe20f3bb925a882f0ffda007aae34328187ba.js.map