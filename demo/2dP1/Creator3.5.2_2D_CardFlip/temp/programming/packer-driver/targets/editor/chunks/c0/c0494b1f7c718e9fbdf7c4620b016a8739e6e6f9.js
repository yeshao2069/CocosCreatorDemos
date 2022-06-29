System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, EventManager, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cf6diX//1L45BRBZxjpzab", "EventManager", undefined);

      _export("default", EventManager = class EventManager {
        /**
        * 普通事件容器
        */

        /**
        * 一次性事件容器
        */

        /**
        * 注册事件
        * @param name 事件名
        * @param callback 回调
        * @param target 目标
        */
        static on(name, callback, target) {
          const events = this.events;

          if (!events.has(name)) {
            events.set(name, [{
              callback,
              target
            }]);
            return;
          }

          events.get(name).push({
            callback,
            target
          });
        }
        /**
        * 注册事件（一次性）
        * @param name 事件名
        * @param callback 回调
        * @param target 目标
        */


        static once(name, callback, target) {
          const events = this.onceEvents;

          if (!events.has(name)) {
            events.set(name, [{
              callback,
              target
            }]);
            return;
          }

          events.get(name).push({
            callback,
            target
          });
        }
        /**
        * 取消注册事件
        * @param name 事件名
        * @param callback 回调
        * @param target 目标
        */


        static off(name, callback, target) {
          // 普通事件
          const event = this.events.get(name);

          if (event) {
            for (let i = 0, l = event.length; i < l; i++) {
              if (this.compare(event[i], callback, target)) {
                event.splice(i, 1);

                if (event.length === 0) {
                  this.events.delete(name);
                }

                break;
              }
            }
          } // 一次性事件


          const onceEvent = this.onceEvents.get(name);

          if (onceEvent) {
            for (let i = 0, l = onceEvent.length; i < l; i++) {
              if (this.compare(onceEvent[i], callback, target)) {
                onceEvent.splice(i, 1);

                if (onceEvent.length === 0) {
                  this.onceEvents.delete(name);
                }

                break;
              }
            }
          }
        }
        /**
        * 通过事件名发送事件
        * @param name 事件名
        * @param args 参数
        */


        static emit(name, ...args) {
          // 普通事件
          const event = this.events.get(name);

          if (event) {
            for (let i = 0; i < event.length; i++) {
              const {
                callback,
                target
              } = event[i];
              callback.apply(target, args);
            }
          } // 一次性事件


          const onceEvent = this.onceEvents.get(name);

          if (onceEvent) {
            for (let i = 0; i < onceEvent.length; i++) {
              const {
                callback,
                target
              } = onceEvent[i];
              callback.apply(target, args);
            }

            this.onceEvents.delete(name);
          }
        }
        /**
        * 移除指定事件
        * @param name 事件名
        */


        static remove(name) {
          // 普通事件
          if (this.events.has(name)) {
            this.events.delete(name);
          } // 一次性事件


          if (this.onceEvents.has(name)) {
            this.onceEvents.delete(name);
          }
        }
        /**
        * 移除所有事件
        */


        static removeAll() {
          // 普通事件
          this.events.clear(); // 一次性事件

          this.onceEvents.clear();
        }
        /**
        * 对比
        * @param subscription 订阅
        * @param inCallback 回调
        * @param inTarget 目标
        */


        static compare(subscription, inCallback, inTarget) {
          const {
            callback,
            target
          } = subscription;
          return target === inTarget && (callback === inCallback || callback.toString() === inCallback.toString());
        }

      });

      EventManager.events = new Map();
      EventManager.onceEvents = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c0494b1f7c718e9fbdf7c4620b016a8739e6e6f9.js.map