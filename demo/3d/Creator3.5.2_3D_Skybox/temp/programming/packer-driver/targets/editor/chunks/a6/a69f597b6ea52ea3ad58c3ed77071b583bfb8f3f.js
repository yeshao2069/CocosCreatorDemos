System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Node, loader, instantiate, find, WidgetComponent, UITransformComponent, view, ResolutionPolicy, UIMgr, _crd, ccclass, property, UILayer;

  function _reportPossibleCrUseOfUIController(extras) {
    _reporterNs.report("UIController", "./UIController", _context.meta, extras);
  }

  _export({
    UIMgr: void 0,
    UILayer: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      loader = _cc.loader;
      instantiate = _cc.instantiate;
      find = _cc.find;
      WidgetComponent = _cc.WidgetComponent;
      UITransformComponent = _cc.UITransformComponent;
      view = _cc.view;
      ResolutionPolicy = _cc.ResolutionPolicy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "82a59QFSGVIYrBkrgAX1U2r", "UIMgr", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      (function (UILayer) {
        UILayer[UILayer["SCENE"] = 0] = "SCENE";
        UILayer[UILayer["GAME"] = 1] = "GAME";
        UILayer[UILayer["HUD"] = 2] = "HUD";
        UILayer[UILayer["POPUP"] = 3] = "POPUP";
        UILayer[UILayer["ALERT"] = 4] = "ALERT";
        UILayer[UILayer["NOTICE"] = 5] = "NOTICE";
        UILayer[UILayer["MASK"] = 6] = "MASK";
        UILayer[UILayer["NUM"] = 7] = "NUM";
      })(UILayer || _export("UILayer", UILayer = {}));

      _export("UIMgr", UIMgr = class UIMgr {
        static get inst() {
          if (!this._inst) {
            this._inst = new UIMgr();
          }

          return this._inst;
        }

        resize() {
          //根据屏幕大小决定适配策略
          //想明白原理，请阅读本文 https://blog.csdn.net/qq_36720848/article/details/89742451
          //decide the resolution policy according to the relationship between screen size and design resolution.  go https://blog.csdn.net/qq_36720848/article/details/89742451 (artile in Chinese) for more detail.
          let dr = view.getDesignResolutionSize();
          var s = cc.view.getFrameSize();
          var rw = s.width;
          var rh = s.height;
          var finalW = rw;
          var finalH = rh; //

          if (rw / rh > dr.width / dr.height) {
            //如果更长，则用定高
            //if screen size is longer than design resolution. use fitHeight
            finalH = dr.height;
            finalW = finalH * rw / rh;
          } else {
            //如果更短，则用定宽
            //if screen size is shorter than design resolution. use fitWidth.
            finalW = dr.width;
            finalH = rh / rw * finalW;
          } //手工修改canvas和设计分辨率，这样反复调用也能生效。
          //we use the code below instead of fitWidth = true or fitHeight = true. so that we can recall this method many times.


          view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);
          let cvs = find('Canvas').getComponent(UITransformComponent);
          cvs.node.width = finalW;
          cvs.node.height = finalH;
        }

        setup(maxLayers) {
          this.resize();
          let canvas = find('Canvas').getComponent(UITransformComponent);

          if (canvas.node.children.length) {
            return;
          }

          for (let i = 0; i < maxLayers; ++i) {
            let layerNode = new Node();
            layerNode.layer = canvas.node.layer;
            let uiTransfrom = layerNode.addComponent(UITransformComponent);
            uiTransfrom.width = canvas.width;
            uiTransfrom.height = canvas.height;
            let widget = layerNode.addComponent(WidgetComponent);
            widget.isAlignBottom = true;
            widget.isAlignTop = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            widget.left = 0;
            widget.right = 0;
            widget.top = 0;
            widget.bottom = 0;
            canvas.node.addChild(layerNode);
          }
        }

        getLayerNode(layerIndex) {
          let canvas = find('Canvas');
          return canvas.children[layerIndex];
        }

        showUI(uiCls, cb, target) {
          let ui = new uiCls();
          let resArr = ui.getRes() || [];
          resArr.push(ui.prefabUrl);
          loader.loadResArray(resArr, () => {
            let node = null;

            if (ui.prefabUrl) {
              let prefab = loader.getRes(ui.prefabUrl);
              node = instantiate(prefab);
            } else {
              //special for empty ui
              node = new Node();
              node.layer = find('Canvas').layer; //keep size

              let widget = node.addComponent(WidgetComponent);
              widget.isAlignBottom = true;
              widget.isAlignTop = true;
              widget.isAlignLeft = true;
              widget.isAlignRight = true;
              widget.left = 0;
              widget.right = 0;
              widget.top = 0;
              widget.bottom = 0;
            }

            ui.setup(node);
          });
          return ui;
        }

      });

      UIMgr._inst = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a69f597b6ea52ea3ad58c3ed77071b583bfb8f3f.js.map