System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, find, ButtonComponent, EventHandler, game, ToggleComponent, SliderComponent, UIMgr, AutoEventHandler, UIController, _dec, _class, _crd, ccclass, property, ClickEventAgent;

  function _reportPossibleCrUseOfUIMgr(extras) {
    _reporterNs.report("UIMgr", "./UIMgr", _context.meta, extras);
  }

  _export({
    AutoEventHandler: void 0,
    UIController: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      find = _cc.find;
      ButtonComponent = _cc.ButtonComponent;
      EventHandler = _cc.EventHandler;
      game = _cc.game;
      ToggleComponent = _cc.ToggleComponent;
      SliderComponent = _cc.SliderComponent;
    }, function (_unresolved_2) {
      UIMgr = _unresolved_2.UIMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "de702l/FU1GyIzhfLW2eNqP", "UIController", undefined);

      ({
        ccclass,
        property
      } = _decorator); //按钮事件监听器

      _export("ClickEventAgent", ClickEventAgent = (_dec = ccclass('ClickEventAgent'), _dec(_class = class ClickEventAgent extends Component {
        start() {// Your initialization goes here.
        }

        onButtonClicked(evt, customEventData) {
          let btn = evt.target.getComponent(ButtonComponent);
          let clickEvents = btn.clickEvents;

          for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];

            if (h.customEventData == customEventData) {
              let cb = h['$cb$'];
              let target = h['$target$'];
              let args = h['$args$'];
              cb.apply(target, [btn, args]);
            }
          }
        }

        onCheckEvent(toggle, customEventData) {
          let checkEvents = toggle.checkEvents;

          for (let i = 0; i < checkEvents.length; ++i) {
            let h = checkEvents[i];

            if (h.customEventData == customEventData) {
              let cb = h['$cb$'];
              let target = h['$target$'];
              let args = h['$args$'];
              cb.apply(target, [toggle, args]);
            }
          }
        }

        onSlideEvent(slider, customEventData) {
          let slideEvents = slider.slideEvents;

          for (let i = 0; i < slideEvents.length; ++i) {
            let h = slideEvents[i];

            if (h.customEventData == customEventData) {
              let cb = h['$cb$'];
              let target = h['$target$'];
              let args = h['$args$'];
              cb.apply(target, [slider, args]);
            }
          }
        }

      }) || _class)); //自动管理事件，将在UI销毁时自动清理


      _export("AutoEventHandler", AutoEventHandler = class AutoEventHandler {
        constructor() {
          this._handlers = [];
        }

        on(event, cb, target, once) {
          this._handlers.push({
            event: event,
            cb: cb,
            target: target,
            once: once
          });

          game.on(event, cb, target, once);
        }

        off(event, cb, target, once) {
          game.off(event, cb, target);

          for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];

            if (h.event == event && h.cb == cb && h.target == target && h.once == once) {
              this._handlers.splice(i, 1);

              return;
            }
          }
        }

        dispose() {
          for (let i = 0; i < this._handlers.length; ++i) {
            let h = this._handlers[i];
            game.off(h.event, h.cb, h.target);
          }
        }

      });

      _export("UIController", UIController = class UIController extends AutoEventHandler {
        constructor(prefabUrl, layer) {
          super();
          this._controllerId = 0;
          this._prefabUrl = void 0;
          this._layer = void 0;
          this.node = void 0;
          this._prefabUrl = prefabUrl;
          this._layer = layer;
          this._controllerId = UIController._idBase++;

          UIController._controllers.push(this);
        }

        get prefabUrl() {
          return this._prefabUrl;
        }

        get layer() {
          return this._layer;
        }

        getRes() {
          return [];
        }

        static hideAll() {
          while (this._controllers.length) {
            this._controllers[0].hide();
          }
        }

        setup(node) {
          this.node = node;
          let parent = (_crd && UIMgr === void 0 ? (_reportPossibleCrUseOfUIMgr({
            error: Error()
          }), UIMgr) : UIMgr).inst.getLayerNode(this.layer) || find('Canvas');
          parent.addChild(node); //结点创建完毕，调用子类的处理函数。

          this.onCreated();
        }

        hide() {
          this.node.removeFromParent();
          this.node.destroy();

          for (let i = 0; i < UIController._controllers.length; ++i) {
            if (UIController._controllers[i] == this) {
              UIController._controllers.splice(i, 1);

              break;
            }
          }

          this.dispose();
          this.onDispose();
        } //添加按钮事件
        //cb:(btn:ButtonComponent,args:any)=>void


        onButtonEvent(relativeNodePath, cb, target, args) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof ButtonComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return null;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            agent = this.node.addComponent(ClickEventAgent);
          }

          let btn = buttonNode.getComponent(ButtonComponent);
          let clickEvents = btn.clickEvents;
          let handler = new EventHandler();
          handler.target = this.node;
          handler.component = 'ClickEventAgent';
          handler.handler = 'onButtonClicked';
          handler.customEventData = '' + UIController._idBase++; //附加额外信息 供事件转发使用

          handler['$cb$'] = cb;
          handler['$target$'] = target;
          handler['$args$'] = args;
          clickEvents.push(handler);
          btn.clickEvents = clickEvents;
        } //移除按钮事件


        offButtonEvent(relativeNodePath, cb, target) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof ButtonComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return;
            ``;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            return;
          }

          let btn = buttonNode.getComponent(ButtonComponent);

          if (!btn) {
            return;
          }

          let clickEvents = btn.clickEvents;

          for (let i = 0; i < clickEvents.length; ++i) {
            let h = clickEvents[i];

            if (h['$cb$'] == cb && h['$target$'] == target) {
              clickEvents.splice(i, 1);
              btn.clickEvents = clickEvents;
              break;
            }
          }
        } //添加Toggle事件
        //cb:(btn:ToggleComponent,args:any)=>void


        onToggleEvent(relativeNodePath, cb, target, args) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof ToggleComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return null;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            agent = this.node.addComponent(ClickEventAgent);
          }

          let btn = buttonNode.getComponent(ToggleComponent);
          let checkEvents = btn.checkEvents;
          let handler = new EventHandler();
          handler.target = this.node;
          handler.component = 'ClickEventAgent';
          handler.handler = 'onCheckEvent';
          handler.customEventData = '' + UIController._idBase++; //附加额外信息 供事件转发使用

          handler['$cb$'] = cb;
          handler['$target$'] = target;
          handler['$args$'] = args;
          checkEvents.push(handler);
          btn.checkEvents = checkEvents;
        } //移除按钮事件


        offToggleEvent(relativeNodePath, cb, target) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof ToggleComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return null;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            return;
          }

          let btn = buttonNode.getComponent(ToggleComponent);

          if (!btn) {
            return;
          }

          let checkEvents = btn.checkEvents;

          for (let i = 0; i < checkEvents.length; ++i) {
            let h = checkEvents[i];

            if (h['$cb$'] == cb && h['$target$'] == target) {
              checkEvents.splice(i, 1);
              btn.checkEvents = checkEvents;
              break;
            }
          }
        } //添加Slide事件
        //cb:(btn:ToggleComponent,args:any)=>void


        onSlideEvent(relativeNodePath, cb, target, args) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof SliderComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return null;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            agent = this.node.addComponent(ClickEventAgent);
          }

          let btn = buttonNode.getComponent(SliderComponent);
          let slideEvents = btn.slideEvents;
          let handler = new EventHandler();
          handler.target = this.node;
          handler.component = 'ClickEventAgent';
          handler.handler = 'onSlideEvent';
          handler.customEventData = '' + UIController._idBase++; //附加额外信息 供事件转发使用

          handler['$cb$'] = cb;
          handler['$target$'] = target;
          handler['$args$'] = args;
          slideEvents.push(handler);
          btn.slideEvents = slideEvents;
        } //移除Slide事件


        offSlideEvent(relativeNodePath, cb, target) {
          let buttonNode = null;

          if (relativeNodePath instanceof Node) {
            buttonNode = relativeNodePath;
          } else if (relativeNodePath instanceof SliderComponent) {
            buttonNode = relativeNodePath.node;
          } else {
            buttonNode = find(relativeNodePath, this.node);
          }

          if (!buttonNode) {
            return null;
          } //添加转发器


          let agent = this.node.getComponent(ClickEventAgent);

          if (!agent) {
            return;
          }

          let btn = buttonNode.getComponent(SliderComponent);

          if (!btn) {
            return;
          }

          let slideEvents = btn.slideEvents;

          for (let i = 0; i < slideEvents.length; ++i) {
            let h = slideEvents[i];

            if (h['$cb$'] == cb && h['$target$'] == target) {
              slideEvents.splice(i, 1);
              btn.slideEvents = slideEvents;
              break;
            }
          }
        } //子类的所有操作，需要在这个函数之后。


        onCreated() {} //销毁


        onDispose() {}

      });

      UIController._idBase = 1000;
      UIController._controllers = [];

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7e22d6f387bf335729d9f6f6453597efe0367461.js.map