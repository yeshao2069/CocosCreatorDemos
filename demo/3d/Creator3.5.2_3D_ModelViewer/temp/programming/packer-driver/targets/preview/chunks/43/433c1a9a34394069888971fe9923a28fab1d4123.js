System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, UIController, UILayer, PlayerCtrl, UILayout_ModelViewer_HUD, UI_ModelViewer_HUD, _crd;

  function _reportPossibleCrUseOfUIController(extras) {
    _reporterNs.report("UIController", "./UIController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayer(extras) {
    _reporterNs.report("UILayer", "./UIMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerCtrl(extras) {
    _reporterNs.report("PlayerCtrl", "./PlayerCtrl", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUILayout_ModelViewer_HUD(extras) {
    _reporterNs.report("UILayout_ModelViewer_HUD", "./UILayout_ModelViewer_HUD", _context.meta, extras);
  }

  _export("UI_ModelViewer_HUD", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      UIController = _unresolved_2.UIController;
    }, function (_unresolved_3) {
      UILayer = _unresolved_3.UILayer;
    }, function (_unresolved_4) {
      PlayerCtrl = _unresolved_4.PlayerCtrl;
    }, function (_unresolved_5) {
      UILayout_ModelViewer_HUD = _unresolved_5.UILayout_ModelViewer_HUD;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0c243Dokh1LdIQGcyX+P13F", "UI_ModelViewer_HUD", undefined);

      _export("UI_ModelViewer_HUD", UI_ModelViewer_HUD = class UI_ModelViewer_HUD extends (_crd && UIController === void 0 ? (_reportPossibleCrUseOfUIController({
        error: Error()
      }), UIController) : UIController) {
        constructor() {
          super('prefab/ui_hud_panel', (_crd && UILayer === void 0 ? (_reportPossibleCrUseOfUILayer({
            error: Error()
          }), UILayer) : UILayer).HUD);
        }

        get layout() {
          return this.node.getComponent(_crd && UILayout_ModelViewer_HUD === void 0 ? (_reportPossibleCrUseOfUILayout_ModelViewer_HUD({
            error: Error()
          }), UILayout_ModelViewer_HUD) : UILayout_ModelViewer_HUD);
        }

        onCreated() {
          this.onButtonEvent(this.layout.btnPrev, () => {
            (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.playPrev();
            this.layout.txtCurAnim.string = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.curAnimName;
          });
          this.onButtonEvent(this.layout.btnNext, () => {
            (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.playNext();
            this.layout.txtCurAnim.string = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.curAnimName;
          });
          this.onToggleEvent(this.layout.animLoop, toggle => {
            (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).inst.isLoop = toggle.isChecked;
          });
          this.layout.animLoop.isChecked = (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).inst.isLoop;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=433c1a9a34394069888971fe9923a28fab1d4123.js.map