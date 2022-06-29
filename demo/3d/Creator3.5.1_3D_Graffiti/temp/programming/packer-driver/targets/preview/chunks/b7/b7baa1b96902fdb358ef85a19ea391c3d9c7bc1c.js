System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, systemEvent, SystemEvent, Quat, Vec2, _dec, _class, _crd, ccclass, property, DragAndRotate;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      Quat = _cc.Quat;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "23014IdvVZNPrJs0QqZ8Qk4", "DragAndRotate", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DragAndRotate", DragAndRotate = (_dec = ccclass('DragAndRotate'), _dec(_class = class DragAndRotate extends Component {
        constructor() {
          super(...arguments);
          this.quat = new Quat();
          this.delta = Vec2.ZERO;
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
          this.delta = Vec2.ZERO;
        }

        onTouchMove(touch, event) {
          this.delta = touch.getUIDelta();
        }

        onTouchEnd(touch, event) {
          this.delta = Vec2.ZERO;
        }

        update() {
          Quat.fromEuler(this.quat, -this.delta.y, this.delta.x, 0);
          this.node.rotate(this.quat, 1);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b7baa1b96902fdb358ef85a19ea391c3d9c7bc1c.js.map