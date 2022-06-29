System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, Line, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, up, Lightning;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Line = _cc.Line;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1f1fan1td5FvqW8ndQ6MHEY", "Lightning", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      up = new Vec3(0, 1, 0);

      _export("Lightning", Lightning = (_dec = ccclass("Lightning"), _dec2 = property(), _dec3 = property(), _dec4 = property(), _dec5 = property(Node), _dec6 = property([Node]), _dec(_class = (_class2 = class Lightning extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "detail", _descriptor, this);

          _initializerDefineProperty(this, "displacement", _descriptor2, this);

          _initializerDefineProperty(this, "yOffset", _descriptor3, this);

          _initializerDefineProperty(this, "startNode", _descriptor4, this);

          _initializerDefineProperty(this, "targetNode", _descriptor5, this);

          this.line = null;
          this.points = void 0;
        }

        onLoad() {
          this.line = this.getComponent(Line);
          this.points = [];
        }

        start() {}

        update(deltaTime) {
          let startPos = Vec3.ZERO;
          let endPos = Vec3.ZERO; // if(this.startNode) {
          //     startPos = this.startNode.position.add(up.multiplyScalar(this.yOffset));
          // }
          // if(this.targetNode) {
          //     endPos = this.targetNode.position.add(up.multiplyScalar(this.yOffset));
          // }

          for (let i = 0; i < this.targetNode.length - 1; i++) {
            startPos = this.targetNode[i].position.add(up.multiplyScalar(this.yOffset));
            endPos = this.targetNode[i + 1].position.add(up.multiplyScalar(this.yOffset));
            this.showLight(startPos, endPos);
          }
        } //收集顶点，中点分形法插值抖动


        collectLinPos(startPos, destPos, displace) {
          if (displace < this.detail) {
            this.points.push(startPos);
          } else {
            let midX = (startPos.x + destPos.x) / 2;
            let midY = (startPos.y + destPos.y) / 2;
            let midZ = (startPos.z + destPos.z) / 2;
            midX += (Math.random() - 0.5) * displace;
            midY += (Math.random() - 0.5) * displace;
            midZ += (Math.random() - 0.5) * displace;
            let midPos = new Vec3(midX, midY, midZ);
            this.collectLinPos(startPos, midPos, displace / 2);
            this.collectLinPos(midPos, destPos, displace / 2);
          }
        }

        showLight(startPos, endPos) {
          if (!startPos.equals(endPos)) {
            this.points.length = 0;
            this.collectLinPos(startPos, endPos, this.displacement);
            this.points.push(endPos);
            this.line.positions = this.points;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "detail", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "displacement", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 15;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "yOffset", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=be6520285a7630fc86be5d04b7ce872b6da81383.js.map