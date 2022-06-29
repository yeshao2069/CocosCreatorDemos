System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, UI_SkyboxHUD, UIMgr, UILayer, _dec, _class, _crd, ccclass, property, AppStart_Skybox;

  function _reportPossibleCrUseOfUI_SkyboxHUD(extras) {
    _reporterNs.report("UI_SkyboxHUD", "./hud/UI_Skybox_HUD", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIMgr(extras) {
    _reporterNs.report("UIMgr", "../../qfw/base/UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "../../qfw/base/UIMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      UI_SkyboxHUD = _unresolved_2.UI_SkyboxHUD;
    }, function (_unresolved_3) {
      UIMgr = _unresolved_3.UIMgr;
      UILayer = _unresolved_3.UILayer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "88b0dhxjXhFKbl9VSWYWyMW", "AppStart_Skybox", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AppStart_Skybox", AppStart_Skybox = (_dec = ccclass('AppStart_Skybox'), _dec(_class = class AppStart_Skybox extends Component {
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;
        start() {
          // Your initialization goes here.
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.setup((_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).NUM);
          (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.showUI(_crd && UI_SkyboxHUD === void 0 ? (_reportPossibleCrUseOfUI_SkyboxHUD({
            error: Error()
          }), UI_SkyboxHUD) : UI_SkyboxHUD);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6af1c9d38a5bdcfc5178c7925077f1c64bde9ccc.js.map