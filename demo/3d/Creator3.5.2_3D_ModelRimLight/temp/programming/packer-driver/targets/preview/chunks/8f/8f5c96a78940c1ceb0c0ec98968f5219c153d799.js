System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Color, UILayoutRimLightHUD, UIController, UILayer, PlayerCtrl, UI_RimLight_HUD, _crd;

  function _reportPossibleCrUseOfUILayoutRimLightHUD(extras) {
    _reporterNs.report("UILayoutRimLightHUD", "./UILayout_RimLight_HUD", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIController(extras) {
    _reporterNs.report("UIController", "../../../qfw/base/UIController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "../../../qfw/base/UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerCtrl(extras) {
    _reporterNs.report("PlayerCtrl", "../../../qfw/components/PlayerCtrl", _context.meta, extras);
  }

  _export("UI_RimLight_HUD", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      UILayoutRimLightHUD = _unresolved_2.UILayoutRimLightHUD;
    }, function (_unresolved_3) {
      UIController = _unresolved_3.UIController;
    }, function (_unresolved_4) {
      UILayer = _unresolved_4.UILayer;
    }, function (_unresolved_5) {
      PlayerCtrl = _unresolved_5.PlayerCtrl;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "838c0FBPK9Fl6Y1kUuYnTPs", "UI_RimLight_HUD", undefined);

      _export("UI_RimLight_HUD", UI_RimLight_HUD = class UI_RimLight_HUD extends (_crd && UIController === void 0 ? (_reportPossibleCrUseOfUIController({
        error: Error()
      }), UIController) : UIController) {
        constructor() {
          super('scenes/rim_light/hud/ui_rim_light_hud', (_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).HUD);
          this._color = new Color();
        }

        get layout() {
          return this.node.getComponent(_crd && UILayoutRimLightHUD === void 0 ? (_reportPossibleCrUseOfUILayoutRimLightHUD({
            error: Error()
          }), UILayoutRimLightHUD) : UILayoutRimLightHUD);
        }

        onCreated() {
          this.layout.chkEnabled.isChecked = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).inst.rimLightEnabled;
          var rimColor = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).inst.rimLightColor;
          this.layout.R.progress = rimColor.x;
          this.layout.G.progress = rimColor.y;
          this.layout.B.progress = rimColor.z;
          this.layout.A.progress = rimColor.w;
          this.refreshSliderValueShow();
          this.onSlideEvent(this.layout.R, this.onRimLightChanged, this);
          this.onSlideEvent(this.layout.G, this.onRimLightChanged, this);
          this.onSlideEvent(this.layout.B, this.onRimLightChanged, this);
          this.onSlideEvent(this.layout.A, this.onRimLightChanged, this);
          this.onToggleEvent(this.layout.chkEnabled, toggle => {
            (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.rimLightEnabled = toggle.isChecked;
          });
        }

        onRimLightChanged(slider) {
          var rimColor = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).inst.rimLightColor;
          rimColor.x = this.layout.R.progress;
          rimColor.y = this.layout.G.progress;
          rimColor.z = this.layout.B.progress;
          rimColor.w = this.layout.A.progress;
          (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).inst.rimLightColor = rimColor;
          this.refreshSliderValueShow();
        }

        refreshSliderValueShow() {
          this.layout.ValueR.string = '' + ~~(this.layout.R.progress * 255);
          this.layout.ValueG.string = '' + ~~(this.layout.G.progress * 255);
          this.layout.ValueB.string = '' + ~~(this.layout.B.progress * 255);
          this.layout.ValueA.string = '' + ~~(this.layout.A.progress * 255);
          this._color.x = this.layout.R.progress;
          this._color.y = this.layout.G.progress;
          this._color.z = this.layout.B.progress;
          this._color.w = this.layout.A.progress;
          this.layout.colorDisplay.color = this._color;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8f5c96a78940c1ceb0c0ec98968f5219c153d799.js.map