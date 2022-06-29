System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, ScrollView, UITransform, Size, view, Layout, dynamicAtlasManager, Layers, Sprite, SpriteFrame, find, Vec3, _dec, _class, _crd, ccclass, property, NewComponent;

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

      _export("NewComponent", NewComponent = (_dec = ccclass('NewComponent'), _dec(_class = class NewComponent extends Component {
        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        start() {
          // [3]
          this.showDebug(true);
        }

        showDebug(isShow) {
          var _content$getComponent, _find;

          if (!isShow) return;
          let scNode = new Node('dynamicAtla');
          let scCom = scNode.addComponent(ScrollView);
          let uiTraCom = scNode.getComponent(UITransform);
          uiTraCom == null ? void 0 : uiTraCom.setContentSize(new Size(view.getVisibleSize().width, view.getVisibleSize().height));
          let content = new Node('content');
          let layout = content.addComponent(Layout);
          content.parent = scNode;
          content.getComponent(UITransform).anchorY = 1;
          (_content$getComponent = content.getComponent(UITransform)) == null ? void 0 : _content$getComponent.setContentSize(new Size(2048, 2048));
          layout.resizeMode = Layout.ResizeMode.CONTAINER;
          layout.type = Layout.Type.VERTICAL; //@ts-ignore

          let data = dynamicAtlasManager._atlases;
          let length = dynamicAtlasManager.atlasCount;
          scCom.content = content;
          scCom.horizontal = true;
          scCom.vertical = true;
          scNode.layer = Layers.Enum.PROFILER;

          for (let index = 0; index < length; index++) {
            let item = new Node('atlas');
            let sp = item.addComponent(Sprite);
            item.layer = Layers.Enum.PROFILER;
            let sprFra = new SpriteFrame();
            sprFra.texture = data[index]._texture;
            sp.spriteFrame = sprFra;
            content.addChild(item);
          }

          (_find = find('Canvas')) == null ? void 0 : _find.addChild(scNode);
          scNode.setPosition(new Vec3(0, 0, 0));
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7b7d03a923e2678418e8ba29c9ebcefd704fe4c2.js.map