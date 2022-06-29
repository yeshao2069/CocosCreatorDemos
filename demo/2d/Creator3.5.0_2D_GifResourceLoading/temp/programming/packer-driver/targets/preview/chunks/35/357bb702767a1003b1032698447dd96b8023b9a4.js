System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, ScrollView, UITransform, Size, view, Layout, dynamicAtlasManager, Layers, Sprite, SpriteFrame, find, Vec3, _dec, _class, _crd, ccclass, property, TestDynamic;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      ScrollView = _cc.ScrollView;
      UITransform = _cc.UITransform;
      Size = _cc.Size;
      view = _cc.view;
      Layout = _cc.Layout;
      dynamicAtlasManager = _cc.dynamicAtlasManager;
      Layers = _cc.Layers;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      find = _cc.find;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b286zSGv5ML5eiXTwJLboP", "TestDynamic", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      dynamicAtlasManager.maxFrameSize = 1024;
      /**
       * Predefined variables
       * Name = NewComponent
       * DateTime = Tue Apr 12 2022 14:49:00 GMT+0800 (中国标准时间)
       * Author = Koei
       * FileBasename = NewComponent.ts
       * FileBasenameNoExtension = NewComponent
       * URL = db://assets/NewComponent.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      _export("TestDynamic", TestDynamic = (_dec = ccclass('TestDynamic'), _dec(_class = class TestDynamic extends Component {
        start() {
          // [3]
          this.showDebug(true);
        }

        showDebug(isShow) {
          var _content$getComponent, _find;

          if (!isShow) return;
          var scNode = new Node('dynamicAtla');
          var scCom = scNode.addComponent(ScrollView);
          var uiTraCom = scNode.getComponent(UITransform);
          uiTraCom == null ? void 0 : uiTraCom.setContentSize(new Size(view.getVisibleSize().width, view.getVisibleSize().height));
          var content = new Node('content');
          var layout = content.addComponent(Layout);
          content.parent = scNode;
          content.getComponent(UITransform).anchorY = 1;
          (_content$getComponent = content.getComponent(UITransform)) == null ? void 0 : _content$getComponent.setContentSize(new Size(2048, 2048));
          layout.resizeMode = Layout.ResizeMode.CONTAINER;
          layout.type = Layout.Type.VERTICAL; //@ts-ignore

          var data = dynamicAtlasManager._atlases;
          var length = dynamicAtlasManager.atlasCount;
          scCom.content = content;
          scCom.horizontal = true;
          scCom.vertical = true;
          scNode.layer = Layers.Enum.PROFILER;

          for (var index = 0; index < length; index++) {
            var item = new Node('atlas');
            var sp = item.addComponent(Sprite);
            item.layer = Layers.Enum.PROFILER;
            var sprFra = new SpriteFrame();
            sprFra.texture = data[index]._texture;
            sp.spriteFrame = sprFra;
            content.addChild(item);
          }

          (_find = find('Canvas')) == null ? void 0 : _find.addChild(scNode);
          scNode.setPosition(new Vec3(0, 0, 0));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=357bb702767a1003b1032698447dd96b8023b9a4.js.map