System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Vec3, Quat, _dec, _class, _crd, ccclass, property, AutoRotate;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9cd5duUglNLBrWTGaJrUTD/", "AutoRotate", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AutoRotate", AutoRotate = (_dec = ccclass('AutoRotate'), _dec(_class = class AutoRotate extends Component {
        constructor() {
          super(...arguments);
          this.euler = new Vec3();
          this.quat = new Quat();
          this.speed = 10;
        }

        start() {// [3]
        }

        angleNormalize(x) {
          while (x >= 360) {
            x -= 360;
          }

          while (x < 0) {
            x += 360;
          }

          return x;
        }

        eulerNormalize(v) {
          v.x = this.angleNormalize(v.x);
          v.y = this.angleNormalize(v.y);
          v.z = this.angleNormalize(v.z);
        }

        update(deltaTime) {
          this.euler.x += deltaTime * this.speed;
          this.euler.y += deltaTime * this.speed * 2;
          this.euler.z += deltaTime * this.speed * 3;
          this.eulerNormalize(this.euler);
          Quat.fromEuler(this.quat, this.euler.x, this.euler.y, this.euler.z);
          this.node.setRotation(this.quat);
        }

      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fd203e53ae0bc3f56ff3d6856c6781ba6553b5a5.js.map