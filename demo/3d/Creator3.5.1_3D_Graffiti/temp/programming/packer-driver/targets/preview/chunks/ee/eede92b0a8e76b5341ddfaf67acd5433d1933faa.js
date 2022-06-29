System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, systemEvent, SystemEvent, geometry, Camera, MeshRenderer, gfx, Vec3, Node, Mat4, Mat3, Vec4, Material, DecalMeshRenderer, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Decal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfDecalMeshRenderer(extras) {
    _reporterNs.report("DecalMeshRenderer", "./DecalMeshRenderer", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      geometry = _cc.geometry;
      Camera = _cc.Camera;
      MeshRenderer = _cc.MeshRenderer;
      gfx = _cc.gfx;
      Vec3 = _cc.Vec3;
      Node = _cc.Node;
      Mat4 = _cc.Mat4;
      Mat3 = _cc.Mat3;
      Vec4 = _cc.Vec4;
      Material = _cc.Material;
    }, function (_unresolved_2) {
      DecalMeshRenderer = _unresolved_2.DecalMeshRenderer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1bbb9vIkOZGVLvxAY0jpYOA", "decal", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Decal", Decal = (_dec = ccclass('Decal'), _dec2 = property(Camera), _dec3 = property(Material), _dec4 = property(Node), _dec(_class = (_class2 = class Decal extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "mainCamera", _descriptor, this);

          _initializerDefineProperty(this, "decalMaterial", _descriptor2, this);

          _initializerDefineProperty(this, "debugCube", _descriptor3, this);

          this.meshRenderer = null;
          this.isTouchMove = false;
          this._ray = new geometry.Ray();
          this.modOpt = {
            distance: Infinity,
            doubleSided: false,
            mode: geometry.ERaycastMode.ANY,
            subIndices: [],
            result: []
          };
        }

        start() {}

        onEnable() {
          systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onDisable() {
          systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onTouchStart(touch, event) {
          this.isTouchMove = false;
        }

        onTouchMove(touch, event) {
          var delta = touch.getUIDelta();

          if (delta.length() > 0.1) {
            this.isTouchMove = true;
          }
        }

        onTouchEnd(touch, event) {
          var _this$mainCamera;

          if (this.isTouchMove) {
            return;
          }

          this.isTouchMove = false;
          var point = touch.getLocation();
          (_this$mainCamera = this.mainCamera) == null ? void 0 : _this$mainCamera.screenPointToRay(point.x, point.y, this._ray);
          var position = new Vec3();
          var normal = new Vec3();

          if (!this.getTouchPointOnModel(position, normal)) {
            console.log('Not touch on model');
            return;
          }

          this.addDecal(position, normal);
        }

        getTouchPointOnModel(position, normal) {
          var _this$meshRenderer, _this$meshRenderer2;

          if (null == this.meshRenderer) {
            this.meshRenderer = this.getComponent(MeshRenderer);
          }

          var mo = (_this$meshRenderer = this.meshRenderer) == null ? void 0 : _this$meshRenderer.model;

          if (!mo) {
            console.log('model is null');
            return false;
          }

          var me = (_this$meshRenderer2 = this.meshRenderer) == null ? void 0 : _this$meshRenderer2.mesh;

          if (!me) {
            console.log('mesh is null');
            return false;
          }

          if (this.modOpt.result) {
            this.modOpt.result.length = 0;
          }

          if (this.modOpt.subIndices) {
            this.modOpt.subIndices.length = 0;
          }

          var intersectCount = geometry.intersect.rayModel(this._ray, mo, this.modOpt);

          if (0 == intersectCount) {
            return false;
          }

          if (!this.modOpt.subIndices || !this.modOpt.result) {
            console.log(this.modOpt);
            return false;
          }

          position.set(Vec3.ZERO);
          var r = this.modOpt.result;
          var s = this.modOpt.subIndices;

          if (me.renderingSubMeshes.length > 0) {
            var subIdx = s[0];
            var pos = me.renderingSubMeshes[subIdx].geometricInfo.positions; // const pos = me.readAttribute(subIdx, gfx.AttributeName.ATTR_POSITION);
            // if (!pos) { return false; }

            var pa = new Vec3();
            var posIndex = r[0].vertexIndex0 * 3;
            pa.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
            var pb = new Vec3();
            posIndex = r[0].vertexIndex1 * 3;
            pb.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
            var pc = new Vec3();
            posIndex = r[0].vertexIndex2 * 3;
            pc.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
            position.add(pa);
            position.add(pb);
            position.add(pc);
            position.divide3f(3, 3, 3);
            var normals = me.readAttribute(subIdx, gfx.AttributeName.ATTR_NORMAL);

            if (normals) {
              var nIdx = r[0].vertexIndex0 * 3;
              pa.set(normals[nIdx], normals[nIdx + 1], normals[nIdx + 2]);
              nIdx = r[0].vertexIndex1 * 3;
              pb.set(normals[nIdx], normals[nIdx + 1], normals[nIdx + 2]);
              nIdx = r[0].vertexIndex2 * 3;
              pc.set(normals[nIdx], normals[nIdx + 1], normals[nIdx + 2]);
              normal.add(pa);
              normal.add(pb);
              normal.add(pc);
              normal.divide3f(3, 3, 3);
            }
          } else {
            this._ray.computeHit(position, r[0].distance);
          }

          return true;
        }

        addDecal(position, normal) {
          var _this$mainCamera2, _this$meshRenderer3;

          position.transformMat4(this.node.worldMatrix);
          var projectorEye = (_this$mainCamera2 = this.mainCamera) == null ? void 0 : _this$mainCamera2.node.worldPosition;

          if (null == projectorEye) {
            return;
          }

          var me = (_this$meshRenderer3 = this.meshRenderer) == null ? void 0 : _this$meshRenderer3.mesh;

          if (!me) {
            console.log('mesh is null');
            return false;
          }

          if (this.debugCube) {
            this.debugCube.setWorldPosition(position);
            this.debugCube.removeFromParent();
            this.node.addChild(this.debugCube);
          }

          var dmr = this.addComponent(_crd && DecalMeshRenderer === void 0 ? (_reportPossibleCrUseOfDecalMeshRenderer({
            error: Error()
          }), DecalMeshRenderer) : DecalMeshRenderer);
          var scale = new Vec3(0.5, 0.5, 4);
          projectorEye.subtract(position).normalize().add(position);
          dmr == null ? void 0 : dmr.genDecalMesh(this.node, me, projectorEye, position, normal, scale);

          if (dmr && this.decalMaterial) {
            var newMat = new Material();
            newMat.copy(this.decalMaterial);
            newMat.setProperty('albedo', new Vec4(Math.random() * 255, Math.random() * 255, Math.random() * 255, 0.1)); // dmr.material = newMat;

            dmr.setMaterial(newMat, 0);
          }
        }

        rotateForVectors(a, b) {
          a.normalize();
          b.normalize();
          var v = Vec3.cross(new Vec3(), a, b);
          var c = Vec3.dot(a, b);
          var v1 = v.x;
          var v2 = v.y;
          var v3 = v.z;
          var h = 1 / (1 + c);
          var vx = new Mat3(0, -v3, v2, v3, 0, -v1, -v2, v1, 0);
          var rm = this.matrix3Dot(vx, vx);
          rm.multiplyScalar(h);
          rm.add(vx).add(Mat3.IDENTITY);
          console.log(a);
          console.log(b);
          console.log(rm);
          return rm;
        }

        matrix3Dot(ma, mb) {
          var m = new Mat3();
          m.m00 = ma.m00 * mb.m00 + ma.m01 * mb.m03 + ma.m02 * mb.m06;
          m.m01 = ma.m00 * mb.m01 + ma.m01 * mb.m04 + ma.m02 * mb.m07;
          m.m02 = ma.m00 * mb.m02 + ma.m01 * mb.m05 + ma.m02 * mb.m08;
          m.m03 = ma.m03 * mb.m00 + ma.m04 * mb.m03 + ma.m05 * mb.m06;
          m.m04 = ma.m03 * mb.m00 + ma.m04 * mb.m04 + ma.m05 * mb.m07;
          m.m05 = ma.m03 * mb.m01 + ma.m04 * mb.m05 + ma.m05 * mb.m08;
          m.m06 = ma.m06 * mb.m00 + ma.m07 * mb.m03 + ma.m08 * mb.m06;
          m.m07 = ma.m06 * mb.m03 + ma.m07 * mb.m04 + ma.m08 * mb.m07;
          m.m08 = ma.m06 * mb.m00 + ma.m07 * mb.m05 + ma.m08 * mb.m08;
          return m;
        }

        matrix4Dot(ma, mb) {
          var m = new Mat4();
          m.m00 = ma.m00 * mb.m00 + ma.m01 * mb.m04 + ma.m02 * mb.m08 + ma.m03 * mb.m12;
          m.m01 = ma.m00 * mb.m01 + ma.m01 * mb.m05 + ma.m02 * mb.m09 + ma.m03 * mb.m13;
          m.m02 = ma.m00 * mb.m02 + ma.m01 * mb.m06 + ma.m02 * mb.m10 + ma.m03 * mb.m14;
          m.m03 = ma.m00 * mb.m03 + ma.m01 * mb.m07 + ma.m02 * mb.m11 + ma.m03 * mb.m15;
          m.m04 = ma.m04 * mb.m00 + ma.m05 * mb.m04 + ma.m06 * mb.m08 + ma.m07 * mb.m12;
          m.m05 = ma.m04 * mb.m01 + ma.m05 * mb.m05 + ma.m06 * mb.m09 + ma.m07 * mb.m13;
          m.m06 = ma.m04 * mb.m02 + ma.m05 * mb.m06 + ma.m06 * mb.m10 + ma.m07 * mb.m14;
          m.m07 = ma.m04 * mb.m03 + ma.m05 * mb.m07 + ma.m06 * mb.m11 + ma.m07 * mb.m15;
          m.m08 = ma.m08 * mb.m00 + ma.m09 * mb.m04 + ma.m10 * mb.m08 + ma.m11 * mb.m12;
          m.m09 = ma.m08 * mb.m01 + ma.m09 * mb.m05 + ma.m10 * mb.m09 + ma.m11 * mb.m13;
          m.m10 = ma.m08 * mb.m02 + ma.m09 * mb.m06 + ma.m10 * mb.m10 + ma.m11 * mb.m14;
          m.m11 = ma.m08 * mb.m03 + ma.m09 * mb.m07 + ma.m10 * mb.m11 + ma.m11 * mb.m15;
          m.m12 = ma.m12 * mb.m00 + ma.m13 * mb.m04 + ma.m14 * mb.m08 + ma.m15 * mb.m12;
          m.m13 = ma.m12 * mb.m01 + ma.m13 * mb.m05 + ma.m14 * mb.m09 + ma.m15 * mb.m13;
          m.m14 = ma.m12 * mb.m02 + ma.m13 * mb.m06 + ma.m14 * mb.m10 + ma.m15 * mb.m14;
          m.m15 = ma.m12 * mb.m03 + ma.m13 * mb.m07 + ma.m14 * mb.m11 + ma.m15 * mb.m15;
          return m;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "decalMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "debugCube", [_dec4], {
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
//# sourceMappingURL=eede92b0a8e76b5341ddfaf67acd5433d1933faa.js.map