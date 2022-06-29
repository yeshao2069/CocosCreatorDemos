System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, MeshRenderer, utils, gfx, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, DynamicMesh;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      MeshRenderer = _cc.MeshRenderer;
      utils = _cc.utils;
      gfx = _cc.gfx;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "eac7dLtZjFBhJutUYbOvcpP", "dynamicMesh", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DynamicMesh", DynamicMesh = (_dec = ccclass('DynamicMesh'), _dec2 = property(MeshRenderer), _dec(_class = (_class2 = class DynamicMesh extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mr", _descriptor, this);
        }

        start() {}

        onBtnChangeMesh() {
          console.log('auto generate dynamic mesh');

          if (null == this.mr) {
            return;
          }

          let mesh = this.mr.mesh;
          mesh == null ? void 0 : mesh.reset(this.genMesh());
          this.mr.mesh = mesh;
        }

        genMesh() {
          let geo = {
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_STRIP,
            positions: [-1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1],
            colors: [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 0, 1, 0, 0.5, 0, 1, 0, 0, 0.5, 1, 0.5, 0.5, 0, 1, 0, 0.5, 0.5, 1, 0.5, 0, 0.5, 1, 0.2, 0.2, 0, 1, 0, 0.2, 0.2, 1, 0.2, 0, 0.2, 1, 0.5, 0.8, 0, 1, 0, 0.5, 0.8, 1, 0.8, 0, 0.5, 1, 0.7, 0.2, 0.5, 1, 0.7, 0.5, 0.2, 1, 0.2, 0.5, 0.7, 1, 0.2, 0.7, 0.5, 1],
            normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
            attributes: [new gfx.Attribute(gfx.AttributeName.ATTR_POSITION, gfx.Format.RGB32F), new gfx.Attribute(gfx.AttributeName.ATTR_COLOR, gfx.Format.RGBA32F), new gfx.Attribute(gfx.AttributeName.ATTR_NORMAL, gfx.Format.RGB32F)],
            indices: [0, 1, 2, 3, 0, 2, 4, 5, 6, 7, 4, 6, 8, 9, 10, 11, 8, 10, 12, 13, 14, 15, 12, 14, 16, 17, 18, 19, 16, 18, 20, 21, 22, 23, 20, 22]
          };
          return utils.createMesh(geo, undefined, {
            calculateBounds: false
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mr", [_dec2], {
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
//# sourceMappingURL=df61dfbc56d7bc9563fc2f122326606920439aa4.js.map