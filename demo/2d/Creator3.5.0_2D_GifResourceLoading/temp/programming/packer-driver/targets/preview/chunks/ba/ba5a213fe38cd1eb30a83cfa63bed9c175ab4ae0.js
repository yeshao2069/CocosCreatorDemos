System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Sprite, resources, assetManager, GIFCache, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, executeInEditMode, requireComponent, CCGIF;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGIFCache(extras) {
    _reporterNs.report("GIFCache", "./GIF", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      resources = _cc.resources;
      assetManager = _cc.assetManager;
    }, function (_unresolved_2) {
      GIFCache = _unresolved_2.GIFCache;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c0ff5NcIN5BPITgP1IQiCbP", "CCGIF", undefined);

      ({
        ccclass,
        property,
        executeInEditMode,
        requireComponent
      } = _decorator);

      _export("default", CCGIF = (_dec = ccclass('CCGIF'), _dec2 = requireComponent(Sprite), _dec(_class = _dec2(_class = (_class2 = class CCGIF extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "path", _descriptor, this);

          this.delays = [];
          this.gifSp = void 0;
          this.frames = [];
          this.frameIdx = 0;
        }

        onLoad() {
          this.gifSp = this.node.getComponent(Sprite);
        }

        preload() {
          (_crd && GIFCache === void 0 ? (_reportPossibleCrUseOfGIFCache({
            error: Error()
          }), GIFCache) : GIFCache).getInstance();
          resources.load(this.path, (err, data) => {
            console.log(err, data);

            if (err) {
              console.error(err, '加载失败');
              return;
            }

            this.delays = data._nativeAsset.delays.map(v => v / 1e2);
            this.frames = data._nativeAsset.spriteFrames;
          });
        }

        loadUrl(url) {
          (_crd && GIFCache === void 0 ? (_reportPossibleCrUseOfGIFCache({
            error: Error()
          }), GIFCache) : GIFCache).getInstance();
          assetManager.loadAny({
            url: url
          }, (err, data) => {
            console.log(err, data, '  data');

            if (err) {
              return;
            }

            this.delays = data.delays.map(v => v / 1e2);
            this.frames = data.spriteFrames;
            this.play(true);
          });
        }

        /**
         * 播放Gif
         * @param loop 是否循环
         * @param playNext 是否播放下一个
         * @returns void
         */
        play(loop, playNext) {
          if (loop === void 0) {
            loop = false;
          }

          if (playNext === void 0) {
            playNext = false;
          }

          var self = this;

          if (!playNext) {
            this.stop();
          }

          if (self.frames.length) {
            if (self.frameIdx >= self.frames.length) {
              self.frameIdx = 0;

              if (!loop) {
                return;
              }
            }

            self.gifSp.spriteFrame = self.frames[self.frameIdx]; // console.log(self.gifSp, '11111')

            self.scheduleOnce(() => {
              self.play(loop, true);
            }, self.delays[self.frameIdx]);
            self.frameIdx++;
          }
        }

        stop() {
          this.frameIdx = 0;
          this.unscheduleAllCallbacks();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ba5a213fe38cd1eb30a83cfa63bed9c175ab4ae0.js.map