System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, find, CCGIF, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, executeInEditMode, GifSupport;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCCGIF(extras) {
    _reporterNs.report("CCGIF", "./CCGIF", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      find = _cc.find;
    }, function (_unresolved_2) {
      CCGIF = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1f3566cP1ROI4F9Ms9212I5", "GifSupport", undefined);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("GifSupport", GifSupport = (_dec = ccclass('GifSupport'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class GifSupport extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "remoteGif", _descriptor, this);

          _initializerDefineProperty(this, "localGif", _descriptor2, this);
        }

        start() {
          find('Canvas/btnPlay').active = false;
          this.localGif.children.map(n => {
            n.getComponent(_crd && CCGIF === void 0 ? (_reportPossibleCrUseOfCCGIF({
              error: Error()
            }), CCGIF) : CCGIF).preload();
          });
          find('Canvas/btnPlay').active = true;
        }

        playAll() {
          // 本地Gif加载
          this.localGif.children.forEach(v => {
            v.getComponent(_crd && CCGIF === void 0 ? (_reportPossibleCrUseOfCCGIF({
              error: Error()
            }), CCGIF) : CCGIF).stop();
            v.getComponent(_crd && CCGIF === void 0 ? (_reportPossibleCrUseOfCCGIF({
              error: Error()
            }), CCGIF) : CCGIF).play(true);
          }); // 远程Gif加载

          var url = "https://n.sinaimg.cn/tech/transform/280/w128h152/20210528/d2fb-kquziih9543861.gif";
          this.remoteGif.getComponent(_crd && CCGIF === void 0 ? (_reportPossibleCrUseOfCCGIF({
            error: Error()
          }), CCGIF) : CCGIF).loadUrl(url);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "remoteGif", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "localGif", [_dec3], {
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
//# sourceMappingURL=18f7e19e77661d16f92ac6323d588fe876c977fe.js.map