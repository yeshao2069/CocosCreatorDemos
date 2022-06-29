System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Node, Component, Button, Color, Sprite, DEV, TweenUtil, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, CardFlip;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "card", _descriptor, this);

          _initializerDefineProperty(this, "flipBtn", _descriptor2, this);

          this.button = null;
          this.frontColor = Color.WHITE;
          this.backColor = Color.GRAY;
        }

        onLoad() {
          this.button = this.flipBtn.getComponent(Button) || this.flipBtn.addComponent(Button);
          this.flipBtn.on(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        }

        start() {
          var spf = this.card.getComponent(Sprite);
          spf.color = this.frontColor;
          this.setButtonState(true);
        }

        onDestroy() {
          this.flipBtn.off(Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
        }
        /**
         * 翻转按钮点击回调
         */


        onFlipBtnClick() {
          var _this = this;

          return _asyncToGenerator(function* () {
            console.log("Aaaaaaaaaa");
            if (!_this.button.interactable) return;

            _this.setButtonState(false);

            yield (_crd && TweenUtil === void 0 ? (_reportPossibleCrUseOfTweenUtil({
              error: Error()
            }), TweenUtil) : TweenUtil).flip(_this.card, 2, () => {
              var spf = _this.card.getComponent(Sprite);

              if (spf.color.equals(_this.frontColor)) {
                spf.color = _this.backColor;
              } else {
                spf.color = _this.frontColor;
              }
            });

            _this.setButtonState(true);
          })();
        }
        /**
         * 设置按钮状态
         * @param interactable 是否可点击
         */


        setButtonState(interactable) {
          this.button.interactable = interactable;
          var spf = this.flipBtn.getComponent(Sprite);
          spf.color = interactable ? Color.WHITE : Color.GRAY;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "card", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "flipBtn", [_dec3], {
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
//# sourceMappingURL=dd2f408831f6315e9ac805cce28ac00e4fc59c18.js.map