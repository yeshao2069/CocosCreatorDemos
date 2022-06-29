System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, v3, _dec, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, NodeFloatingAnim;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "59efeALQDZHU65gNyEHtjOV", "NodeFloatingAnim", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NodeFloatingAnim", NodeFloatingAnim = (_dec = ccclass('NodeFloatingAnim'), _dec(_class = (_class2 = class NodeFloatingAnim extends Component {
        constructor(...args) {
          super(...args);
          this._angles = v3(0, 0, 0);
          this._pos = v3(0, 0, 0);
          this._lifeTime = Math.random();

          _initializerDefineProperty(this, "rotateSpeed", _descriptor, this);

          _initializerDefineProperty(this, "updownSpeed", _descriptor2, this);
        }

        start() {
          // Your initialization goes here.
          this._angles = this.node.eulerAngles.clone();
          this.node.getPosition(this._pos);
        }

        update(deltaTime) {
          if (this.rotateSpeed) {
            this._angles.y += deltaTime * this.rotateSpeed;
            this.node.eulerAngles = this._angles;
          }

          if (this.updownSpeed) {
            this._lifeTime += deltaTime;
            this.node.getPosition(this._pos);
            this._pos.y = Math.sin(this._lifeTime * this.updownSpeed);
            this.node.setPosition(this._pos);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "updownSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8eb94278f96b26ba7eb66e0de4bb020bbb45f5c1.js.map