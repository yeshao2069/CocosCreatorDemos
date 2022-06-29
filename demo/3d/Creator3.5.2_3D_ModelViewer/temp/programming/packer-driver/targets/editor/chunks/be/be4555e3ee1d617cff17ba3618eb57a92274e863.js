System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, UIMgr, UILayer, UI_ModelViewer_HUD, _dec, _class, _crd, ccclass, property, AppStart_ModelViewer;

  function _reportPossibleCrUseOfUIMgr(extras) {
    _reporterNs.report("UIMgr", "./UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "./UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUI_ModelViewer_HUD(extras) {
    _reporterNs.report("UI_ModelViewer_HUD", "./UI_ModelViewer_HUD", _context.meta, extras);
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
      UI_ModelViewer_HUD = _unresolved_3.UI_ModelViewer_HUD;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f1a5c170QZOZ4gwg/Ekl3X9", "AppStart_ModelViewer", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AppStart_ModelViewer", AppStart_ModelViewer = (_dec = ccclass('AppStart_ModelViewer'), _dec(_class = class AppStart_ModelViewer extends Component {
        start() {
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.setup((_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).NUM);
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.showUI(_crd && UI_ModelViewer_HUD === void 0 ? (_reportPossibleCrUseOfUI_ModelViewer_HUD({
            error: Error()
          }), UI_ModelViewer_HUD) : UI_ModelViewer_HUD);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=be4555e3ee1d617cff17ba3618eb57a92274e863.js.map