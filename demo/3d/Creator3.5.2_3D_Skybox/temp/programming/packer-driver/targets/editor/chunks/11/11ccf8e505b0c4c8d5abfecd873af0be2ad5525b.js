System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, ButtonComponent, director, loader, TextureCube, find, UIController, UILayer, UI_SkyboxHUD, _crd;

  function _reportPossibleCrUseOfUIController(extras) {
    _reporterNs.report("UIController", "../resources/qfw/base/UIController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "../resources/qfw/base/UIMgr", _context.meta, extras);
  }

  _export("UI_SkyboxHUD", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      ButtonComponent = _cc.ButtonComponent;
      director = _cc.director;
      loader = _cc.loader;
      TextureCube = _cc.TextureCube;
      find = _cc.find;
    }, function (_unresolved_2) {
      UIController = _unresolved_2.UIController;
    }, function (_unresolved_3) {
      UILayer = _unresolved_3.UILayer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f65dfKBP5xGVKBd/Q1KMO6E", "UI_Skybox_HUD", undefined);

      _export("UI_SkyboxHUD", UI_SkyboxHUD = class UI_SkyboxHUD extends (_crd && UIController === void 0 ? (_reportPossibleCrUseOfUIController({
        error: Error()
      }), UIController) : UIController) {
        constructor() {
          super('scenes/skybox/hud/ui_skybox_hud_panel', (_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).HUD);
          this._oldSelected = null;
          this._isLoadingCubemap = false;
        }

        onCreated() {
          for (let i = 0; i < 10; ++i) {
            let index = i + 1;
            let sep = index < 10 ? '0' : '';
            let skyboxName = sep + index;
            let btnName = 'ScrollView/view/content/btn_0' + skyboxName;
            this.onButtonEvent(btnName, (btn, skyboxName) => {
              if (this._isLoadingCubemap) {
                return;
              }

              btn.interactable = false;

              if (this._oldSelected) {
                this._oldSelected.interactable = true;
              }

              this._oldSelected = btn;
              this._isLoadingCubemap = true;
              loader.loadRes('common/skybox/cubemap_sky' + skyboxName, TextureCube, (err, cubemap) => {
                this._isLoadingCubemap = false;
                director.getScene().globals.skybox.envmap = cubemap;
              });
            }, this, skyboxName);

            if (i == 0) {
              this._oldSelected = find(btnName, this.node).getComponent(ButtonComponent);
              this._oldSelected.interactable = false;
            }
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=11ccf8e505b0c4c8d5abfecd873af0be2ad5525b.js.map