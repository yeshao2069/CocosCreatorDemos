System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, systemEvent, SystemEvent, EventMouse, Vec3, Quat, quat, Camera, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, FollowCamera;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      EventMouse = _cc.EventMouse;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
      quat = _cc.quat;
      Camera = _cc.Camera;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8a6ddp5bpNDp6GcnvRAcRCb", "FollowCamera", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FollowCamera", FollowCamera = (_dec = ccclass('FollowCamera'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Camera
      }), _dec4 = property({
        type: Vec3
      }), _dec(_class = (_class2 = (_class3 = class FollowCamera extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "camera", _descriptor2, this);

          _initializerDefineProperty(this, "lookAtOffset", _descriptor3, this);

          this._isMouseDown = false;
          this._targetPos = new Vec3(0, 0, 0);
          this._cameraPos = new Vec3(0, 0, 0);
          this._lookDir = new Vec3(0, 0, -1);
          this._lookRight = new Vec3(1, 0, 0);
          this._lookUp = new Vec3(0, 1, 0);
          this._rotate = quat();
          this._zoom = 4;
          this._minZoom = 2;
          this._maxZoom = 6;
          this._zoomSensitivty = 0.02;
        }

        static get inst() {
          return this._inst;
        }

        setFollowTarget(target) {
          this.target = target;
        }

        start() {
          FollowCamera._inst = this; // Your initialization goes here.

          systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          this.adjustCamera();
        }

        get lookDir() {
          return this.lookDir;
        }

        get rotationEulers() {
          var euler = this.node.eulerAngles.clone();
          euler.x *= -1;
          euler.y *= -1;
          euler.z *= -1;
          return euler;
        }

        adjustCamera() {
          if (!this.target) {
            return;
          }

          Vec3.normalize(this._lookDir, this._lookDir);

          this._lookUp.set(0, 1, 0); //取右向量


          Vec3.cross(this._lookRight, this._lookDir, this._lookUp);
          Vec3.normalize(this._lookRight, this._lookRight); //取得真实的UP向量

          Vec3.cross(this._lookUp, this._lookRight, this._lookDir);
          Vec3.normalize(this._lookUp, this._lookUp);
          Quat.fromAxes(this._rotate, this._lookRight, this._lookUp, this._lookDir);
          this.node.setRotation(this._rotate); //从观察点开始，把摄相机往后推zoom距离

          Vec3.multiplyScalar(this._lookDir, this._lookDir, this._zoom);
          Vec3.subtract(this._cameraPos, new Vec3(0, 0, 0), this._lookDir);
          this.camera.node.setPosition(this._cameraPos);
        }

        onMouseDown(event) {
          if (event.getButton() == EventMouse.BUTTON_RIGHT) {
            this._isMouseDown = true;
          }
        }

        onMouseUp() {
          this._isMouseDown = false;
        }

        onMouseMove(event) {
          if (!this._isMouseDown) {
            return;
          }

          var deltaX = event.getUIDeltaX() * 0.1;
          var deltaY = event.getUIDeltaY() * 0.1;
          this.rotate(deltaY, -deltaX);
        }

        rotate(rx, ry) {
          var angles = this.node.eulerAngles;
          this.node.setRotationFromEuler(angles.x + rx, angles.y + ry, angles.z);
        }

        zoom(delta) {
          this._zoom += delta * this._zoomSensitivty;

          if (this._zoom < this._minZoom) {
            this._zoom = this._minZoom;
          }

          if (this._zoom > this._maxZoom) {
            this._zoom = this._maxZoom;
          } //从观察点开始，把摄相机往后推zoom距离


          Vec3.normalize(this._lookDir, this._lookDir);
          Vec3.multiplyScalar(this._lookDir, this._lookDir, this._zoom);
          Vec3.subtract(this._cameraPos, new Vec3(0, 0, 0), this._lookDir);
          this.camera.node.setPosition(this._cameraPos);
        }

        onMouseWheel(event) {
          var delta = event.getScrollY() * this._zoomSensitivty;

          this.zoom(delta);
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this.target) {
            this.target.getPosition(this._targetPos);
            Vec3.add(this._targetPos, this._targetPos, this.lookAtOffset);
            this.node.setPosition(this._targetPos);
          }
        }

      }, _class3._inst = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lookAtOffset", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 10, 0);
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=342044f47b8dbe5903488b991170d15dba7a1471.js.map