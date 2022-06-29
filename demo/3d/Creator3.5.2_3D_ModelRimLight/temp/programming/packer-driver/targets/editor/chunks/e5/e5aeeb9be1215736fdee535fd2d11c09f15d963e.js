System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, UIMgr, UILayer, UI_RimLight_HUD, _dec, _class, _crd, ccclass, property, AppStartRimLight;

  function _reportPossibleCrUseOfUIMgr(extras) {
    _reporterNs.report("UIMgr", "./UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "./UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUI_RimLight_HUD(extras) {
    _reporterNs.report("UI_RimLight_HUD", "./UI_RimLight_HUD", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      UIMgr = _unresolved_2.UIMgr;
      UILayer = _unresolved_2.UILayer;
    }, function (_unresolved_3) {
      UI_RimLight_HUD = _unresolved_3.UI_RimLight_HUD;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e8577Baw4xBIbU+5FUq3PXd", "AppStart_RimLight", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AppStartRimLight", AppStartRimLight = (_dec = ccclass('AppStartRimLight'), _dec(_class = class AppStartRimLight extends Component {
        start() {
          // Your initialization goes here.
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.setup((_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).NUM);
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.showUI(_crd && UI_RimLight_HUD === void 0 ? (_reportPossibleCrUseOfUI_RimLight_HUD({
            error: Error()
          }), UI_RimLight_HUD) : UI_RimLight_HUD);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e5aeeb9be1215736fdee535fd2d11c09f15d963e.js.map