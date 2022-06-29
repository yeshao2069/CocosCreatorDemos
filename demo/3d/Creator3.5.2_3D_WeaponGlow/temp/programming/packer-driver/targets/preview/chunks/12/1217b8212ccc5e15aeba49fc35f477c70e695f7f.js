System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, SkeletalAnimationComponent, SkinningModelComponent, v4, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _crd, ccclass, property, PlayerCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      SkeletalAnimationComponent = _cc.SkeletalAnimationComponent;
      SkinningModelComponent = _cc.SkinningModelComponent;
      v4 = _cc.v4;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f6754G50SJFdakj52nxybqz", "PlayerCtrl", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerCtrl", PlayerCtrl = (_dec = ccclass('PlayerCtrl'), _dec2 = property({
        type: SkinningModelComponent
      }), _dec3 = property({
        type: SkinningModelComponent
      }), _dec(_class = (_class2 = (_class3 = class PlayerCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "body", _descriptor, this);

          _initializerDefineProperty(this, "weapon", _descriptor2, this);

          this._isLoop = true;
          this._anim = void 0;
          this._curentAnimIndex = 0;
          this._rimColor = v4(0, 0, 0, 0);
          this._rimEnabled = false;
        }

        static get inst() {
          return this._inst;
        }

        start() {
          PlayerCtrl._inst = this;
          this._anim = this.node.getComponent(SkeletalAnimationComponent);

          for (var i = 0; i < this._anim.clips.length; ++i) {
            var clip = this._anim[i];

            if (clip == this._anim.defaultClip) {
              this._curentAnimIndex = i;
            }
          }

          this.rimLightColor = this._rimColor;
        }

        set rimLightEnabled(enable) {
          this._rimEnabled = enable;
          this.rimLightColor = this._rimColor;
        }

        get rimLightEnabled() {
          return this._rimEnabled;
        }

        set rimLightColor(rimColor) {
          this._rimColor = rimColor;
          var value = v4(rimColor.x, rimColor.y, rimColor.z, this._rimEnabled ? rimColor.w : 0);
          this.body.sharedMaterial.setProperty('rimColor', value);
          this.weapon.sharedMaterial.setProperty('rimColor', value);
        }

        get rimLightColor() {
          return this._rimColor;
        }

        set isLoop(v) {
          this._isLoop = v;

          var animState = this._anim.getAnimationState(this.curAnimName);

          animState.repeatCount = v ? Infinity : 1;
        }

        get isLoop() {
          return this._isLoop;
        }

        playNext() {
          this._curentAnimIndex = (this._curentAnimIndex + 1) % this._anim.clips.length;
          this.playAnim(this.curAnimName, this._isLoop);
        }

        playPrev() {
          this._curentAnimIndex = (this._curentAnimIndex - 1 + this._anim.clips.length) % this._anim.clips.length;
          this.playAnim(this.curAnimName, this._isLoop);
        }

        playAnim(animName, isLoop, cb) {
          var animState = this._anim.getAnimationState(animName);

          animState.repeatCount = isLoop ? Infinity : 1;

          this._anim.play(animName);
        }

        get curAnimName() {
          var clip = this._anim.clips[this._curentAnimIndex];
          return clip.name;
        }

      }, _class3._inst = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "body", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "weapon", [_dec3], {
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
//# sourceMappingURL=1217b8212ccc5e15aeba49fc35f477c70e695f7f.js.map