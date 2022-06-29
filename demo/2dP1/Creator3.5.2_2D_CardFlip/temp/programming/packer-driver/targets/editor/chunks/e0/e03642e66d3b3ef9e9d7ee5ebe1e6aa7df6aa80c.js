System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Node, Component, Button, Color, Sprite, DEV, TweenUtil, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CardFlip;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTweenUtil(extras) {
    _reporterNs.report("TweenUtil", "./TweenUtil", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Component = _cc.Component;
      Button = _cc.Button;
      Color = _cc.Color;
      Sprite = _cc.Sprite;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }, function (_unresolved_2) {
      TweenUtil = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "725a3MAY+5DEIIyiGtJ8H1q", "CardFlip", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 卡片翻转
       * @version 20210320
       */

      _export("default", CardFlip = (_dec = ccclass('CardFlip'), _dec2 = property({
        displayName: DEV && '卡片',
        type: Node
      }), _dec3 = property({
        displayName: DEV && '翻转按钮',
        type: Node
      }), _dec(_class = (_class2 = class CardFlip extends Component {
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
        }
        /**
         * 注册事件
         */


        registerEvent() {
          this.flipBtn.on(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        }
        /**
         * 反注册事件
         */


        unregisterEvent() {
          this.flipBtn.off(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        }
        /**
         * 初始化
         */


        init() {
          this.button = this.flipBtn.getComponent(Button) || this.flipBtn.addComponent(Button);
        }
        /**
         * 重置
         */


        reset() {
          let spf = this.card.getComponent(Sprite);
          spf.color = this.frontColor;
          this.setButtonState(true);
        }
        /**
         * 翻转按钮点击回调
         */


        async onFlipBtnClick() {
          console.log("Aaaaaaaaaa");
          if (!this.button.interactable) return;
          this.setButtonState(false);
          await (_crd && TweenUtil === void 0 ? (_reportPossibleCrUseOfTweenUtil({
            error: Error()
          }), TweenUtil) : TweenUtil).flip(this.card, 2, () => {
            let spf = this.card.getComponent(Sprite);

            if (spf.color.equals(this.frontColor)) {
              spf.color = this.backColor;
            } else {
              spf.color = this.frontColor;
            }
          });
          this.setButtonState(true);
        }
        /**
         * 设置按钮状态
         * @param interactable 是否可点击
         */


        setButtonState(interactable) {
          this.button.interactable = interactable;
          let spf = this.flipBtn.getComponent(Sprite);
          spf.color = interactable ? Color.WHITE : Color.GRAY;
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
//# sourceMappingURL=e03642e66d3b3ef9e9d7ee5ebe1e6aa7df6aa80c.js.map